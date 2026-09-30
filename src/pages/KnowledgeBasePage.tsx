import React, { useState } from 'react';
import {
  BookOpen,
  Plus,
  Search,
  Filter,
  FileText,
  Calendar,
  Layers,
  CheckCircle2,
  Eye,
  Database,
  Cpu,
  RefreshCw,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { CampusDocument, DocumentCategory } from '../types';

interface KnowledgeBasePageProps {
  documents: CampusDocument[];
  onOpenUploadModal: () => void;
  onOpenDocumentModal: (doc: CampusDocument) => void;
}

export const KnowledgeBasePage: React.FC<KnowledgeBasePageProps> = ({
  documents,
  onOpenUploadModal,
  onOpenDocumentModal
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = [
    'All',
    'Academic',
    'Examination',
    'Student Policy',
    'Placement',
    'Administration',
    'Timetable',
    'General'
  ];

  // Filter documents by search and category
  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch =
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.summary.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === 'All' || doc.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const totalChunks = documents.reduce((acc, d) => acc + d.chunksCount, 0);

  return (
    <div className="space-y-8 pb-16">
      {/* Top Banner / Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-md">
              Vector Repository
            </span>
            <span className="text-xs text-slate-500 font-medium">Prototype / Sample Knowledge Base</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-2">
            Campus Knowledge Base
          </h1>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
            All institutional policies, examination timetables, circulars, and handbooks indexed as high-dimensional vector embeddings for RAG retrieval.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenUploadModal}
            className="flex items-center gap-2 px-5 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-sm shadow-sm transition-all hover:scale-105 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Document</span>
          </button>
        </div>
      </div>

      {/* Status & Architecture Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-white rounded-2xl p-4.5 border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span>Knowledge Base Status</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          </div>
          <p className="text-xl font-bold text-emerald-700 flex items-center gap-1.5">
            ● Connected
          </p>
          <p className="text-[11px] text-slate-400 mt-1">Live vector search ready</p>
        </div>

        <div className="bg-white rounded-2xl p-4.5 border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span>Indexed Documents</span>
            <BookOpen className="w-4 h-4 text-indigo-600" />
          </div>
          <p className="text-xl font-bold text-slate-900">{documents.length}</p>
          <p className="text-[11px] text-slate-400 mt-1">Verified campus policies</p>
        </div>

        <div className="bg-white rounded-2xl p-4.5 border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span>Total Vector Chunks</span>
            <Layers className="w-4 h-4 text-purple-600" />
          </div>
          <p className="text-xl font-bold text-slate-900">{totalChunks}</p>
          <p className="text-[11px] text-slate-400 mt-1">512 tokens with overlap</p>
        </div>

        <div className="bg-white rounded-2xl p-4.5 border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span>Vector Index</span>
            <Database className="w-4 h-4 text-blue-600" />
          </div>
          <p className="text-xl font-bold text-slate-900">FAISS</p>
          <p className="text-[11px] text-slate-400 mt-1">Cosine similarity index</p>
        </div>

        <div className="bg-white rounded-2xl p-4.5 border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span>Embedding Model</span>
            <Cpu className="w-4 h-4 text-violet-600" />
          </div>
          <p className="text-xl font-bold text-slate-900">Sentence Transformers</p>
          <p className="text-[11px] text-slate-400 mt-1">all-MiniLM-L6-v2</p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="relative w-full sm:w-96">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search documents by title, code or keyword..."
              className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-indigo-500 focus:bg-white"
            />
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-500 self-end sm:self-auto">
            <span>Showing:</span>
            <span className="font-bold text-slate-800">{filteredDocuments.length}</span>
            <span>of {documents.length} documents</span>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white shadow-2xs font-semibold'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Main Documents Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-50/80 border-b border-slate-200 text-slate-500 uppercase text-[11px] font-bold tracking-wider">
              <tr>
                <th className="py-3.5 px-6">Document</th>
                <th className="py-3.5 px-6">Category</th>
                <th className="py-3.5 px-6">Status</th>
                <th className="py-3.5 px-6 text-center">Chunks</th>
                <th className="py-3.5 px-6">Last Updated</th>
                <th className="py-3.5 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {filteredDocuments.map((doc) => (
                <tr
                  key={doc.id}
                  className="hover:bg-indigo-50/40 transition-colors group cursor-pointer"
                  onClick={() => onOpenDocumentModal(doc)}
                >
                  <td className="py-4 px-6">
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 mt-0.5">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                            {doc.title}
                          </p>
                          <span className="text-[10px] font-mono px-1.5 py-0.5 bg-slate-100 text-slate-600 rounded">
                            {doc.code}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 line-clamp-1 mt-0.5 font-normal">
                          {doc.summary}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="py-4 px-6 whitespace-nowrap">
                    <span className="text-xs font-semibold px-2.5 py-1 bg-slate-100 text-slate-700 rounded-md border border-slate-200/80">
                      {doc.category}
                    </span>
                  </td>

                  <td className="py-4 px-6 whitespace-nowrap">
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 rounded-full">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      {doc.status}
                    </span>
                  </td>

                  <td className="py-4 px-6 text-center whitespace-nowrap">
                    <span className="font-mono font-bold text-slate-800 bg-slate-100 px-2.5 py-1 rounded">
                      {doc.chunksCount}
                    </span>
                  </td>

                  <td className="py-4 px-6 text-slate-500 text-xs whitespace-nowrap">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <span>{doc.lastUpdated}</span>
                    </div>
                  </td>

                  <td className="py-4 px-6 text-right whitespace-nowrap">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenDocumentModal(doc);
                      }}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 hover:bg-indigo-600 hover:text-white text-indigo-700 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>View</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredDocuments.length === 0 && (
            <div className="p-12 text-center text-slate-500">
              <BookOpen className="w-8 h-8 text-slate-300 mx-auto mb-2" />
              <p className="font-semibold text-sm">No documents found matching "{searchQuery}"</p>
              <p className="text-xs mt-1">Try another keyword or select "All" categories</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
