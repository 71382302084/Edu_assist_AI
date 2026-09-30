import React from 'react';
import {
  Bot,
  BookOpen,
  ArrowRight,
  Sparkles,
  FileCheck,
  GraduationCap,
  Calendar,
  Briefcase,
  Clock,
  Bell,
  Users,
  ShieldCheck,
  CheckCircle2,
  Database,
  Building,
  Cpu
} from 'lucide-react';
import { StatsCard } from '../components/StatsCard';
import { RAGPipelineVisualizer } from '../components/RAGPipelineVisualizer';
import { DEMO_QUESTIONS } from '../data/sampleDocuments';

interface HomePageProps {
  onStartChat: (initialQuestion?: string) => void;
  onViewKnowledgeBase: () => void;
  documentCount: number;
}

export const HomePage: React.FC<HomePageProps> = ({
  onStartChat,
  onViewKnowledgeBase,
  documentCount
}) => {
  const capabilities = [
    {
      title: 'Academic Regulations',
      desc: 'Credit distribution, minimum CGPA requirements, 10-point grading scale, and re-evaluation procedures.',
      icon: GraduationCap,
      color: 'bg-blue-50 text-blue-700 border-blue-200/60',
      sampleQuestion: 'What are the academic regulations?'
    },
    {
      title: 'Examination Guidelines',
      desc: 'Semester end exam schedules, Continuous Assessment Tests (CATs), hall ticket download, and malpractice penalties.',
      icon: FileCheck,
      color: 'bg-indigo-50 text-indigo-700 border-indigo-200/60',
      sampleQuestion: 'When are the semester examinations?'
    },
    {
      title: 'Timetables & Calendar',
      desc: 'Semester milestones, daily period bell timings, mid-term breaks, practical exams, and winter/summer recess.',
      icon: Calendar,
      color: 'bg-purple-50 text-purple-700 border-purple-200/60',
      sampleQuestion: 'What is the semester timetable schedule?'
    },
    {
      title: 'Placement Information',
      desc: 'Eligibility cutoffs (CGPA >= 6.5), One-Student One-Job policy, dream offers, and pre-placement interview modules.',
      icon: Briefcase,
      color: 'bg-amber-50 text-amber-700 border-amber-200/60',
      sampleQuestion: 'What placement opportunities are available?'
    },
    {
      title: 'Leave Policies',
      desc: 'Attendance 75% rule, medical condonation up to 65%, casual leave procedures, and hostel outstation gate passes.',
      icon: Clock,
      color: 'bg-rose-50 text-rose-700 border-rose-200/60',
      sampleQuestion: 'What are the attendance requirements and leave rules?'
    },
    {
      title: 'College Circulars',
      desc: 'Gate operating hours, mandatory helmet safety rules, Wi-Fi onboarding, and 24/7 campus health center.',
      icon: Bell,
      color: 'bg-teal-50 text-teal-700 border-teal-200/60',
      sampleQuestion: 'What general college circulars and facilities are available?'
    },
    {
      title: 'Staff Policies',
      desc: 'Faculty casual leave, conference on-duty (OD) funding, earned leave accumulation, and maternity provisions.',
      icon: Users,
      color: 'bg-cyan-50 text-cyan-700 border-cyan-200/60',
      sampleQuestion: 'What are the faculty and staff leave policies?'
    },
    {
      title: 'General Campus Info',
      desc: 'Central library digital subscriptions (IEEE/Springer), student innovation seed grants, and hostel mess timings.',
      icon: ShieldCheck,
      color: 'bg-emerald-50 text-emerald-700 border-emerald-200/60',
      sampleQuestion: 'What are the central library and student code of conduct rules?'
    }
  ];

  return (
    <div className="space-y-12 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-indigo-900 via-indigo-950 to-slate-950 text-white p-8 sm:p-12 lg:p-16 shadow-xl border border-indigo-800/40">
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-violet-500/15 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative max-w-3xl z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-indigo-200 text-xs font-semibold mb-6">
            <Sparkles className="w-3.5 h-3.5 text-indigo-300" />
            <span>EduAssist AI • First Review Engineering Prototype</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-white">
            Ask Your Campus <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-300">Anything</span>
          </h1>

          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
            Get quick, reliable answers from official campus documents using Retrieval-Augmented Generation (RAG).
            Every response is strictly grounded in institutional circulars, regulations, and handbooks.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button
              onClick={() => onStartChat()}
              className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 text-white font-bold text-sm sm:text-base hover:from-indigo-600 hover:to-violet-700 shadow-lg shadow-indigo-500/25 transition-all hover:scale-105 cursor-pointer"
            >
              <Bot className="w-5 h-5" />
              <span>Start Chat</span>
              <ArrowRight className="w-4 h-4 ml-0.5" />
            </button>

            <button
              onClick={onViewKnowledgeBase}
              className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 backdrop-blur-md text-white border border-white/20 font-semibold text-sm sm:text-base transition-all cursor-pointer"
            >
              <BookOpen className="w-5 h-5 text-indigo-300" />
              <span>View Knowledge Base</span>
            </button>
          </div>

          {/* Verification pill */}
          <div className="mt-8 pt-6 border-t border-white/10 flex items-center gap-3 text-xs text-indigo-200/90 font-medium">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Document Grounded • Section Citations • Anti-Hallucination Guardrails</span>
          </div>
        </div>
      </section>

      {/* Statistics Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          icon={BookOpen}
          label="Documents Indexed"
          value={`${documentCount}+`}
          subtitle="Official policies, circulars & codes"
          accentColor="indigo"
        />
        <StatsCard
          icon={Users}
          label="Students & Staff"
          value="1000+"
          subtitle="Campus community served"
          accentColor="blue"
        />
        <StatsCard
          icon={Cpu}
          label="Response Type"
          value="AI + Grounded"
          subtitle="Strict context-bound synthesis"
          accentColor="purple"
        />
        <StatsCard
          icon={Database}
          label="Knowledge Base"
          value="FAISS"
          subtitle="Vector similarity index"
          accentColor="emerald"
        />
      </section>

      {/* Quick Review Demo Banner */}
      <section className="bg-gradient-to-r from-indigo-50 via-violet-50 to-blue-50 rounded-2xl p-6 border border-indigo-100/80 shadow-2xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-indigo-700 uppercase tracking-wider bg-white px-2 py-0.5 rounded shadow-2xs">
                Quick Demonstration Scenario
              </span>
              <span className="text-xs text-slate-500 font-medium">Click any question to trigger instant RAG flow</span>
            </div>
            <h3 className="text-lg font-bold text-slate-900 mt-1">
              Test Preloaded Evaluation Queries
            </h3>
          </div>
          <button
            onClick={() => onStartChat(DEMO_QUESTIONS[0])}
            className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold shadow-xs transition-colors shrink-0 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Launch Attendance Demo</span>
          </button>
        </div>

        <div className="flex flex-wrap gap-2">
          {DEMO_QUESTIONS.slice(0, 6).map((q, idx) => (
            <button
              key={idx}
              onClick={() => onStartChat(q)}
              className="text-left px-3.5 py-2 bg-white hover:bg-indigo-600 hover:text-white text-slate-700 rounded-xl text-xs font-medium border border-slate-200/90 shadow-2xs transition-all hover:scale-[1.02] cursor-pointer"
            >
              "{q}"
            </button>
          ))}
        </div>
      </section>

      {/* What can EduAssist AI help with? */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
            Campus Coverage
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-2">
            What can EduAssist AI help with?
          </h2>
          <p className="text-sm text-slate-600 mt-1.5">
            Trained and grounded across multiple institutional domains to assist students, teaching staff, and campus administration.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {capabilities.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                onClick={() => onStartChat(item.sampleQuestion)}
                className="group bg-white rounded-2xl p-5 border border-slate-200 hover:border-indigo-400 hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className={`w-11 h-11 rounded-xl ${item.color} flex items-center justify-center mb-3.5 shadow-2xs group-hover:scale-105 transition-transform`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm group-hover:text-indigo-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-indigo-600 font-semibold">
                  <span>Ask about this</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* RAG Pipeline Diagram */}
      <section>
        <RAGPipelineVisualizer />
      </section>
    </div>
  );
};
