import type { ViewStyle } from 'react-native';

export type LevelBadgeVariant = 'circle' | 'shield' | 'hexagon' | 'diamond';
export type LevelBadgeSize = 'sm' | 'md' | 'lg';

export interface LevelBadgeProps {
  /** Level number to display */
  level: number;
  /** Badge shape variant */
  variant?: LevelBadgeVariant;
  /** Size variant */
  size?: LevelBadgeSize;
  /** Custom background color */
  backgroundColor?: string;
  /** Custom text color */
  textColor?: string;
  /** Custom border color */
  borderColor?: string;
  /** Show glow effect */
  glow?: boolean;
  /** Label text (e.g., "LVL", "LV") */
  label?: string;
  /** Show label */
  showLabel?: boolean;
  /** Custom container style */
  style?: ViewStyle;
}
