import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { analyzeResumeWithGemini } from '../../../lib/gemini';
import { saveAnalysis } from '../../../lib/supabase/analyses';
import type { AnalysisRequest } from '../../../types';

export async function POST(request: Request) {
  try {
    const { userId } = await auth();

    const body = (await request.json()) as AnalysisRequest;
    const { resumeText, jobDescription, jobTitle, company } = body;

    if (!resumeText?.trim() || !jobDescription?.trim()) {
      return NextResponse.json(
        { error: 'Both resume text and job description are required' },
        { status: 400 }
      );
    }

    if (resumeText.length < 80) {
      return NextResponse.json(
        { error: 'Resume text is too short to analyze meaningfully' },
        { status: 400 }
      );
    }

    const result = await analyzeResumeWithGemini(
      resumeText,
      jobDescription,
      jobTitle,
      company
    );

    // Persist when the user is signed in and Supabase is configured
    let savedId: string | null = null;
    if (userId && process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
      const saved = await saveAnalysis(userId, result, resumeText, jobDescription);
      savedId = saved?.id ?? null;
    }

    return NextResponse.json({
      success: true,
      data: result,
      meta: {
        userId: userId ?? null,
        savedId,
        model: 'gemini-2.5-flash',
        persisted: Boolean(savedId),
      },
    });
  } catch (error) {
    console.error('[/api/analyze]', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Analysis failed' },
      { status: 500 }
    );
  }
}
