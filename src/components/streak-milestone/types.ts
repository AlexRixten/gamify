import type { ViewStyle } from 'react-native';

export interface StreakMilestoneProps {
  /** Current streak count */
  count: number;
  /** Streak label (e.g., "day streak") */
  label?: string;
  /** Milestone targets (e.g., [3, 7, 14, 30]) */
  milestones?: number[];
  /** Color theme */
  color?: string;
  /** Show celebration animation when hitting milestone */
  celebrateMilestone?: boolean;
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Custom container style */
  style?: ViewStyle;
}
