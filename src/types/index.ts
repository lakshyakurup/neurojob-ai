export interface AnalysisRequest {
  resumeText: string;
  jobDescription: string;
  jobTitle?: string;
  company?: string;
}

export interface InterviewQuestion {
  question: string;
  type: 'technical' | 'behavioral' | 'role-specific' | 'system-design';
  difficulty: 'easy' | 'medium' | 'hard';
  tip: string;
}

export interface AnalysisResponse {
  matchScore: number;
  summary: string;
  missingKeywords: string[];
  strengths: string[];
  weaknesses: string[];
  tailoredCoverLetter: string;
  interviewQuestions: InterviewQuestion[];
  atsTips: string[];
  recommendedImprovements: string[];
  jobTitle?: string;
  company?: string;
  analyzedAt?: string;
}

export interface SavedAnalysis extends AnalysisResponse {
  id: string;
  userId: string;
  createdAt: string;
}

export interface Application {
  id: string;
  userId: string;
  company: string;
  role: string;
  status: 'draft' | 'applied' | 'interview' | 'offer' | 'rejected';
  matchScore?: number;
  analysisId?: string;
  appliedAt?: string;
  notes?: string;
}
