import type { ViewStyle } from 'react-native';

export interface LeaderboardItemProps {
  /** Position/rank in leaderboard */
  rank: number;
  /** User name */
  name: string;
  /** User avatar (emoji, icon, or image) */
  avatar?: React.ReactNode;
  /** Emoji avatar (alternative) */
  avatarEmoji?: string;
  /** Score/points */
  score: number;
  /** Score label (e.g., "pts", "XP") */
  scoreLabel?: string;
  /** User level (optional) */
  level?: number;
  /** Highlight as current user */
  isCurrentUser?: boolean;
  /** Show rank change indicator */
  rankChange?: 'up' | 'down' | 'same';
  /** Compact variant */
  compact?: boolean;
  /** Custom container style */
  style?: ViewStyle;
  /** Callback when pressed */
  onPress?: () => void;
}
