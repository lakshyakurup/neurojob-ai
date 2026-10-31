import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { rewriteResumeWithGemini } from '../../../lib/gemini';
import type { RewriteRequest } from '../../../types';

export async function POST(request: Request) {
  try {
    const { userId } = await auth();

    const body = (await request.json()) as RewriteRequest;
    const {
      resumeText,
      jobDescription,
      missingKeywords = [],
      recommendedImprovements = [],
      jobTitle,
      company,
    } = body;

    if (!resumeText?.trim() || !jobDescription?.trim()) {
      return NextResponse.json(
        { error: 'Both resume text and job description are required' },
        { status: 400 }
      );
    }

    const result = await rewriteResumeWithGemini(
      resumeText,
      jobDescription,
      missingKeywords,
      recommendedImprovements,
      jobTitle,
      company
    );

    return NextResponse.json({
      success: true,
      data: result,
      meta: { userId: userId ?? null, model: 'gemini-2.5-flash' },
    });
  } catch (error) {
    console.error('[/api/rewrite-resume]', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Rewrite failed' },
      { status: 500 }
    );
  }
}
