export interface Level {
  id: string;
  name: string;
  xpRequired: number;
}

export type RequirementType = 'count' | 'streak' | 'total';

export interface AchievementRequirement {
  type: RequirementType;
  target: number;
  eventId: string;
}

export interface Achievement {
  id: string;
  name: string;
  description?: string;
  icon?: string;
  category: string;
  xpReward: number;
  requirement: AchievementRequirement;
  isSecret?: boolean;
}

export type BadgeRarity = 'common' | 'rare' | 'epic' | 'legendary';

export interface Badge {
  id: string;
  name: string;
  description?: string;
  icon?: string;
  rarity: BadgeRarity;
}

export interface Streak {
  id: string;
  name: string;
  currentCount: number;
  longestCount: number;
  isActive: boolean;
  lastActivityDate: string;
}

export interface GamificationConfig {
  levels: Level[];
  achievements: Achievement[];
  badges: Badge[];
  xpMultiplier?: number;
  persistenceKey?: string;
}

export interface UserProgress {
  xp: number;
  level: number;
  achievements: string[];
  badges: string[];
  streaks: Record<string, Streak>;
}

export type AchievementStatus = 'locked' | 'unlocked' | 'new';
