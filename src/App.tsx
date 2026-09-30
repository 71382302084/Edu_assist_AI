import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HomePage } from './pages/HomePage';
import { ChatPage } from './pages/ChatPage';
import { KnowledgeBasePage } from './pages/KnowledgeBasePage';
import { AboutPage } from './pages/AboutPage';
import { DocumentModal } from './components/DocumentModal';
import { UploadDocumentModal } from './components/UploadDocumentModal';
import { DemoModeModal } from './components/DemoModeModal';
import { SAMPLE_DOCUMENTS } from './data/sampleDocuments';
import { CampusDocument } from './types';
import { Bot, ShieldCheck, Heart, Sparkles, BookOpen, Layers } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'chat' | 'knowledge-base' | 'about'>('home');
  const [documents, setDocuments] = useState<CampusDocument[]>(SAMPLE_DOCUMENTS);
  const [selectedDoc, setSelectedDoc] = useState<CampusDocument | null>(null);
  const [highlightSection, setHighlightSection] = useState<string | null>(null);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [initialQuestion, setInitialQuestion] = useState<string>('');

  // Handle opening document modal from source card citation
  const handleOpenDocumentModal = (doc: CampusDocument, sectionTitle?: string) => {
    setSelectedDoc(doc);
    setHighlightSection(sectionTitle || null);
  };

  // Handle adding new document from upload modal
  const handleDocumentAdded = (newDoc: CampusDocument) => {
    setDocuments((prev) => [newDoc, ...prev]);
  };

  // Launch inquiry into chat
  const handleStartChatWithQuestion = (question?: string) => {
    if (question) {
      setInitialQuestion(question);
    }
    setActiveTab('chat');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans antialiased selection:bg-indigo-500 selection:text-white">
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenDemo={() => setIsDemoModalOpen(true)}
        documentCount={documents.length}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {activeTab === 'home' && (
          <HomePage
            onStartChat={handleStartChatWithQuestion}
            onViewKnowledgeBase={() => setActiveTab('knowledge-base')}
            documentCount={documents.length}
          />
        )}

        {activeTab === 'chat' && (
          <ChatPage
            documents={documents}
            onOpenDocumentModal={handleOpenDocumentModal}
            initialQuestion={initialQuestion}
            onClearInitialQuestion={() => setInitialQuestion('')}
          />
        )}

        {activeTab === 'knowledge-base' && (
          <KnowledgeBasePage
            documents={documents}
            onOpenUploadModal={() => setIsUploadModalOpen(true)}
            onOpenDocumentModal={(doc) => handleOpenDocumentModal(doc)}
          />
        )}

        {activeTab === 'about' && <AboutPage />}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-auto py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-left">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900">
                  EduAssist AI – Intelligent Campus Assistant
                </p>
                <p className="text-xs text-slate-500">
                  Retrieval-Augmented Generation (RAG) System grounded on official campus documents
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs text-slate-500">
              <button
                onClick={() => setIsDemoModalOpen(true)}
                className="text-indigo-600 font-semibold hover:underline cursor-pointer flex items-center gap-1"
              >
                <Sparkles className="w-3.5 h-3.5" /> Demo Scenarios
              </button>
              <span>•</span>
              <button
                onClick={() => setActiveTab('knowledge-base')}
                className="hover:text-slate-800 cursor-pointer"
              >
                Knowledge Base ({documents.length} Docs)
              </button>
              <span>•</span>
              <button
                onClick={() => setActiveTab('about')}
                className="hover:text-slate-800 cursor-pointer"
              >
                Project Details
              </button>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 gap-2">
            <span>Prototype Knowledge Base • Final Year Engineering Project First Review</span>
            <span>Zero Student Personal Data Retained • FAISS Vector Space Grounded</span>
          </div>
        </div>
      </footer>

      {/* Document View Modal */}
      <DocumentModal
        document={selectedDoc}
        highlightSectionTitle={highlightSection}
        onClose={() => {
          setSelectedDoc(null);
          setHighlightSection(null);
        }}
      />

      {/* Upload Document Modal */}
      <UploadDocumentModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onDocumentAdded={handleDocumentAdded}
      />

      {/* Demo Mode Modal */}
      <DemoModeModal
        isOpen={isDemoModalOpen}
        onClose={() => setIsDemoModalOpen(false)}
        onSelectQuestion={(q) => handleStartChatWithQuestion(q)}
      />
    </div>
  );
}
