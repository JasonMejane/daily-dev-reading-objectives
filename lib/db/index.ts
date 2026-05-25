/**
 * Singleton in-memory database with constraints:
 * - Max 1000 users
 * - Max 10 objectives per user
 * - FIFO data management when limits exceeded
 */

import { Objective } from '@/lib/types/objectives';
import { LRUCache } from 'lru-cache';

const MAX_USERS = 1000;
const MAX_OBJECTIVES = 10;

interface DatabaseStore {
  objectives: LRUCache<string, Objective[], unknown>;
}

const globalForDb = global as typeof globalThis & {
  dbInstance?: InMemoryDatabase;
};

class InMemoryDatabase {
  private store: DatabaseStore;

  private constructor() {
    this.store = {
      objectives: new LRUCache({ max: MAX_USERS }),
    };
  }

  // Store on globalThis instead of the class — survives module re-evaluation
  static getInstance(): InMemoryDatabase {
    if (!globalForDb.dbInstance) {
      globalForDb.dbInstance = new InMemoryDatabase();
    }
    return globalForDb.dbInstance;
  }

  addObjective(objective: Objective): void {
    const { userId } = objective;
    const userObjectives = this.store.objectives.get(userId) ?? [];

    if (userObjectives.length >= MAX_OBJECTIVES) {
      userObjectives.shift();
    }

    userObjectives.push(objective);
    this.store.objectives.set(userId, userObjectives);
  }

  getObjective(userId: string, objectiveId: string): Objective | undefined {
    const userObjectives = this.store.objectives.get(userId);
    const result = userObjectives?.find((obj) => obj.id === objectiveId);
    return result;
  }

  getUserObjectives(userId: string): Objective[] {
    const userObjectives = this.store.objectives.get(userId) || [];
    return userObjectives;
  }

  updateObjective(userId: string, objective: Objective): void {
    const userObjectives = this.store.objectives.get(userId);

    if (userObjectives) {
      const index = userObjectives.findIndex((obj) => obj.id === objective.id);
      if (index > -1) {
        userObjectives[index] = objective;
      } else {
        if (userObjectives.length >= MAX_OBJECTIVES) {
          userObjectives.shift();
        }
        userObjectives.push(objective);
      }
      this.store.objectives.set(userId, userObjectives);
    } else {
      this.store.objectives.set(userId, [objective]);
    }
  }

  deleteObjective(userId: string, objectiveId: string): boolean {
    const userObjectives = this.store.objectives.get(userId);
    if (!userObjectives) return false;

    const index = userObjectives.findIndex((obj) => obj.id === objectiveId);
    if (index === -1) return false;

    userObjectives.splice(index, 1);
    this.store.objectives.set(userId, userObjectives);
    return true;
  }

  removeUser(userId: string): void {
    this.store.objectives.delete(userId);
  }

  getStats() {
    return { totalUsers: this.store.objectives.size };
  }

  clear(): void {
    this.store.objectives.clear();
  }
}

export const db = InMemoryDatabase.getInstance();
