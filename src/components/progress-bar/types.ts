import type { ViewStyle } from 'react-native';

export interface ProgressBarProps {
  /** Current progress value (0 to max) */
  value: number;
  /** Maximum value (default: 100) */
  max?: number;
  /** Height of the progress bar */
  height?: number;
  /** Border radius */
  borderRadius?: number;
  /** Background color of the track */
  trackColor?: string;
  /** Color of the progress fill */
  progressColor?: string;
  /** Gradient colors for progress (overrides progressColor) */
  gradientColors?: string[];
  /** Show percentage text */
  showPercentage?: boolean;
  /** Custom text style */
  textStyle?: ViewStyle;
  /** Animation duration in ms */
  animated?: boolean;
  /** Animation duration in ms */
  duration?: number;
  /** Custom container style */
  style?: ViewStyle;
  /** Label text (e.g., "Level 5") */
  label?: string;
  /** Show value as fraction (e.g., "75/100") */
  showValue?: boolean;
}
