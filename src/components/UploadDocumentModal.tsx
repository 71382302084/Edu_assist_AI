import React, { useState } from 'react';
import {
  X,
  Upload,
  FileText,
  CheckCircle2,
  Loader2,
  Sparkles,
  ArrowRight,
  Database,
  Cpu,
  Layers
} from 'lucide-react';
import { CampusDocument, DocumentCategory } from '../types';

interface UploadDocumentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDocumentAdded: (newDoc: CampusDocument) => void;
}

export const UploadDocumentModal: React.FC<UploadDocumentModalProps> = ({
  isOpen,
  onClose,
  onDocumentAdded
}) => {
  const [title, setTitle] = useState('');
  const [code, setCode] = useState('');
  const [category, setCategory] = useState<DocumentCategory>('Academic');
  const [content, setContent] = useState('');
  const [fileName, setFileName] = useState('');

  // Indexing pipeline progress
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeStep, setActiveStep] = useState<number>(0);
  const [isCompleted, setIsCompleted] = useState(false);

  if (!isOpen) return null;

  const steps = [
    { label: 'Document uploaded successfully', detail: 'Received raw text buffer' },
    { label: 'Extracting text & metadata...', detail: 'Cleaning headers & footers' },
    { label: 'Creating 512-token chunks...', detail: 'Configured 50-token window overlap' },
    { label: 'Generating Sentence Transformer embeddings...', detail: '384-dimensional vector tensor' },
    { label: 'Updating FAISS index...', detail: 'Inserting vectors into HNSW index' },
    { label: 'Document indexed successfully', detail: 'Ready for RAG semantic retrieval' }
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      if (!title) {
        setTitle(file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' '));
      }
      if (!code) {
        setCode(`CAMPUS-DOC-${Math.floor(1000 + Math.random() * 9000)}`);
      }

      // Read text content
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target?.result as string;
        setContent(text || '');
      };
      reader.readAsText(file);
    }
  };

  const handleUseSampleText = () => {
    setTitle('Hostel Mess Committee & Food Quality Regulations 2025');
    setCode('HOSTEL-MESS-2025');
    setCategory('Student Policy');
    setContent(`Section 1: Mess Timings & Meal Schedules
Breakfast is served between 07:00 AM and 08:30 AM daily. Lunch is operational from 12:15 PM to 02:00 PM. Evening snacks with tea/coffee are provided from 05:00 PM to 06:00 PM. Dinner hours are 07:30 PM to 09:30 PM. Late entry into the dining hall past 09:45 PM is not permitted under hostel hygiene regulations.

Section 2: Student Mess Committee & Menu Revisions
A student-elected Mess Committee consisting of 8 student representatives meets on the 1st Saturday of every month with the Chief Warden to review food quality and revise the rotational four-week cycle menu. Special dietary provisions (such as porridge and boiled eggs) are available upon doctor prescription.

Section 3: Food Wastage Fine & Cleanliness
Wasting food is strictly discouraged. A spot disciplinary fine of ₹50 is levied for blatant food wastage monitored by student mess monitors. Carrying mess utensils, plates, or tumblers outside the mess hall into hostel rooms is strictly prohibited.`);
  };

  const handleStartIndexing = async () => {
    if (!title.trim() || !content.trim()) return;

    setIsProcessing(true);
    setActiveStep(1);

    // Simulate multi-step indexing pipeline
    for (let i = 1; i <= 5; i++) {
      await new Promise((r) => setTimeout(r, 700));
      setActiveStep(i);
    }

    // Split text into sections
    const rawParagraphs = content.split(/\n\s*\n/).filter((p) => p.trim().length > 15);
    const sections = rawParagraphs.map((p, idx) => {
      const firstLine = p.trim().split('\n')[0].replace(/[#*_-]/g, '').trim();
      const sectionTitle = firstLine.length > 5 && firstLine.length < 60 ? firstLine : `Section ${idx + 1}: Policy`;
      return {
        id: `sec-user-${Date.now()}-${idx}`,
        title: sectionTitle,
        content: p.trim()
      };
    });

    const newDoc: CampusDocument = {
      id: `doc-user-${Date.now()}`,
      code: code || `CAMPUS-DOC-${Math.floor(1000 + Math.random() * 9000)}`,
      title: title.trim(),
      category: category,
      lastUpdated: new Date().toISOString().split('T')[0],
      chunksCount: Math.max(1, sections.length * 3),
      status: 'Indexed',
      summary: content.slice(0, 150) + '...',
      sections: sections.length > 0 ? sections : [{
        id: `sec-user-${Date.now()}-1`,
        title: 'General Overview',
        content: content.trim()
      }],
      fileType: 'TXT',
      version: 'v1.0'
    };

    // Save to parent state
    onDocumentAdded(newDoc);
    setIsCompleted(true);
    setIsProcessing(false);
  };

  const handleResetAndClose = () => {
    setTitle('');
    setCode('');
    setContent('');
    setFileName('');
    setActiveStep(0);
    setIsProcessing(false);
    setIsCompleted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 flex flex-col max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center">
              <Upload className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">Add Campus Document</h3>
              <p className="text-xs text-slate-500">
                Index institutional policy into the local FAISS vector knowledge base
              </p>
            </div>
          </div>
          <button
            onClick={handleResetAndClose}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-5">
          {!isCompleted && !isProcessing ? (
            <>
              {/* File upload drag drop */}
              <div className="border-2 border-dashed border-slate-300 hover:border-indigo-500 rounded-xl p-6 text-center transition-colors bg-slate-50/50">
                <input
                  type="file"
                  id="doc-file-upload"
                  accept=".txt,.pdf,.md,.doc"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <label
                  htmlFor="doc-file-upload"
                  className="cursor-pointer flex flex-col items-center justify-center gap-2"
                >
                  <div className="w-12 h-12 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-indigo-600 hover:text-indigo-700">
                      Click to choose a PDF or TXT document
                    </span>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {fileName ? `Selected file: ${fileName}` : 'Institutional circulars, regulations, notices'}
                    </p>
                  </div>
                </label>
              </div>

              {/* Sample text quick filler */}
              <div className="flex items-center justify-between text-xs text-slate-500 bg-indigo-50/60 p-3 rounded-xl border border-indigo-100">
                <span className="flex items-center gap-1.5 font-medium text-indigo-900">
                  <Sparkles className="w-4 h-4 text-indigo-600" />
                  Want a quick demonstration document?
                </span>
                <button
                  type="button"
                  onClick={handleUseSampleText}
                  className="text-xs font-bold text-indigo-700 hover:text-indigo-800 underline cursor-pointer"
                >
                  Fill Sample "Hostel Mess Regulations"
                </button>
              </div>

              {/* Form fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Document Title *
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Student Hostel Mess Regulations 2025"
                    className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Document Code / Circular No.
                  </label>
                  <input
                    type="text"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="e.g. HOSTEL-MESS-2025"
                    className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as DocumentCategory)}
                  className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="Academic">Academic Regulations</option>
                  <option value="Examination">Examination Guidelines</option>
                  <option value="Student Policy">Student Policy</option>
                  <option value="Placement">Placement</option>
                  <option value="Administration">Administration & Faculty</option>
                  <option value="General">General Campus Information</option>
                  <option value="Timetable">Timetable & Academic Calendar</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Document Content / Text *
                </label>
                <textarea
                  rows={6}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Paste official policy provisions, sections, rules, or circular text here..."
                  className="w-full p-3.5 text-xs sm:text-sm border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-indigo-500 leading-relaxed font-mono"
                ></textarea>
                <p className="text-[11px] text-slate-500 mt-1">
                  Text will be preprocessed into semantic chunks and embedded for RAG retrieval.
                </p>
              </div>
            </>
          ) : isProcessing ? (
            /* Multi-step indexing pipeline simulation */
            <div className="py-6 space-y-6">
              <div className="text-center">
                <div className="inline-flex p-3 rounded-full bg-indigo-50 text-indigo-600 mb-3 animate-pulse">
                  <Cpu className="w-8 h-8 animate-spin" />
                </div>
                <h4 className="text-lg font-bold text-slate-900">Ingesting Campus Document</h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  Executing automated text-to-vector embedding pipeline
                </p>
              </div>

              <div className="space-y-3 max-w-md mx-auto">
                {steps.map((st, idx) => {
                  const isDone = activeStep > idx;
                  const isCurrent = activeStep === idx;
                  return (
                    <div
                      key={idx}
                      className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${
                        isDone
                          ? 'bg-emerald-50/70 border-emerald-200 text-emerald-900'
                          : isCurrent
                          ? 'bg-indigo-50 border-indigo-300 text-indigo-900 shadow-xs'
                          : 'bg-slate-50/40 border-slate-200/60 text-slate-400 opacity-60'
                      }`}
                    >
                      {isDone ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                      ) : isCurrent ? (
                        <Loader2 className="w-5 h-5 text-indigo-600 animate-spin shrink-0" />
                      ) : (
                        <div className="w-5 h-5 rounded-full border border-slate-300 text-[10px] flex items-center justify-center shrink-0">
                          {idx + 1}
                        </div>
                      )}
                      <div>
                        <p className="text-xs font-semibold">{st.label}</p>
                        <p className="text-[10px] text-slate-500">{st.detail}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            /* Completed state */
            <div className="py-8 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-xs">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-slate-900">✓ Document Indexed Successfully</h4>
                <p className="text-xs text-slate-600 mt-1 max-w-md mx-auto">
                  "{title}" has been partitioned into vector chunks and added to the active FAISS knowledge base.
                  Students can now query this information through EduAssist AI.
                </p>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 max-w-md mx-auto text-left text-xs space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-500">Document Code:</span>
                  <span className="font-mono font-semibold text-slate-800">{code}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Category:</span>
                  <span className="font-semibold text-indigo-700">{category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Vector Embeddings:</span>
                  <span className="text-emerald-700 font-semibold">Active in Session Memory</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <span className="text-xs text-slate-500">Prototype Knowledge Base Ingestion</span>
          <div className="flex items-center gap-2">
            {!isCompleted && !isProcessing ? (
              <>
                <button
                  type="button"
                  onClick={handleResetAndClose}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 rounded-lg cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={!title.trim() || !content.trim()}
                  onClick={handleStartIndexing}
                  className={`flex items-center gap-2 px-5 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                    title.trim() && content.trim()
                      ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs'
                      : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  <span>Start Indexing Pipeline</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </>
            ) : isCompleted ? (
              <button
                type="button"
                onClick={handleResetAndClose}
                className="px-6 py-2 text-xs font-bold bg-slate-900 text-white hover:bg-slate-800 rounded-lg cursor-pointer"
              >
                Done
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};
