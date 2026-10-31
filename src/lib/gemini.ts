import { GoogleGenAI } from '@google/genai';
import type { AnalysisResponse } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

const SYSTEM_PROMPT = `You are NeuroJob AI, an elite career intelligence engine used by top candidates at FAANG and high-growth startups.
Your job is to produce brutally honest, high-signal analysis that helps candidates win roles.
Always respond with valid JSON only. No markdown, no code fences, no extra text.`;

export async function analyzeResumeWithGemini(
  resume: string,
  jd: string,
  jobTitle?: string,
  company?: string
): Promise<AnalysisResponse> {
  const prompt = `${SYSTEM_PROMPT}

Analyze this resume against the target job description.

RESUME:
${resume.slice(0, 12000)}

JOB DESCRIPTION:
${jd.slice(0, 8000)}

${jobTitle ? `TARGET ROLE: ${jobTitle}` : ''}
${company ? `COMPANY: ${company}` : ''}

Return a single JSON object with exactly these fields:
{
  "matchScore": number (0-100, be realistic and calibrated),
  "summary": string (2-3 sentences of strategic insight),
  "missingKeywords": string[] (highest-impact missing ATS keywords, max 8),
  "strengths": string[] (strongest matching signals, max 6),
  "weaknesses": string[] (honest gaps, max 5),
  "tailoredCoverLetter": string (ready-to-use, personalized, professional, 250-350 words),
  "interviewQuestions": [
    {
      "question": string,
      "type": "technical" | "behavioral" | "role-specific" | "system-design",
      "difficulty": "easy" | "medium" | "hard",
      "tip": string
    }
  ] (exactly 6 high-quality questions),
  "atsTips": string[] (3 concrete ATS optimization tips),
  "recommendedImprovements": string[] (3-5 specific, actionable resume improvements)
}`;

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: prompt,
    config: {
      temperature: 0.4,
      responseMimeType: 'application/json',
    },
  });

  const text = response.text || '{}';

  try {
    const parsed = JSON.parse(text) as AnalysisResponse;

    // Normalize + safeguard
    return {
      matchScore: Math.min(100, Math.max(0, Number(parsed.matchScore) || 0)),
      summary: parsed.summary || 'Analysis completed.',
      missingKeywords: Array.isArray(parsed.missingKeywords) ? parsed.missingKeywords.slice(0, 8) : [],
      strengths: Array.isArray(parsed.strengths) ? parsed.strengths.slice(0, 6) : [],
      weaknesses: Array.isArray(parsed.weaknesses) ? parsed.weaknesses.slice(0, 5) : [],
      tailoredCoverLetter: parsed.tailoredCoverLetter || '',
      interviewQuestions: Array.isArray(parsed.interviewQuestions)
        ? parsed.interviewQuestions.slice(0, 6)
        : [],
      atsTips: Array.isArray(parsed.atsTips) ? parsed.atsTips.slice(0, 4) : [],
      recommendedImprovements: Array.isArray(parsed.recommendedImprovements)
        ? parsed.recommendedImprovements.slice(0, 5)
        : [],
      jobTitle,
      company,
      analyzedAt: new Date().toISOString(),
    };
  } catch (err) {
    console.error('Failed to parse Gemini response', err, text);
    throw new Error('AI returned invalid structured response');
  }
}
