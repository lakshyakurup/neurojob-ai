export interface AnalysisRequest {
  resumeText: string;
  jobDescription: string;
}

export interface AnalysisResponse {
  matchScore: number;
  missingKeywords: string[];
  strengths: string[];
  weaknesses: string[];
  tailoredCoverLetter: string;
  interviewQuestions: string[];
}
