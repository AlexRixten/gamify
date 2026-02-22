import type { ViewStyle } from 'react-native';

export interface UserLevelCardProps {
  /** Current level number */
  level: number;
  /** Level name/title */
  levelName?: string;
  /** Current XP points */
  xp: number;
  /** XP required for next level */
  xpToNextLevel: number;
  /** Progress percentage (0-100), calculated automatically if not provided */
  progress?: number;
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Color theme */
  color?: string;
  /** Show glow effect */
  glow?: boolean;
  /** Custom container style */
  style?: ViewStyle;
  /** Callback when pressed */
  onPress?: () => void;
}
