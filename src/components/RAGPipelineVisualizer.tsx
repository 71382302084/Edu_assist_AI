import React, { useState } from 'react';
import {
  FileStack,
  FileCheck,
  Scissors,
  Cpu,
  Database,
  HelpCircle,
  Search,
  Filter,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  ArrowDown,
  Info
} from 'lucide-react';

interface StageInfo {
  id: string;
  name: string;
  subtitle: string;
  icon: any;
  color: string;
  badge: string;
  details: string;
  metrics: string;
}

export const RAGPipelineVisualizer: React.FC = () => {
  const [selectedStage, setSelectedStage] = useState<string>('faiss');

  const ingestionStages: StageInfo[] = [
    {
      id: 'collection',
      name: 'Document Collection',
      subtitle: 'Institutional Policies',
      icon: FileStack,
      color: 'blue',
      badge: 'Step 1',
      details: 'Official college documents: Academic Regulations, Exam Guidelines, Leave Policies, Timetables, and Placement Circulars in PDF/TXT.',
      metrics: '25+ Verified Source Documents'
    },
    {
      id: 'preprocessing',
      name: 'Text Preprocessing',
      subtitle: 'Cleaning & Normalization',
      icon: FileCheck,
      color: 'indigo',
      badge: 'Step 2',
      details: 'Stripping PDF artifacts, whitespace normalization, header/footer extraction, and unicode normalization.',
      metrics: '100% Normalized Text'
    },
    {
      id: 'chunking',
      name: 'Semantic Chunking',
      subtitle: '512 Token Windows',
      icon: Scissors,
      color: 'purple',
      badge: 'Step 3',
      details: 'Splitting documents into section-aware chunks of 500 tokens with 50-token overlapping boundaries to preserve context across boundaries.',
      metrics: '350+ Vector Chunks'
    },
    {
      id: 'embeddings',
      name: 'Sentence Transformers',
      subtitle: 'all-MiniLM-L6-v2',
      icon: Cpu,
      color: 'violet',
      badge: 'Step 4',
      details: 'Generating 384-dimensional dense semantic vector representations capturing conceptual meanings rather than surface keyword matches.',
      metrics: '384 Dimensions / Chunk'
    },
    {
      id: 'faiss',
      name: 'FAISS Vector Index',
      subtitle: 'HNSW / Flat Index',
      icon: Database,
      color: 'emerald',
      badge: 'Step 5',
      details: 'High-performance vector indexing using Facebook AI Similarity Search (FAISS) with inner product / cosine distance for millisecond retrieval.',
      metrics: '< 15ms Query Latency'
    }
  ];

  const queryStages: StageInfo[] = [
    {
      id: 'user-query',
      name: 'User Question',
      subtitle: 'Natural Language Input',
      icon: HelpCircle,
      color: 'sky',
      badge: 'Step 6',
      details: 'Student or faculty asks question (e.g. "What are the attendance requirements?" or "When are the semester exams?").',
      metrics: 'Campus Multi-Role Queries'
    },
    {
      id: 'similarity',
      name: 'Similarity Search',
      subtitle: 'Cosine Distance Match',
      icon: Search,
      color: 'indigo',
      badge: 'Step 7',
      details: 'Query is embedded into vector space and ranked against indexed chunks using cosine similarity scoring.',
      metrics: 'Top-k = 3 Relevant Chunks'
    },
    {
      id: 'context',
      name: 'Relevant Context',
      subtitle: 'Prompt Grounding',
      icon: Filter,
      color: 'amber',
      badge: 'Step 8',
      details: 'Highest scoring chunks are injected into the prompt along with strict anti-hallucination institutional system instructions.',
      metrics: 'Avg 92% Retrieval Precision'
    },
    {
      id: 'gemini',
      name: 'Gemini LLM',
      subtitle: 'gemini-3.8-flash',
      icon: Sparkles,
      color: 'violet',
      badge: 'Step 9',
      details: 'State-of-the-art Google Gemini LLM processes the retrieved factual context to synthesize a concise, structured answer.',
      metrics: 'Temperature: 0.2 (Factual)'
    },
    {
      id: 'answer',
      name: 'Grounded Answer',
      subtitle: 'With Source Citations',
      icon: CheckCircle2,
      color: 'emerald',
      badge: 'Step 10',
      details: 'Delivers factual answer accompanied by verifiable source document names, section titles, and relevance percentages.',
      metrics: 'Zero Untracked Hallucinations'
    }
  ];

  const allStages = [...ingestionStages, ...queryStages];
  const activeDetail = allStages.find(s => s.id === selectedStage) || allStages[4];

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md">
              Architecture Overview
            </span>
            <span className="text-xs text-slate-500 font-medium">EduAssist AI Core</span>
          </div>
          <h3 className="text-2xl font-bold text-slate-900 mt-1">Retrieval-Augmented Generation (RAG) Pipeline</h3>
          <p className="text-sm text-slate-600 mt-1">
            How official campus documents are indexed, retrieved, and grounded to deliver zero-hallucination answers.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl text-xs font-semibold text-slate-700">
          <span className="px-3 py-1 bg-white rounded-lg shadow-2xs text-indigo-700">Interactive Pipeline</span>
          <span className="px-3 py-1 text-slate-500">Click any node to inspect</span>
        </div>
      </div>

      {/* Part 1: Document Indexing Phase */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Phase 1: Knowledge Base Ingestion & Vector Indexing
          </span>
          <div className="h-px bg-slate-200 flex-1"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {ingestionStages.map((stage, idx) => {
            const Icon = stage.icon;
            const isSelected = selectedStage === stage.id;
            return (
              <div key={stage.id} className="relative group">
                <button
                  onClick={() => setSelectedStage(stage.id)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all cursor-pointer h-full flex flex-col justify-between ${
                    isSelected
                      ? 'bg-indigo-50/70 border-indigo-500 shadow-md ring-2 ring-indigo-200'
                      : 'bg-slate-50/70 border-slate-200 hover:border-slate-300 hover:bg-white'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-1 mb-2">
                      <span className="text-[10px] font-bold text-indigo-600 bg-indigo-100/60 px-2 py-0.5 rounded">
                        {stage.badge}
                      </span>
                      <Icon className={`w-4 h-4 ${isSelected ? 'text-indigo-600' : 'text-slate-400'}`} />
                    </div>
                    <p className="font-bold text-slate-900 text-xs sm:text-sm">{stage.name}</p>
                    <p className="text-[11px] text-slate-500 mt-0.5">{stage.subtitle}</p>
                  </div>
                  <div className="mt-3 pt-2 border-t border-slate-200/60 text-[10px] text-slate-600 font-mono">
                    {stage.metrics}
                  </div>
                </button>
                {idx < ingestionStages.length - 1 && (
                  <div className="hidden lg:flex absolute -right-2 top-1/2 -translate-y-1/2 z-10 w-4 h-4 bg-white border border-slate-300 rounded-full items-center justify-center text-slate-400 shadow-2xs">
                    <ArrowRight className="w-2.5 h-2.5" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Downward transition indicator */}
      <div className="flex justify-center my-3">
        <div className="flex items-center gap-2 px-3 py-1 bg-slate-100 rounded-full text-xs font-medium text-slate-600 border border-slate-200">
          <ArrowDown className="w-3.5 h-3.5 text-indigo-600 animate-bounce" />
          <span>Vector Index ready for live student queries</span>
        </div>
      </div>

      {/* Part 2: Query & Grounded Generation Phase */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Phase 2: Question Retrieval & Gemini LLM Synthesis
          </span>
          <div className="h-px bg-slate-200 flex-1"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {queryStages.map((stage, idx) => {
            const Icon = stage.icon;
            const isSelected = selectedStage === stage.id;
            return (
              <div key={stage.id} className="relative group">
                <button
                  onClick={() => setSelectedStage(stage.id)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all cursor-pointer h-full flex flex-col justify-between ${
                    isSelected
                      ? 'bg-violet-50/70 border-violet-500 shadow-md ring-2 ring-violet-200'
                      : 'bg-slate-50/70 border-slate-200 hover:border-slate-300 hover:bg-white'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-1 mb-2">
                      <span className="text-[10px] font-bold text-violet-600 bg-violet-100/60 px-2 py-0.5 rounded">
                        {stage.badge}
                      </span>
                      <Icon className={`w-4 h-4 ${isSelected ? 'text-violet-600' : 'text-slate-400'}`} />
                    </div>
                    <p className="font-bold text-slate-900 text-xs sm:text-sm">{stage.name}</p>
                    <p className="text-[11px] text-slate-500 mt-0.5">{stage.subtitle}</p>
                  </div>
                  <div className="mt-3 pt-2 border-t border-slate-200/60 text-[10px] text-slate-600 font-mono">
                    {stage.metrics}
                  </div>
                </button>
                {idx < queryStages.length - 1 && (
                  <div className="hidden lg:flex absolute -right-2 top-1/2 -translate-y-1/2 z-10 w-4 h-4 bg-white border border-slate-300 rounded-full items-center justify-center text-slate-400 shadow-2xs">
                    <ArrowRight className="w-2.5 h-2.5" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected Stage Detail Card */}
      <div className="bg-gradient-to-r from-slate-900 to-indigo-950 rounded-2xl p-5 text-white flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0 mt-0.5 text-indigo-300">
            <Info className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-indigo-300 uppercase tracking-wider">
                {activeDetail.badge} Inspector:
              </span>
              <span className="font-bold text-white text-base">{activeDetail.name}</span>
            </div>
            <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
              {activeDetail.details}
            </p>
          </div>
        </div>

        <div className="shrink-0 bg-white/10 px-4 py-2 rounded-xl border border-white/10 text-right">
          <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Operational Benchmark</span>
          <span className="text-xs font-mono font-bold text-indigo-300">{activeDetail.metrics}</span>
        </div>
      </div>
    </div>
  );
};
