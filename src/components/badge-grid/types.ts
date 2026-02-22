import type { ViewStyle } from 'react-native';
import type { Badge as BadgeType } from '../../core/types';

export interface BadgeGridProps {
  /** Array of badges to display */
  badges: BadgeType[];
  /** Array of unlocked badge IDs */
  unlockedIds?: string[];
  /** Number of columns */
  columns?: 2 | 3 | 4;
  /** Badge size */
  badgeSize?: 'sm' | 'md' | 'lg' | 'xl';
  /** Animate badges on mount */
  animated?: boolean;
  /** Animation stagger delay in ms */
  staggerDelay?: number;
  /** Show labels */
  showLabels?: boolean;
  /** Custom container style */
  style?: ViewStyle;
  /** Callback when badge is pressed */
  onBadgePress?: (badge: BadgeType) => void;
}
