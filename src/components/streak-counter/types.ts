import type { ViewStyle } from 'react-native';

export interface StreakCounterProps {
  /** Current streak count */
  count: number;
  /** Label text (default: "day streak") */
  label?: string;
  /** Show fire icon */
  showIcon?: boolean;
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Animate on mount */
  animated?: boolean;
  /** Custom color */
  color?: string;
  /** Show glow effect for high streaks */
  glow?: boolean;
  /** Custom container style */
  style?: ViewStyle;
}
