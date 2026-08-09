import { NextResponse } from 'next/server';
import { analyzeResumeWithGemini } from '@/lib/gemini';

export async function POST(request: Request) {
  try {
    const { resumeText, jobDescription } = await request.json();
    
    if (!resumeText || !jobDescription) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const result = await analyzeResumeWithGemini(resumeText, jobDescription);
    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    return NextResponse.json({ error: 'Analysis failed' }, { status: 500 });
  }
}
