import { NextResponse } from 'next/server';
import pdf from 'pdf-parse';

export const runtime = 'nodejs';
export const maxDuration = 30;

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!file || !(file instanceof File)) {
      return NextResponse.json({ error: 'No PDF file provided' }, { status: 400 });
    }

    if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
      return NextResponse.json({ error: 'Only PDF files are supported' }, { status: 400 });
    }

    // Limit to ~8 MB
    if (file.size > 8 * 1024 * 1024) {
      return NextResponse.json({ error: 'PDF must be under 8 MB' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const data = await pdf(buffer);

    const text = (data.text || '')
      .replace(/\r\n/g, '\n')
      .replace(/\n{3,}/g, '\n\n')
      .trim();

    if (text.length < 40) {
      return NextResponse.json(
        { error: 'Could not extract enough text from this PDF. Try a text-based (non-scanned) resume.' },
        { status: 422 }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        text,
        pages: data.numpages,
        info: data.info ?? null,
        charCount: text.length,
      },
    });
  } catch (error) {
    console.error('[/api/parse-resume]', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to parse PDF' },
      { status: 500 }
    );
  }
}
