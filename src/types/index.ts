export type DocumentCategory =
  | 'Academic'
  | 'Examination'
  | 'Student Policy'
  | 'Placement'
  | 'Administration'
  | 'General'
  | 'Timetable';

export interface DocumentSection {
  id: string;
  title: string;
  content: string;
}

export interface CampusDocument {
  id: string;
  title: string;
  code: string;
  category: DocumentCategory;
  lastUpdated: string;
  chunksCount: number;
  status: 'Indexed' | 'Processing' | 'Failed';
  summary: string;
  sections: DocumentSection[];
  rawText?: string;
  fileType?: 'PDF' | 'DOCX' | 'TXT';
  version?: string;
}

export interface RetrievedChunk {
  docId: string;
  docTitle: string;
  sectionTitle: string;
  content: string;
  score: number; // 0 to 1
  relevancePercent: number; // e.g. 92
  category?: DocumentCategory;
}

export interface RAGStepState {
  id: string;
  name: string;
  detail: string;
  status: 'idle' | 'running' | 'completed' | 'skipped';
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  retrievalStatus?: 'searching' | 'retrieved' | 'generating' | 'completed' | 'not_found' | 'error';
  sources?: RetrievedChunk[];
  isGrounded?: boolean;
  pipelineLatencyMs?: number;
  ragSteps?: RAGStepState[];
}

export interface ConversationHistoryItem {
  id: string;
  title: string;
  timestamp: string;
  messageCount: number;
}

export interface KnowledgeBaseStats {
  documentsIndexed: number;
  totalChunks: number;
  vectorIndex: string;
  embeddingModel: string;
  lastUpdated: string;
  status: 'Connected' | 'Indexing' | 'Offline';
}
