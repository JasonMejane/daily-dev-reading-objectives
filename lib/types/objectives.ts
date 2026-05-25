export enum ObjectiveStatus {
  ACTIVE = 'active',
  COMPLETED = 'completed',
  ARCHIVED = 'archived',
  CANCELED = 'canceled',
}

export enum ChallengeLevel {
  EASY = 'easy',
  MEDIUM = 'medium',
  HARD = 'hard',
}

export type TimeFrame = 'week' | 'month' | 'year';

export interface Objective {
  id: string;
  userId: string;
  objective: string;
  tag: string;
  challengeLevel: ChallengeLevel;
  targetArticles: number;
  currentProgress: number;
  status: ObjectiveStatus;
  createdAt: Date;
  timeFrame?: TimeFrame;
  targetDate?: Date;
  completedAt?: Date;
  archivedAt?: Date;
}

export interface CreateObjectivesDto {
  objective: string;
  tag: string;
  challengeLevel: ChallengeLevel;
  timeFrame?: TimeFrame;
}

export interface ObjectivesResponseDto {
  id: string;
  objective: string;
  tag: string;
  challengeLevel: ChallengeLevel;
  targetArticles: number;
  currentProgress: number;
  status: ObjectiveStatus;
  createdAt: Date;
  timeFrame?: TimeFrame;
  targetDate?: Date;
  completedAt?: Date;
  archivedAt?: Date;
}

export class AppError extends Error {
  constructor(
    public statusCode: number,
    message: string,
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export class NotFoundException extends AppError {
  constructor(message: string) {
    super(404, message);
    this.name = 'NotFoundException';
  }
}

export class BadRequestException extends AppError {
  constructor(message: string) {
    super(400, message);
    this.name = 'BadRequestException';
  }
}
