import React from 'react';
import { FileText, ChevronRight, Bookmark } from 'lucide-react';
import { RetrievedChunk } from '../types';

interface SourceCardProps {
  source: RetrievedChunk;
  onClick: (source: RetrievedChunk) => void;
}

export const SourceCard: React.FC<SourceCardProps> = ({ source, onClick }) => {
  // Score badge color
  const getBadgeStyle = (pct: number) => {
    if (pct >= 88) return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    if (pct >= 75) return 'bg-indigo-50 text-indigo-700 border-indigo-200';
    return 'bg-amber-50 text-amber-700 border-amber-200';
  };

  return (
    <div
      onClick={() => onClick(source)}
      className="group bg-white rounded-xl p-3.5 border border-slate-200 hover:border-indigo-400 hover:shadow-md transition-all cursor-pointer text-left relative flex flex-col justify-between"
    >
      <div>
        <div className="flex items-center justify-between gap-2 mb-1.5">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-800 truncate">
            <FileText className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
            <span className="truncate group-hover:text-indigo-600 transition-colors">
              {source.docTitle}
            </span>
          </div>

          <span
            className={`text-[10px] font-bold px-2 py-0.5 rounded-full border shrink-0 ${getBadgeStyle(
              source.relevancePercent
            )}`}
          >
            {source.relevancePercent}% relevant
          </span>
        </div>

        <div className="flex items-center gap-1 text-[11px] font-medium text-slate-500 mb-1">
          <Bookmark className="w-3 h-3 text-slate-400" />
          <span className="text-slate-700 font-semibold">{source.sectionTitle}</span>
        </div>

        <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed bg-slate-50/70 p-2 rounded-lg border border-slate-100">
          "{source.content}"
        </p>
      </div>

      <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-indigo-600 font-medium">
        <span>Click to view official document</span>
        <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
      </div>
    </div>
  );
};
