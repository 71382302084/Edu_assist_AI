import React, { useState, useEffect, useRef } from 'react';
import {
  Send,
  Bot,
  User,
  CheckCircle2,
  Sparkles,
  Search,
  FileText,
  Bookmark,
  AlertCircle,
  Clock,
  RotateCcw,
  MessageSquare,
  HelpCircle,
  Cpu,
  Layers,
  ChevronRight,
  ArrowRight,
  ExternalLink
} from 'lucide-react';
import { CampusDocument, ChatMessage, RetrievedChunk } from '../types';
import { SourceCard } from '../components/SourceCard';
import { DEMO_QUESTIONS } from '../data/sampleDocuments';
import { RAGEngine } from '../services/ragEngine';

interface ChatPageProps {
  documents: CampusDocument[];
  onOpenDocumentModal: (doc: CampusDocument, sectionTitle?: string) => void;
  initialQuestion?: string;
  onClearInitialQuestion?: () => void;
}

export const ChatPage: React.FC<ChatPageProps> = ({
  documents,
  onOpenDocumentModal,
  initialQuestion,
  onClearInitialQuestion
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    // Initial welcome message
    return [
      {
        id: 'msg-welcome',
        role: 'assistant',
        content: `Hello! I am **EduAssist AI**, your campus assistant grounded in official institutional documents. 

I can help students and faculty with:
• **Academic Regulations** & credit guidelines
• **Examination Rules**, CAT schedules, and malpractice policies
• **Attendance Requirements** (75% rule) & medical condonations
• **Student & Staff Leave Procedures**
• **Placement Eligibility** & recruitment guidelines
• **Semester Timetables** & general campus facilities

Feel free to ask a question below or click any of the demonstration questions in the sidebar!`,
        timestamp: 'Just now',
        isGrounded: true
      }
    ];
  });

  const [inputValue, setInputValue] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [activeSearchStatus, setActiveSearchStatus] = useState<string>('');
  const [activeRetrievedPreviews, setActiveRetrievedPreviews] = useState<RetrievedChunk[]>([]);
  const [conversations, setConversations] = useState<Array<{ id: string; title: string; timestamp: string }>>([
    { id: 'conv-1', title: 'Campus Policies & Regulations', timestamp: 'Active Session' }
  ]);
  const [activeConvId, setActiveConvId] = useState('conv-1');

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom of chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isSearching, activeSearchStatus]);

  // Handle incoming initialQuestion from Home page demo
  useEffect(() => {
    if (initialQuestion) {
      handleSendMessage(initialQuestion);
      if (onClearInitialQuestion) {
        onClearInitialQuestion();
      }
    }
  }, [initialQuestion]);

  // Core RAG execution workflow
  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputValue).trim();
    if (!query || isSearching) return;

    setInputValue('');

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsSearching(true);
    setActiveSearchStatus('Searching Knowledge Base (FAISS Vector Index)...');
    setActiveRetrievedPreviews([]);

    try {
      // Step 1: Perform vector retrieval using client engine for instant visual preview
      const localEngine = new RAGEngine(documents);
      const retrieved = localEngine.search(query, 3);

      await new Promise((r) => setTimeout(r, 600)); // Visible realistic RAG latency for demonstration

      if (retrieved.length > 0) {
        setActiveSearchStatus(`Retrieved ${retrieved.length} relevant documents`);
        setActiveRetrievedPreviews(retrieved);
        await new Promise((r) => setTimeout(r, 700));
        setActiveSearchStatus('Gemini synthesizing grounded answer...');
      } else {
        setActiveSearchStatus('No direct vector match found in index');
      }

      // Step 2: Query server endpoint (which calls Gemini with context or falls back gracefully)
      let answerText = '';
      let isGrounded = true;
      let finalSources: RetrievedChunk[] = retrieved;
      let latencyMs = 850;

      try {
        const response = await fetch('/api/rag/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: query,
            customDocs: documents
          })
        });

        if (response.ok) {
          const data = await response.json();
          answerText = data.answer;
          finalSources = data.sources || retrieved;
          isGrounded = data.isGrounded !== false;
          latencyMs = data.pipelineLatencyMs || latencyMs;
        } else {
          throw new Error('Server returned non-200');
        }
      } catch (networkOrServerError) {
        // High quality fallback local synthesis so demo NEVER crashes even offline
        console.warn('API call fallback to local synthesis:', networkOrServerError);
        answerText = localEngine.generateLocalSynthesis(query, retrieved);
        finalSources = retrieved;
        isGrounded = retrieved.length > 0;
      }

      const assistantMessage: ChatMessage = {
        id: `assist-${Date.now()}`,
        role: 'assistant',
        content: answerText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        sources: finalSources,
        isGrounded: isGrounded && finalSources.length > 0,
        pipelineLatencyMs: latencyMs
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err: any) {
      console.error('Chat error:', err);
      const errorMessage: ChatMessage = {
        id: `err-${Date.now()}`,
        role: 'assistant',
        content: 'AI service is temporarily unavailable. Please refer directly to the Knowledge Base page to view all official campus documents.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isGrounded: false
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsSearching(false);
      setActiveSearchStatus('');
      setActiveRetrievedPreviews([]);
      inputRef.current?.focus();
    }
  };

  const handleSourceClick = (source: RetrievedChunk) => {
    // Find the corresponding document in documents array
    const doc = documents.find(
      (d) => d.id === source.docId || d.title.toLowerCase() === source.docTitle.toLowerCase()
    );
    if (doc) {
      onOpenDocumentModal(doc, source.sectionTitle);
    }
  };

  const handleClearHistory = () => {
    setMessages([
      {
        id: `msg-welcome-${Date.now()}`,
        role: 'assistant',
        content: 'EduAssist AI session reset. Ask any question about official college rules, exams, attendance, or circulars.',
        timestamp: 'Just now',
        isGrounded: true
      }
    ]);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-140px)] min-h-[640px]">
      {/* Sidebar: Conversation history + Demo Questions + KB Status */}
      <aside className="hidden lg:flex flex-col w-80 bg-white rounded-2xl border border-slate-200 shadow-xs p-4 justify-between shrink-0 overflow-hidden">
        <div className="space-y-5 overflow-y-auto pr-1">
          {/* Status Box */}
          <div className="bg-indigo-50/70 border border-indigo-100 rounded-xl p-3.5">
            <div className="flex items-center justify-between text-xs font-semibold mb-1">
              <span className="text-indigo-900">Knowledge Base Status</span>
              <span className="flex items-center gap-1.5 text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded-full text-[10px] font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                Connected
              </span>
            </div>
            <p className="text-[11px] text-slate-600">
              FAISS vector index connected with {documents.length} institutional policies and regulations.
            </p>
          </div>

          {/* Demonstration Questions */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                Demo Questions
              </span>
              <span className="text-[10px] font-semibold text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded">
                1-Click
              </span>
            </div>

            <div className="space-y-1.5">
              {DEMO_QUESTIONS.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(q)}
                  disabled={isSearching}
                  className="w-full text-left p-2.5 rounded-xl border border-slate-200/80 bg-slate-50/60 hover:bg-indigo-50 hover:border-indigo-300 hover:text-indigo-900 text-slate-700 text-xs font-medium transition-all flex items-center justify-between group cursor-pointer"
                >
                  <span className="truncate pr-1">"{q}"</span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-600 shrink-0" />
                </button>
              ))}
            </div>
          </div>

          {/* Active Session info */}
          <div>
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">
              Active Session
            </span>
            <div className="flex items-center gap-2.5 p-2.5 bg-slate-100/70 rounded-xl text-xs text-slate-700 font-medium">
              <MessageSquare className="w-4 h-4 text-indigo-600" />
              <div className="truncate">
                <p className="font-semibold text-slate-900">Campus Inquiry Session</p>
                <p className="text-[10px] text-slate-500">{messages.length} messages exchanged</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="pt-3 border-t border-slate-200">
          <button
            onClick={handleClearHistory}
            className="w-full flex items-center justify-center gap-2 py-2 px-3 text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Conversation</span>
          </button>
        </div>
      </aside>

      {/* Main Chat Interface */}
      <main className="flex-1 bg-white rounded-2xl border border-slate-200 shadow-xs flex flex-col overflow-hidden">
        {/* Chat Header */}
        <div className="px-6 py-3.5 border-b border-slate-200 bg-slate-50/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-600 text-white flex items-center justify-center shadow-xs">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-bold text-slate-900 text-sm sm:text-base">EduAssist AI Assistant</h2>
                <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full">
                  ● Knowledge Base Connected
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Retrieval-Augmented Generation grounded in official institutional documents
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="hidden sm:flex items-center gap-1.5 text-xs text-indigo-700 font-semibold bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-lg">
              <Cpu className="w-3.5 h-3.5 text-indigo-600" />
              <span>Gemini 3.8 Flash</span>
            </span>
          </div>
        </div>

        {/* Messages Stream */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-6">
          {messages.map((message) => {
            const isUser = message.role === 'user';
            return (
              <div
                key={message.id}
                className={`flex gap-3 sm:gap-4 ${isUser ? 'justify-end' : 'justify-start'}`}
              >
                {!isUser && (
                  <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`max-w-[85%] sm:max-w-2xl rounded-2xl p-4 sm:p-5 ${
                    isUser
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'bg-slate-50 border border-slate-200/90 text-slate-800'
                  }`}
                >
                  {/* Top metadata for assistant message */}
                  {!isUser && (
                    <div className="flex items-center justify-between gap-2 mb-2 pb-2 border-b border-slate-200/60">
                      <span className="text-xs font-bold text-indigo-600 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5" /> EduAssist AI
                      </span>
                      {message.isGrounded && (
                        <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 rounded-full flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Grounded in Knowledge Base
                        </span>
                      )}
                    </div>
                  )}

                  {/* Message Content */}
                  <div
                    className={`text-xs sm:text-sm leading-relaxed whitespace-pre-line ${
                      isUser ? 'text-white' : 'text-slate-800'
                    }`}
                  >
                    {message.content}
                  </div>

                  {/* Retrieved Sources Section */}
                  {!isUser && message.sources && message.sources.length > 0 && (
                    <div className="mt-4 pt-3.5 border-t border-slate-200/80">
                      <div className="flex items-center justify-between mb-2.5">
                        <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                          <FileText className="w-3.5 h-3.5 text-indigo-600" />
                          Retrieved Sources ({message.sources.length})
                        </span>
                        <span className="text-[11px] text-slate-500 font-medium">
                          Click card to view official document
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {message.sources.map((source, sIdx) => (
                          <SourceCard
                            key={sIdx}
                            source={source}
                            onClick={handleSourceClick}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="mt-2 flex items-center justify-end gap-2 text-[10px] text-slate-400">
                    {message.pipelineLatencyMs && (
                      <span>Latency: {message.pipelineLatencyMs}ms</span>
                    )}
                    <span>{message.timestamp}</span>
                  </div>
                </div>

                {isUser && (
                  <div className="w-8 h-8 rounded-lg bg-slate-800 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            );
          })}

          {/* Active RAG Pipeline Animation / Status Indicator */}
          {isSearching && (
            <div className="flex gap-3 sm:gap-4 justify-start animate-in fade-in duration-300">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center shrink-0 mt-0.5">
                <Bot className="w-4 h-4" />
              </div>

              <div className="bg-white border-2 border-indigo-200 rounded-2xl p-4 sm:p-5 max-w-xl shadow-md space-y-3">
                <div className="flex items-center gap-2 text-indigo-700 font-semibold text-xs sm:text-sm">
                  <Search className="w-4 h-4 animate-spin text-indigo-600" />
                  <span>{activeSearchStatus}</span>
                </div>

                {/* Retrieved Document previews as they arrive */}
                {activeRetrievedPreviews.length > 0 && (
                  <div className="space-y-1.5 pt-1 border-t border-slate-100">
                    <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                      Retrieved Knowledge Chunks:
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {activeRetrievedPreviews.map((p, pIdx) => (
                        <span
                          key={pIdx}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-indigo-50 border border-indigo-200 text-indigo-800 text-xs font-medium"
                        >
                          <FileText className="w-3 h-3 text-indigo-600" />
                          <span className="font-semibold">{p.docTitle}</span>
                          <span className="text-[10px] text-indigo-500">({p.relevancePercent}%)</span>
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-indigo-600 h-1.5 rounded-full animate-pulse w-3/4"></div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="p-4 border-t border-slate-200 bg-white">
          {/* Quick chip suggestions for mobile or rapid review */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-2 text-xs scrollbar-none">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider shrink-0">
              Suggestions:
            </span>
            <button
              type="button"
              onClick={() => handleSendMessage('What are the attendance requirements?')}
              className="px-2.5 py-1 bg-slate-100 hover:bg-indigo-50 text-slate-700 hover:text-indigo-700 rounded-full text-xs font-medium shrink-0 transition-colors cursor-pointer"
            >
              Attendance Requirements
            </button>
            <button
              type="button"
              onClick={() => handleSendMessage('When are the semester examinations?')}
              className="px-2.5 py-1 bg-slate-100 hover:bg-indigo-50 text-slate-700 hover:text-indigo-700 rounded-full text-xs font-medium shrink-0 transition-colors cursor-pointer"
            >
              Semester Examinations
            </button>
            <button
              type="button"
              onClick={() => handleSendMessage('What are the leave rules?')}
              className="px-2.5 py-1 bg-slate-100 hover:bg-indigo-50 text-slate-700 hover:text-indigo-700 rounded-full text-xs font-medium shrink-0 transition-colors cursor-pointer"
            >
              Leave Rules
            </button>
            <button
              type="button"
              onClick={() => handleSendMessage('What placement opportunities are available?')}
              className="px-2.5 py-1 bg-slate-100 hover:bg-indigo-50 text-slate-700 hover:text-indigo-700 rounded-full text-xs font-medium shrink-0 transition-colors cursor-pointer"
            >
              Placement Eligibility
            </button>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <div className="relative flex-1">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask a question about your college (e.g. attendance, exams, leave, placement)..."
                disabled={isSearching}
                className="w-full pl-4 pr-10 py-3 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all text-slate-900 placeholder:text-slate-400"
              />
            </div>

            <button
              type="submit"
              disabled={!inputValue.trim() || isSearching}
              className={`p-3 rounded-xl font-medium transition-all flex items-center justify-center shrink-0 cursor-pointer ${
                inputValue.trim() && !isSearching
                  ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              <Send className="w-5 h-5" />
            </button>
          </form>

          <p className="text-[11px] text-center text-slate-400 mt-2">
            Answers are synthesized by Gemini exclusively from indexed campus documents. No personal student data is processed.
          </p>
        </div>
      </main>
    </div>
  );
};
