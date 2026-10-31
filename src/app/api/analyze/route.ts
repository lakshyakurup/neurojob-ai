import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { analyzeResumeWithGemini } from '../../../lib/gemini';
import type { AnalysisRequest } from '../../../types';

export async function POST(request: Request) {
  try {
    const { userId } = await auth();

    // Optional: require auth in production
    // if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

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

    // In a full version we would persist to Supabase here using userId
    return NextResponse.json({
      success: true,
      data: result,
      meta: { userId: userId ?? null, model: 'gemini-2.5-flash' },
    });
  } catch (error) {
    console.error('[/api/analyze]', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Analysis failed' },
      { status: 500 }
    );
  }
}
