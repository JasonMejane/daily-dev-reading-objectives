import { createObjective, getAllObjectives } from '@/lib/services/objectives';
import type {
  AppError,
  ChallengeLevel,
  CreateObjectivesDto,
  TimeFrame,
} from '@/lib/types/objectives';
import { rateLimit } from '@/lib/utils/rateLimit';
import { checkUserId, sanitizeString } from '@/lib/utils/sanitize';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string }> },
) {
  if (!rateLimit(request)) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  }

  try {
    const { userId } = await params;
    const objectives = getAllObjectives(checkUserId(userId));
    return NextResponse.json(objectives);
  } catch (error) {
    const err = error as AppError;
    return NextResponse.json(
      { message: err.message },
      { status: err.statusCode || 500 },
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string }> },
) {
  if (!rateLimit(request)) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  }

  try {
    const userId = checkUserId((await params).userId);
    const body = (await request.json()) as CreateObjectivesDto;
    const checkedTimeFrame = body.timeFrame
      ? sanitizeString(body.timeFrame)
      : undefined;

    if (
      checkedTimeFrame &&
      !['week', 'month', 'year'].includes(checkedTimeFrame)
    ) {
      return NextResponse.json(
        { error: 'Invalid time frame' },
        { status: 400 },
      );
    }

    const checkedObjective = sanitizeString(body.objective);
    if (checkedObjective.length < 1 || checkedObjective.length > 100) {
      return NextResponse.json(
        { error: 'Objective must be between 1 and 100 characters' },
        { status: 400 },
      );
    }

    const checkedTag = sanitizeString(body.tag);
    if (checkedTag.length < 1 || checkedTag.length > 32) {
      return NextResponse.json(
        { error: 'Tag must be between 1 and 32 characters' },
        { status: 400 },
      );
    }

    const checkedChallengeLevel = sanitizeString(
      body.challengeLevel,
    ) as ChallengeLevel;
    if (!['easy', 'medium', 'hard'].includes(checkedChallengeLevel)) {
      return NextResponse.json(
        { error: 'Invalid challenge level' },
        { status: 400 },
      );
    }

    const dto: CreateObjectivesDto = {
      objective: checkedObjective,
      tag: checkedTag,
      challengeLevel: checkedChallengeLevel,
      timeFrame: checkedTimeFrame as TimeFrame,
    };
    const objective = createObjective(userId, dto);
    return NextResponse.json(objective, { status: 201 });
  } catch (error) {
    const err = error as AppError;
    return NextResponse.json(
      { message: err.message },
      { status: err.statusCode || 500 },
    );
  }
}
