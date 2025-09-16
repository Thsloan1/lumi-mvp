import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { z } from 'zod';

const strategySchema = z.object({
  strategy: z.string().min(1),
  confidence: z.number().min(0).max(100),
  doability: z.number().min(0).max(100),
});

export async function POST(
  req: NextRequest,
  { params }: { params: { logId: string } }
) {
  const logId = params.logId;

  if (!logId) {
    return NextResponse.json({ error: 'Missing logId' }, { status: 400 });
  }

  const body = await req.json();
  const parsed = strategySchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const { strategy, confidence, doability } = parsed.data;

  try {
    const saved = await prisma.selectedStrategy.create({
      data: {
        logId,
        strategy,
        confidence,
        doability,
      },
    });

    return NextResponse.json({ success: true, data: saved }, { status: 200 });
  } catch (error) {
    console.error('Error saving strategy:', error);
    return NextResponse.json(
      { error: 'Failed to save strategy' },
      { status: 500 }
    );
  }
}
