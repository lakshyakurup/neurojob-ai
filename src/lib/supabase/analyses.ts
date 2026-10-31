import { createServiceClient } from './server';
import type { AnalysisResponse, SavedAnalysis } from '../../types';

export async function saveAnalysis(
  userId: string,
  analysis: AnalysisResponse,
  resumeText?: string,
  jobDescription?: string
): Promise<SavedAnalysis | null> {
  try {
    const supabase = createServiceClient();

    const { data, error } = await supabase
      .from('analyses')
      .insert({
        user_id: userId,
        match_score: analysis.matchScore,
        summary: analysis.summary,
        missing_keywords: analysis.missingKeywords,
        strengths: analysis.strengths,
        weaknesses: analysis.weaknesses,
        tailored_cover_letter: analysis.tailoredCoverLetter,
        interview_questions: analysis.interviewQuestions,
        ats_tips: analysis.atsTips,
        recommended_improvements: analysis.recommendedImprovements,
        job_title: analysis.jobTitle ?? null,
        company: analysis.company ?? null,
        resume_text: resumeText?.slice(0, 20000) ?? null,
        job_description: jobDescription?.slice(0, 15000) ?? null,
      })
      .select()
      .single();

    if (error) {
      console.error('[saveAnalysis]', error);
      return null;
    }

    return mapRow(data);
  } catch (err) {
    console.error('[saveAnalysis] unexpected', err);
    return null;
  }
}

export async function listAnalyses(userId: string, limit = 20): Promise<SavedAnalysis[]> {
  try {
    const supabase = createServiceClient();

    const { data, error } = await supabase
      .from('analyses')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error || !data) {
      console.error('[listAnalyses]', error);
      return [];
    }

    return data.map(mapRow);
  } catch {
    return [];
  }
}

function mapRow(row: any): SavedAnalysis {
  return {
    id: row.id,
    userId: row.user_id,
    matchScore: row.match_score,
    summary: row.summary,
    missingKeywords: row.missing_keywords ?? [],
    strengths: row.strengths ?? [],
    weaknesses: row.weaknesses ?? [],
    tailoredCoverLetter: row.tailored_cover_letter ?? '',
    interviewQuestions: row.interview_questions ?? [],
    atsTips: row.ats_tips ?? [],
    recommendedImprovements: row.recommended_improvements ?? [],
    jobTitle: row.job_title,
    company: row.company,
    analyzedAt: row.created_at,
    createdAt: row.created_at,
  };
}
