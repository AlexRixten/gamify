import type { ViewStyle } from 'react-native';

export interface LeaderboardEntry {
  id: string;
  rank: number;
  name: string;
  avatarEmoji?: string;
  score: number;
  level?: number;
  isCurrentUser?: boolean;
  rankChange?: 'up' | 'down' | 'same';
}

export interface LeaderboardCardProps {
  /** Leaderboard entries */
  entries: LeaderboardEntry[];
  /** Current user ID to highlight */
  currentUserId?: string;
  /** Title for the card */
  title?: string;
  /** Show compact version */
  compact?: boolean;
  /** Max entries to show */
  maxEntries?: number;
  /** Custom container style */
  style?: ViewStyle;
  /** Callback when entry is pressed */
  onEntryPress?: (entry: LeaderboardEntry) => void;
}
