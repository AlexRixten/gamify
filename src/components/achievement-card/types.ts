import type { ViewStyle } from 'react-native';

export type AchievementStatus = 'locked' | 'unlocked' | 'new';

export interface AchievementCardProps {
  /** Title of the achievement */
  title: string;
  /** Description of the achievement */
  description?: string;
  /** Icon or emoji to display */
  icon?: React.ReactNode;
  /** Emoji (alternative to icon) */
  emoji?: string;
  /** Status of the achievement */
  status?: AchievementStatus;
  /** XP/Points reward */
  reward?: number;
  /** Reward label (e.g., "XP", "coins") */
  rewardLabel?: string;
  /** Progress value (for locked achievements with progress) */
  progress?: number;
  /** Max progress value */
  progressMax?: number;
  /** Show as compact card */
  compact?: boolean;
  /** Custom background color */
  backgroundColor?: string;
  /** Animation when unlocked */
  animate?: boolean;
  /** Custom container style */
  style?: ViewStyle;
  /** Callback when pressed */
  onPress?: () => void;
}
