import React from 'react';
import {
  Bot,
  Cpu,
  Database,
  Layers,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  BarChart3,
  GitBranch,
  Code2,
  Users,
  Search,
  ExternalLink,
  BookOpen
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  const techStack = [
    {
      category: 'Frontend',
      name: 'React 19 & TypeScript',
      desc: 'Modern component-driven UI with responsive Tailwind CSS layout, accessible modals, and instant state reactivity.',
      icon: Code2,
      color: 'bg-blue-50 text-blue-700 border-blue-200'
    },
    {
      category: 'AI / LLM Engine',
      name: 'Google Gemini (gemini-3.8-flash)',
      desc: 'Context-conditioned generative language model running via server-side @google/genai SDK with strict factual grounding.',
      icon: Sparkles,
      color: 'bg-violet-50 text-violet-700 border-violet-200'
    },
    {
      category: 'RAG Architecture',
      name: 'Retrieval-Augmented Generation',
      desc: 'Dense semantic chunk retrieval bridging raw institutional documentation with real-time prompt context synthesis.',
      icon: Layers,
      color: 'bg-indigo-50 text-indigo-700 border-indigo-200'
    },
    {
      category: 'Embeddings Model',
      name: 'Sentence Transformers (all-MiniLM-L6-v2)',
      desc: '384-dimensional dense semantic vector space capturing institutional policy intent beyond simple keyword matches.',
      icon: Cpu,
      color: 'bg-purple-50 text-purple-700 border-purple-200'
    },
    {
      category: 'Vector Search Index',
      name: 'FAISS (Facebook AI Similarity Search)',
      desc: 'Fast inner-product and cosine vector similarity retrieval with millisecond query lookups across knowledge base chunks.',
      icon: Database,
      color: 'bg-emerald-50 text-emerald-700 border-emerald-200'
    },
    {
      category: 'Backend / Server API',
      name: 'Node.js & Express (TypeScript / tsx)',
      desc: 'High-throughput full-stack architecture keeping the Gemini API key secured server-side with zero client exposure.',
      icon: GitBranch,
      color: 'bg-cyan-50 text-cyan-700 border-cyan-200'
    }
  ];

  const novelties = [
    {
      title: 'Unified Assistant for Students & Staff',
      desc: 'Consolidates academic handbooks, student attendance rules, hostel guides, faculty leave policies, and administrative circulars into one single conversational entry point.'
    },
    {
      title: 'Campus-Wide Scope vs. Course-Specific Bots',
      desc: 'Covers the entire institutional life cycle—admissions, continuous internal tests, grading scales, disciplinary conduct, placements, and campus facilities.'
    },
    {
      title: 'Strict Document Grounding & Anti-Hallucination',
      desc: 'The assistant never fabricates college policy. If an inquiry falls outside the indexed knowledge base, it transparently acknowledges missing context.'
    },
    {
      title: 'Transparent Source Snippets with Relevance Scores',
      desc: 'Every generated answer cites the exact document title, section heading, and computed relevance score, with 1-click modal verification.'
    },
    {
      title: 'Dynamic & Easy-to-Update Knowledge Base',
      desc: 'Administrators can upload new PDF circulars or policy updates, which are immediately chunked, embedded, and made searchable on the fly.'
    }
  ];

  return (
    <div className="space-y-12 pb-16">
      {/* Title & Introduction */}
      <section className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-xs">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200/60 text-indigo-700 text-xs font-semibold mb-4">
            <Bot className="w-3.5 h-3.5" />
            <span>Final Year Engineering Project • First Review Prototype</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            About EduAssist AI
          </h1>
          <p className="text-base text-slate-600 mt-4 leading-relaxed">
            <strong>EduAssist AI</strong> is an intelligent campus assistant designed to help students and staff quickly access information available in official institutional documents.
          </p>
          <p className="text-sm text-slate-600 mt-3 leading-relaxed">
            Traditional campus information retrieval relies on scouring multiple static PDFs, bulletin notice boards, and fragmented portals. EduAssist AI solves this problem by implementing a <strong>Retrieval-Augmented Generation (RAG)</strong> pipeline that retrieves the exact relevant document sections first, and passes them as verified context into Google Gemini to deliver factual, reliable answers.
          </p>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="space-y-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md">
            Implementation Architecture
          </span>
          <h2 className="text-2xl font-bold text-slate-900 mt-2">Technology Stack</h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Enterprise full-stack framework configured according to LangChain and modern AI Studio guidelines.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {techStack.map((tech, idx) => {
            const Icon = tech.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl p-5 border border-slate-200 hover:border-slate-300 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                      {tech.category}
                    </span>
                    <div className={`p-2 rounded-xl ${tech.color}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>
                  <h3 className="font-bold text-slate-900 text-base">{tech.name}</h3>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">{tech.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Project Novelty */}
      <section className="space-y-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md">
            Key Contributions
          </span>
          <h2 className="text-2xl font-bold text-slate-900 mt-2">Project Novelty</h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Distinguishing features engineered into EduAssist AI beyond standard conversational chatbots.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {novelties.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs flex items-start gap-4"
            >
              <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                0{idx + 1}
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-sm">{item.title}</h3>
                <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Planned Evaluation Section */}
      <section className="bg-gradient-to-br from-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-indigo-800/40">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-indigo-300 text-xs font-semibold mb-3">
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Project Roadmap & Benchmark Phase</span>
          </div>

          <h2 className="text-2xl font-bold text-white">Planned Evaluation</h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
            The next milestones scheduled for the second review will benchmark the retrieval precision and comparative LLM synthesis across official academic benchmarks:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            <div className="bg-white/10 rounded-2xl p-4.5 border border-white/10">
              <span className="text-[10px] font-bold text-indigo-300 uppercase tracking-wider block mb-1">
                Planned Evaluation 1
              </span>
              <h4 className="font-bold text-white text-sm">Recall@K & MRR Retrieval Metric</h4>
              <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
                Quantitative validation of vector retrieval performance using Recall@1, Recall@3, and Mean Reciprocal Rank (MRR) across an annotated set of 100+ standard campus inquiries.
              </p>
            </div>

            <div className="bg-white/10 rounded-2xl p-4.5 border border-white/10">
              <span className="text-[10px] font-bold text-indigo-300 uppercase tracking-wider block mb-1">
                Planned Evaluation 2
              </span>
              <h4 className="font-bold text-white text-sm">LLM Comparative Analysis (Gemini vs. Llama / GPT)</h4>
              <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
                Comparative evaluation analyzing context adherence, hallucination rate, token latency, and BLEU/ROUGE fidelity scores between Gemini 3.8 Flash, Llama-3-8B, and GPT-4o-mini.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Reviewer Demonstration Checklist */}
      <section className="bg-emerald-50/70 rounded-2xl p-6 border border-emerald-200 text-emerald-900">
        <div className="flex items-center gap-2 mb-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          <h3 className="font-bold text-base">First Review Demonstration Checklist</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
          <div className="bg-white p-3 rounded-xl border border-emerald-100 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>Documents: 25+ Institutional Policies</span>
          </div>
          <div className="bg-white p-3 rounded-xl border border-emerald-100 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>Demonstrable RAG 10-step Pipeline</span>
          </div>
          <div className="bg-white p-3 rounded-xl border border-emerald-100 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>Live Interactive Document Upload</span>
          </div>
          <div className="bg-white p-3 rounded-xl border border-emerald-100 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>Clickable Source Citations with % Score</span>
          </div>
          <div className="bg-white p-3 rounded-xl border border-emerald-100 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>Document Highlighting Modal</span>
          </div>
          <div className="bg-white p-3 rounded-xl border border-emerald-100 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>Zero-Crash Local Grounding Fallback</span>
          </div>
        </div>
      </section>
    </div>
  );
};
