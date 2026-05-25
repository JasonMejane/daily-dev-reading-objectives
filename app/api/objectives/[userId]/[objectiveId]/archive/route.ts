import { archiveObjective } from '@/lib/services/objectives';
import type { AppError } from '@/lib/types/objectives';
import { rateLimit } from '@/lib/utils/rateLimit';
import { checkUserId, sanitizeString } from '@/lib/utils/sanitize';
import { NextRequest, NextResponse } from 'next/server';

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string; objectiveId: string }> },
) {
  if (!rateLimit(request)) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  }

  try {
    const { userId, objectiveId } = await params;
    const objective = archiveObjective(
      checkUserId(userId),
      sanitizeString(objectiveId),
    );
    return NextResponse.json(objective);
  } catch (error) {
    const err = error as AppError;
    return NextResponse.json(
      { message: err.message },
      { status: err.statusCode || 500 },
    );
  }
}
