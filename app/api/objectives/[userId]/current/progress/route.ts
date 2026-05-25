import { progressCurrentObjective } from '@/lib/services/objectives';
import type { AppError } from '@/lib/types/objectives';
import { rateLimit } from '@/lib/utils/rateLimit';
import { checkUserId } from '@/lib/utils/sanitize';
import { NextRequest, NextResponse } from 'next/server';

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string }> },
) {
  if (!rateLimit(request)) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  }

  try {
    const { userId } = await params;
    const objective = progressCurrentObjective(checkUserId(userId));
    return NextResponse.json(objective);
  } catch (error) {
    const err = error as AppError;
    return NextResponse.json(
      { message: err.message },
      { status: err.statusCode || 500 },
    );
  }
}
