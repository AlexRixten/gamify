import type { ViewStyle, TextStyle } from 'react-native';

export interface PointsCounterProps {
  /** Current points value */
  value: number;
  /** Previous value (for animation) */
  previousValue?: number;
  /** Points to add (shown as +N animation) */
  pointsToAdd?: number;
  /** Duration of count animation in ms */
  duration?: number;
  /** Prefix symbol (e.g., "+", "★") */
  prefix?: string;
  /** Suffix text (e.g., "pts", "XP") */
  suffix?: string;
  /** Text size */
  size?: 'sm' | 'md' | 'lg' | 'xl';
  /** Text color */
  color?: string;
  /** Color when points increase */
  positiveColor?: string;
  /** Color when points decrease */
  negativeColor?: string;
  /** Show comma separators for large numbers */
  formatNumber?: boolean;
  /** Custom container style */
  style?: ViewStyle;
  /** Custom text style */
  textStyle?: TextStyle;
  /** Callback when animation completes */
  onAnimationEnd?: () => void;
}
