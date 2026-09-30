import React from 'react';
import { Bot, BookOpen, Home, Info, Sparkles, CheckCircle2, ShieldAlert } from 'lucide-react';

interface NavbarProps {
  activeTab: 'home' | 'chat' | 'knowledge-base' | 'about';
  setActiveTab: (tab: 'home' | 'chat' | 'knowledge-base' | 'about') => void;
  onOpenDemo?: () => void;
  documentCount?: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenDemo,
  documentCount = 25
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <div
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-700 via-indigo-600 to-violet-600 flex items-center justify-center text-white shadow-md shadow-indigo-100 group-hover:scale-105 transition-transform">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-xl tracking-tight text-slate-900 group-hover:text-indigo-600 transition-colors">
                  EduAssist AI
                </span>
                <span className="px-1.5 py-0.5 text-[10px] font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200/60 rounded">
                  RAG Core
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">Intelligent Campus Assistant</p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-100/80 p-1 rounded-xl border border-slate-200/60">
            <button
              onClick={() => setActiveTab('home')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'home'
                  ? 'bg-white text-indigo-700 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              <Home className="w-4 h-4" />
              Home
            </button>

            <button
              onClick={() => setActiveTab('chat')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'chat'
                  ? 'bg-white text-indigo-700 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              <Bot className="w-4 h-4 text-indigo-600" />
              AI Assistant
            </button>

            <button
              onClick={() => setActiveTab('knowledge-base')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'knowledge-base'
                  ? 'bg-white text-indigo-700 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              Knowledge Base
            </button>

            <button
              onClick={() => setActiveTab('about')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'about'
                  ? 'bg-white text-indigo-700 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              <Info className="w-4 h-4" />
              About
            </button>
          </nav>

          {/* Quick status & Live Demo Action */}
          <div className="flex items-center gap-3">
            <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 bg-emerald-50 border border-emerald-200/80 rounded-full text-xs font-medium text-emerald-800">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>FAISS Index: {documentCount}+ Documents</span>
            </div>

            {onOpenDemo && (
              <button
                onClick={onOpenDemo}
                className="flex items-center gap-1.5 px-3.5 py-1.5 bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-xs sm:text-sm font-semibold rounded-lg shadow-sm hover:from-indigo-700 hover:to-violet-700 hover:shadow-indigo-200 transition-all cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>Demo Mode</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile nav row */}
      <div className="md:hidden flex border-t border-slate-200 bg-slate-50 px-2 py-1 justify-around text-xs">
        <button
          onClick={() => setActiveTab('home')}
          className={`flex items-center gap-1 py-1 px-2.5 rounded ${activeTab === 'home' ? 'text-indigo-700 font-semibold' : 'text-slate-600'}`}
        >
          <Home className="w-3.5 h-3.5" /> Home
        </button>
        <button
          onClick={() => setActiveTab('chat')}
          className={`flex items-center gap-1 py-1 px-2.5 rounded ${activeTab === 'chat' ? 'text-indigo-700 font-semibold' : 'text-slate-600'}`}
        >
          <Bot className="w-3.5 h-3.5" /> Assistant
        </button>
        <button
          onClick={() => setActiveTab('knowledge-base')}
          className={`flex items-center gap-1 py-1 px-2.5 rounded ${activeTab === 'knowledge-base' ? 'text-indigo-700 font-semibold' : 'text-slate-600'}`}
        >
          <BookOpen className="w-3.5 h-3.5" /> Knowledge Base
        </button>
        <button
          onClick={() => setActiveTab('about')}
          className={`flex items-center gap-1 py-1 px-2.5 rounded ${activeTab === 'about' ? 'text-indigo-700 font-semibold' : 'text-slate-600'}`}
        >
          <Info className="w-3.5 h-3.5" /> About
        </button>
      </div>

      {/* Prototype Disclaimer Bar */}
      <div className="bg-amber-50 border-b border-amber-200/60 px-4 py-1 text-center text-[11px] text-amber-900 font-medium flex items-center justify-center gap-1.5">
        <ShieldAlert className="w-3.5 h-3.5 text-amber-600" />
        <span>Prototype / Sample Knowledge Base for First Review Engineering Demonstration</span>
      </div>
    </header>
  );
};
