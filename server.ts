import express from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { SAMPLE_DOCUMENTS } from './src/data/sampleDocuments';
import { RAGEngine } from './src/services/ragEngine';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = parseInt(process.env.PORT || '3000', 10);

app.use(express.json({ limit: '10mb' }));

// Keep an active server-side knowledge base
let activeDocuments = [...SAMPLE_DOCUMENTS];
let ragEngine = new RAGEngine(activeDocuments);

// Initialize GoogleGenAI SDK server-side
const geminiApiKey = process.env.GEMINI_API_KEY || '';
let ai: GoogleGenAI | null = null;

if (geminiApiKey) {
  try {
    ai = new GoogleGenAI({
      apiKey: geminiApiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  } catch (err) {
    console.error('Failed to initialize GoogleGenAI client:', err);
  }
} else {
  console.warn('GEMINI_API_KEY is not defined. The app will seamlessly utilize the local RAG fallback engine.');
}

// Health check endpoint
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    geminiConfigured: !!geminiApiKey,
    indexedDocumentsCount: activeDocuments.length,
    vectorEngine: 'FAISS (Simulated) / BM25 Vector Space'
  });
});

// Get all indexed documents
app.get('/api/rag/documents', (_req, res) => {
  res.json({
    documents: activeDocuments,
    totalCount: activeDocuments.length
  });
});

// Document upload & indexing endpoint
app.post('/api/rag/upload', (req, res) => {
  try {
    const { title, category, content, code } = req.body;
    if (!title || !content) {
      return res.status(400).json({ error: 'Title and content are required' });
    }

    // Split content into paragraph/section chunks
    const rawParagraphs = content.split(/\n\s*\n/).filter((p: string) => p.trim().length > 20);
    const sections = rawParagraphs.map((para: string, idx: number) => {
      const firstLine = para.trim().split('\n')[0].replace(/[#*_-]/g, '').trim();
      const sectionTitle = firstLine.length > 5 && firstLine.length < 60 ? firstLine : `Section ${idx + 1}: Provisions`;
      return {
        id: `sec-user-${Date.now()}-${idx}`,
        title: sectionTitle,
        content: para.trim()
      };
    });

    const newDoc = {
      id: `doc-user-${Date.now()}`,
      code: code || `CAMPUS-DOC-${Math.floor(1000 + Math.random() * 9000)}`,
      title: title.trim(),
      category: category || 'General',
      lastUpdated: new Date().toISOString().split('T')[0],
      chunksCount: Math.max(1, sections.length * 3),
      status: 'Indexed' as const,
      summary: content.slice(0, 150) + '...',
      sections: sections.length > 0 ? sections : [{
        id: `sec-user-${Date.now()}-1`,
        title: 'General Overview',
        content: content.trim()
      }],
      fileType: 'TXT' as const,
      version: 'v1.0'
    };

    activeDocuments.unshift(newDoc);
    ragEngine = new RAGEngine(activeDocuments);

    res.json({
      success: true,
      document: newDoc,
      message: 'Document successfully parsed, chunked, and indexed into vector knowledge base.'
    });
  } catch (error: any) {
    console.error('Error uploading document:', error);
    res.status(500).json({ error: 'Failed to process document', details: error.message });
  }
});

// Main RAG Chat query endpoint
app.post('/api/rag/chat', async (req, res) => {
  const startTime = Date.now();
  try {
    const { message, customDocs } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Question message is required' });
    }

    // Use current active engine or custom docs if supplied
    const currentEngine = (customDocs && Array.isArray(customDocs) && customDocs.length > 0)
      ? new RAGEngine(customDocs)
      : ragEngine;

    // 1. QUESTION EMBEDDING & SIMILARITY SEARCH (RETRIEVAL)
    const retrievedSources = currentEngine.search(message, 3);

    // If no context matched at all
    if (retrievedSources.length === 0) {
      return res.json({
        answer: "I couldn't find sufficient information in the current EduAssist AI knowledge base. Please check the Knowledge Base tab or contact the administrative office.",
        sources: [],
        isGrounded: false,
        aiPowered: false,
        pipelineLatencyMs: Date.now() - startTime
      });
    }

    // 2. CONTEXT CONSTRUCTION
    const contextText = retrievedSources
      .map((s, idx) => `[Document ${idx + 1}: ${s.docTitle} | Section: ${s.sectionTitle}]\n${s.content}`)
      .join('\n\n');

    let answerText = '';
    let isAiPowered = false;

    // 3. GEMINI LLM GROUNDED GENERATION (if API configured)
    if (ai) {
      try {
        const systemInstruction = `You are EduAssist AI, an intelligent campus assistant for students and faculty.
Answer the user's question using ONLY the provided document context below.
Strict rules:
1. Ground your answer completely in the facts provided in the context.
2. If the answer cannot be directly determined from the context, state: "I couldn't find this information in the current EduAssist AI knowledge base."
3. Do not invent or hallucinate dates, rules, cutoffs, or policies.
4. Format your answer cleanly with Markdown bolding and clear bullet points for read-at-a-glance clarity.
5. Keep your tone polite, authoritative, and institutional.`;

        const userPrompt = `DOCUMENT CONTEXT:
${contextText}

USER QUESTION:
${message}

Provide a comprehensive, accurate, grounded answer based solely on the context above:`;

        const geminiPromise = ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: userPrompt,
          config: {
            systemInstruction,
            temperature: 0.2, // Low temperature for high factual grounding
          }
        });

        // 5-second timeout for responsive live presentation demonstration
        const timeoutPromise = new Promise<null>((_, reject) =>
          setTimeout(() => reject(new Error('Gemini API timeout')), 5000)
        );

        const response: any = await Promise.race([geminiPromise, timeoutPromise]);

        if (response && response.text) {
          answerText = response.text.trim();
          isAiPowered = true;
        }
      } catch (geminiError: any) {
        console.warn('Gemini API call skipped or timed out, seamlessly using grounded local synthesis:', geminiError?.message || geminiError);
      }
    }

    // 4. FALLBACK LOCAL SYNTHESIS (if Gemini wasn't available or errored)
    if (!answerText) {
      answerText = currentEngine.generateLocalSynthesis(message, retrievedSources);
      isAiPowered = false;
    }

    const latencyMs = Date.now() - startTime;

    return res.json({
      answer: answerText,
      sources: retrievedSources,
      isGrounded: true,
      aiPowered: isAiPowered,
      pipelineLatencyMs: latencyMs
    });
  } catch (error: any) {
    console.error('RAG Pipeline Error:', error);
    return res.status(500).json({
      error: 'AI service is temporarily unavailable.',
      answer: 'AI service is temporarily unavailable. Please try asking again or check the Knowledge Base documents directly.',
      sources: [],
      isGrounded: false,
      aiPowered: false,
      pipelineLatencyMs: Date.now() - startTime
    });
  }
});

// Start Express server and mount Vite in development or static in production
async function startServer() {
  const isProduction = process.env.NODE_ENV === 'production';

  if (!isProduction) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`EduAssist AI Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
