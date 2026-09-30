import React from 'react';
import { X, FileText, Calendar, Tag, CheckCircle2, Bookmark, Copy, Check } from 'lucide-react';
import { CampusDocument } from '../types';

interface DocumentModalProps {
  document: CampusDocument | null;
  highlightSectionTitle?: string | null;
  onClose: () => void;
}

export const DocumentModal: React.FC<DocumentModalProps> = ({
  document,
  highlightSectionTitle,
  onClose
}) => {
  const [copied, setCopied] = React.useState(false);

  if (!document) return null;

  const handleCopy = () => {
    const fullText = `${document.title}\nCode: ${document.code}\n\n` +
      document.sections.map(s => `--- ${s.title} ---\n${s.content}`).join('\n\n');
    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl border border-slate-200 flex flex-col max-h-[85vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-slate-200 bg-slate-50/70 flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center shrink-0 mt-0.5">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-mono font-semibold px-2 py-0.5 bg-slate-200/80 text-slate-800 rounded">
                  {document.code}
                </span>
                <span className="text-xs font-medium px-2 py-0.5 bg-indigo-50 text-indigo-700 border border-indigo-200/60 rounded">
                  {document.category}
                </span>
                <span className="text-xs font-medium px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200/60 rounded flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Indexed
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mt-1">{document.title}</h3>
              <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" /> Updated: {document.lastUpdated}
                </span>
                <span>Version: {document.version || 'v1.0'}</span>
                <span>{document.sections.length} Sections ({document.chunksCount} Vector Chunks)</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={handleCopy}
              title="Copy document text"
              className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-200/60 rounded-lg transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-200/60 rounded-lg transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Notice */}
        <div className="bg-blue-50/70 border-b border-blue-100 px-6 py-2.5 text-xs text-blue-900 flex items-center justify-between">
          <span>Prototype Knowledge Base record loaded directly from vector memory.</span>
          {highlightSectionTitle && (
            <span className="font-semibold text-indigo-700 flex items-center gap-1">
              <Bookmark className="w-3.5 h-3.5" /> Highlighting retrieved citation section
            </span>
          )}
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 text-sm text-slate-700">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Executive Summary</p>
            <p className="leading-relaxed">{document.summary}</p>
          </div>

          <div className="space-y-4">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Document Provisions & Policy Sections ({document.sections.length})
            </h4>

            {document.sections.map((section, idx) => {
              const isHighlighted = highlightSectionTitle && (
                section.title.toLowerCase().includes(highlightSectionTitle.toLowerCase()) ||
                highlightSectionTitle.toLowerCase().includes(section.title.toLowerCase())
              );

              return (
                <div
                  key={section.id || idx}
                  className={`rounded-xl p-4.5 transition-all ${
                    isHighlighted
                      ? 'bg-amber-50/80 border-2 border-amber-400 shadow-sm ring-2 ring-amber-100'
                      : 'bg-white border border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <h5 className="font-semibold text-slate-900 text-sm flex items-center gap-2">
                      <span className="w-5 h-5 rounded-md bg-slate-100 text-slate-700 text-xs flex items-center justify-center font-bold">
                        {idx + 1}
                      </span>
                      {section.title}
                    </h5>
                    {isHighlighted && (
                      <span className="text-[11px] font-bold px-2 py-0.5 bg-amber-500 text-white rounded-full flex items-center gap-1 shadow-2xs">
                        <Bookmark className="w-3 h-3 fill-current" /> Grounded Source Section
                      </span>
                    )}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-line pl-7">
                    {section.content}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50/80 flex items-center justify-between text-xs text-slate-500">
          <span>EduAssist AI Document Repository • FAISS Indexed</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition-colors cursor-pointer"
          >
            Close Document
          </button>
        </div>
      </div>
    </div>
  );
};
