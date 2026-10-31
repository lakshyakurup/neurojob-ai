import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { listAnalyses } from '../../../lib/supabase/analyses';

export async function GET() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
      return NextResponse.json({ success: true, data: [], meta: { configured: false } });
    }

    const analyses = await listAnalyses(userId, 30);

    return NextResponse.json({
      success: true,
      data: analyses,
      meta: { configured: true, count: analyses.length },
    });
  } catch (error) {
    console.error('[/api/history]', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to load history' },
      { status: 500 }
    );
  }
}
