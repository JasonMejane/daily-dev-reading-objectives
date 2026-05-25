import { db } from '@/lib/db';
import {
  BadRequestException,
  ChallengeLevel,
  CreateObjectivesDto,
  NotFoundException,
  Objective,
  ObjectivesResponseDto,
  ObjectiveStatus,
} from '@/lib/types/objectives';
import { randomUUID } from 'crypto';

function calculateTargetArticles(
  challengeLevel: ChallengeLevel,
  timeFrame?: 'week' | 'month' | 'year',
): number {
  const targets = {
    [ChallengeLevel.EASY]: { week: 3, month: 10, year: 50 },
    [ChallengeLevel.MEDIUM]: { week: 6, month: 20, year: 100 },
    [ChallengeLevel.HARD]: { week: 9, month: 30, year: 150 },
  };

  if (!timeFrame) {
    return targets[ChallengeLevel.MEDIUM].week;
  }

  return targets[challengeLevel][timeFrame];
}

function mapToResponseDto(objective: Objective): ObjectivesResponseDto {
  return {
    id: objective.id,
    objective: objective.objective,
    tag: objective.tag,
    challengeLevel: objective.challengeLevel,
    targetArticles: objective.targetArticles,
    currentProgress: objective.currentProgress,
    status: objective.status,
    createdAt: objective.createdAt,
    timeFrame: objective.timeFrame,
    targetDate: objective.targetDate,
    completedAt: objective.completedAt,
    archivedAt: objective.archivedAt,
  };
}

export function createObjective(
  userId: string,
  createObjectiveDto: CreateObjectivesDto,
): ObjectivesResponseDto {
  if (
    !createObjectiveDto.challengeLevel ||
    !Object.values(ChallengeLevel).includes(createObjectiveDto.challengeLevel)
  ) {
    throw new BadRequestException(
      'Challenge level is required (EASY, MEDIUM, or HARD)',
    );
  }

  if (
    !createObjectiveDto.objective ||
    createObjectiveDto.objective.trim() === ''
  ) {
    throw new BadRequestException('Objective text is required');
  }

  if (!createObjectiveDto.tag || createObjectiveDto.tag.trim() === '') {
    throw new BadRequestException('Tag is required');
  }

  if (
    !createObjectiveDto.timeFrame &&
    createObjectiveDto.challengeLevel !== ChallengeLevel.MEDIUM
  ) {
    throw new BadRequestException(
      'When no time frame is selected, challenge level must be Medium',
    );
  }

  const existingObjectives = db.getUserObjectives(userId);
  const hasActiveObjective = existingObjectives.some(
    (obj) => obj.status === ObjectiveStatus.ACTIVE,
  );
  if (hasActiveObjective) {
    throw new BadRequestException(
      'User already has an active objective. Complete or archive it before creating a new one.',
    );
  }

  let targetDate: Date | undefined;
  if (createObjectiveDto.timeFrame) {
    targetDate = new Date();
    switch (createObjectiveDto.timeFrame) {
      case 'week':
        targetDate.setDate(targetDate.getDate() + 7);
        break;
      case 'month':
        targetDate.setMonth(targetDate.getMonth() + 1);
        break;
      case 'year':
        targetDate.setFullYear(targetDate.getFullYear() + 1);
        break;
    }
  }

  const targetArticles = calculateTargetArticles(
    createObjectiveDto.challengeLevel,
    createObjectiveDto.timeFrame,
  );

  const objective: Objective = {
    id: randomUUID(),
    userId,
    objective: createObjectiveDto.objective,
    tag: createObjectiveDto.tag.toLowerCase(),
    challengeLevel: createObjectiveDto.challengeLevel,
    targetArticles,
    currentProgress: 0,
    status: ObjectiveStatus.ACTIVE,
    createdAt: new Date(),
    timeFrame: createObjectiveDto.timeFrame,
    targetDate,
  };

  db.addObjective(objective);
  return mapToResponseDto(objective);
}

export function getObjectiveCard(userId: string) {
  const userObjective = getCurrentObjective(userId);
  return {
    title: userObjective.objective,
    target: userObjective.targetArticles,
    currentProgress: userObjective.currentProgress,
    label: userObjective.tag,
    targetDate: userObjective.targetDate,
    challengeLevel: userObjective.challengeLevel,
  };
}

export function getCurrentObjective(userId: string): ObjectivesResponseDto {
  const userObjectives = db.getUserObjectives(userId);

  const active = userObjectives.find(
    (obj) => obj.status === ObjectiveStatus.ACTIVE,
  );
  if (!active) {
    throw new NotFoundException('No active objective found for this user');
  }

  return mapToResponseDto(active);
}

export function progressCurrentObjective(
  userId: string,
): ObjectivesResponseDto {
  const userObjectives = db.getUserObjectives(userId);
  const activeObjective = userObjectives.find(
    (obj) => obj.status === ObjectiveStatus.ACTIVE,
  );

  if (!activeObjective) {
    throw new NotFoundException('No active objective found for this user');
  }

  if (activeObjective.userId !== userId) {
    throw new BadRequestException('Objective does not belong to this user');
  }

  const updated: Objective = {
    ...activeObjective,
    currentProgress: activeObjective.currentProgress + 1,
  };

  if (updated.currentProgress >= updated.targetArticles) {
    updated.status = ObjectiveStatus.COMPLETED;
    updated.completedAt = new Date();
  }

  db.updateObjective(userId, updated);
  return mapToResponseDto(updated);
}

export function getArchivedObjectives(userId: string): ObjectivesResponseDto[] {
  const userObjectives = db.getUserObjectives(userId);
  const archived = userObjectives.filter(
    (obj) => obj.status === ObjectiveStatus.ARCHIVED,
  );

  return archived.map(mapToResponseDto);
}

export function archiveObjective(
  userId: string,
  objectiveId: string,
): ObjectivesResponseDto {
  const objective = db.getObjective(userId, objectiveId);

  if (!objective) {
    throw new NotFoundException('Objective not found');
  }

  if (objective.userId !== userId) {
    throw new BadRequestException('Objective does not belong to this user');
  }

  if (objective.status !== ObjectiveStatus.COMPLETED) {
    throw new BadRequestException('Only completed objectives can be archived');
  }

  const updated: Objective = {
    ...objective,
    status: ObjectiveStatus.ARCHIVED,
    archivedAt: new Date(),
  };

  db.updateObjective(userId, updated);
  return mapToResponseDto(updated);
}

export function cancelObjective(
  userId: string,
  objectiveId: string,
): ObjectivesResponseDto {
  const objective = db.getObjective(userId, objectiveId);

  if (!objective) {
    throw new NotFoundException('Objective not found');
  }

  if (objective.userId !== userId) {
    throw new BadRequestException('Objective does not belong to this user');
  }

  if (objective.status !== ObjectiveStatus.COMPLETED) {
    throw new BadRequestException('Only completed objectives can be canceled');
  }

  const updated: Objective = {
    ...objective,
    status: ObjectiveStatus.CANCELED,
  };

  db.updateObjective(userId, updated);
  return mapToResponseDto(updated);
}

export function getAllObjectives(userId: string): ObjectivesResponseDto[] {
  const userObjectives = db.getUserObjectives(userId);

  const mapped = userObjectives
    .map(mapToResponseDto)
    .sort(
      (a, b) => (b.createdAt?.getTime() ?? 0) - (a.createdAt?.getTime() ?? 0),
    );

  return mapped;
}
