import React from 'react';
import { X, Sparkles, CheckCircle2, ArrowRight, Play, BookOpen, Layers, Bot } from 'lucide-react';
import { DEMO_QUESTIONS } from '../data/sampleDocuments';

interface DemoModeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectQuestion: (question: string) => void;
}

export const DemoModeModal: React.FC<DemoModeModalProps> = ({
  isOpen,
  onClose,
  onSelectQuestion
}) => {
  if (!isOpen) return null;

  const scenarios = [
    {
      title: 'Scenario 1: Attendance Requirements (Primary Review Query)',
      question: 'What are the attendance requirements?',
      expectedDoc: 'Student Attendance Policy & Condonation Rules (ATT-POL-2025)',
      description: 'Demonstrates retrieval of the 75% mandatory attendance rule, 65% medical condonation threshold, and exam debarment clause.'
    },
    {
      title: 'Scenario 2: Semester Examination Guidelines',
      question: 'When are the semester examinations?',
      expectedDoc: 'Examination Guidelines & Malpractice Rules & Semester Timetable',
      description: 'Demonstrates cross-document synthesis linking exam morning/afternoon timings with December/May schedule dates.'
    },
    {
      title: 'Scenario 3: Student & Hostel Leave Rules',
      question: 'What are the leave rules?',
      expectedDoc: 'Student Leave Rules & Application Process (STU-LEAVE-2025)',
      description: 'Retrieves 3-day casual leave limits, medical prescription certificates, and hostel gate pass protocols.'
    },
    {
      title: 'Scenario 4: Placement Drive Eligibility',
      question: 'What placement opportunities are available?',
      expectedDoc: 'Placement Cell Circular & Recruitment Regulations (PLACE-CIRC-2025-A)',
      description: 'Retrieves minimum 6.50 CGPA requirement, One-Student One-Offer policy, and dream offer thresholds.'
    },
    {
      title: 'Scenario 5: Student Code of Conduct & Anti-Ragging',
      question: 'What is the student code of conduct?',
      expectedDoc: 'Student Code of Conduct & Campus Discipline (STU-CONDUCT-2025)',
      description: 'Retrieves mandatory RFID identity card rules and zero-tolerance anti-ragging helpline procedures.'
    },
    {
      title: 'Scenario 6: Knowledge Base Index Meta Query',
      question: 'What documents are available in the knowledge base?',
      expectedDoc: 'Full FAISS Vector Repository Index',
      description: 'Demonstrates knowledge-base self-awareness by listing indexed institutional policies and handbooks.'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 flex flex-col max-h-[85vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-slate-200 bg-gradient-to-r from-indigo-900 to-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-indigo-300">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-white">Project Review Demo Mode</h3>
                <span className="text-[10px] font-bold bg-indigo-500/40 text-indigo-200 border border-indigo-400/30 px-2 py-0.5 rounded">
                  First Review Live Evaluator
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                Preloaded evaluation scenarios designed for engineering project presentation
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* List of scenarios */}
        <div className="p-6 overflow-y-auto space-y-3.5">
          <div className="bg-indigo-50/70 border border-indigo-100 rounded-xl p-3 text-xs text-indigo-900 flex items-center gap-2">
            <Bot className="w-4 h-4 text-indigo-600 shrink-0" />
            <span>
              Clicking any test scenario switches directly to the AI Assistant and executes the full RAG pipeline (Retrieval → Context → Gemini Synthesis → Clickable Sources).
            </span>
          </div>

          {scenarios.map((sc, idx) => (
            <div
              key={idx}
              className="bg-slate-50 hover:bg-white border border-slate-200 hover:border-indigo-400 hover:shadow-md rounded-xl p-4 transition-all group"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="text-[11px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
                    {sc.title}
                  </span>
                  <p className="text-sm font-bold text-slate-900 mt-1.5">
                    "{sc.question}"
                  </p>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    {sc.description}
                  </p>
                  <p className="text-[11px] text-slate-500 mt-2 flex items-center gap-1 font-mono">
                    <BookOpen className="w-3 h-3 text-slate-400" /> Grounding Target: {sc.expectedDoc}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    onSelectQuestion(sc.question);
                    onClose();
                  }}
                  className="shrink-0 flex items-center gap-1.5 px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold shadow-xs transition-transform group-hover:scale-105 cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Run Scenario</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between text-xs text-slate-500">
          <span>EduAssist AI • Grounded RAG Prototype</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold rounded-lg transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
