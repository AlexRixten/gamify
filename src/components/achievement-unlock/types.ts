import type { ViewStyle } from 'react-native';

export interface AchievementUnlockProps {
  /** Achievement title */
  title: string;
  /** Achievement description */
  description?: string;
  /** Emoji or icon */
  emoji?: string;
  /** XP reward */
  reward?: number;
  /** Reward label */
  rewardLabel?: string;
  /** Show the unlock animation */
  visible: boolean;
  /** Animation duration in ms */
  duration?: number;
  /** Callback when animation completes */
  onAnimationEnd?: () => void;
  /** Custom container style */
  style?: ViewStyle;
}
