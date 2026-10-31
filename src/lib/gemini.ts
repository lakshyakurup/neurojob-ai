import { GoogleGenAI } from '@google/genai';
import type { AnalysisResponse, RewriteResponse } from '../types';

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

export async function rewriteResumeWithGemini(
  resume: string,
  jd: string,
  missingKeywords: string[] = [],
  recommendedImprovements: string[] = [],
  jobTitle?: string,
  company?: string
): Promise<RewriteResponse> {
  const prompt = `${SYSTEM_PROMPT}

You are now in RESUME REWRITE mode. Rewrite the candidate's resume to maximize match for the target role while remaining truthful.

RULES:
- Never invent experience, companies, or metrics that are not implied by the original.
- Naturally weave in missing high-impact keywords where they honestly fit.
- Strengthen quantifiable impact and clarity.
- Keep a clean, modern professional tone (US English).
- Output length should be similar to the original (or slightly tighter).
- Prefer action verbs and concrete outcomes.

ORIGINAL RESUME:
${resume.slice(0, 12000)}

TARGET JOB DESCRIPTION:
${jd.slice(0, 8000)}

${jobTitle ? `TARGET ROLE: ${jobTitle}` : ''}
${company ? `COMPANY: ${company}` : ''}

MISSING KEYWORDS TO PRIORITIZE (if truthful):
${missingKeywords.join(', ') || 'none specified'}

RECOMMENDED IMPROVEMENTS:
${recommendedImprovements.map((t, i) => `${i + 1}. ${t}`).join('\n') || 'none specified'}

Return a single JSON object:
{
  "rewrittenResume": string (the full improved resume text),
  "changesSummary": string[] (3-6 bullet points of what you improved),
  "keywordsAdded": string[] (keywords you successfully incorporated)
}`;

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: prompt,
    config: {
      temperature: 0.45,
      responseMimeType: 'application/json',
    },
  });

  const text = response.text || '{}';

  try {
    const parsed = JSON.parse(text) as RewriteResponse;
    return {
      rewrittenResume: parsed.rewrittenResume || resume,
      changesSummary: Array.isArray(parsed.changesSummary) ? parsed.changesSummary.slice(0, 8) : [],
      keywordsAdded: Array.isArray(parsed.keywordsAdded) ? parsed.keywordsAdded.slice(0, 12) : [],
    };
  } catch (err) {
    console.error('Failed to parse rewrite response', err, text);
    throw new Error('AI returned invalid rewrite response');
  }
}
