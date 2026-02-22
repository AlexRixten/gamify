import type { ViewStyle } from 'react-native';

export type BadgeSize = 'sm' | 'md' | 'lg' | 'xl';
export type BadgeVariant = 'default' | 'gold' | 'silver' | 'bronze' | 'custom';

export interface BadgeProps {
  /** Icon or emoji to display */
  icon?: React.ReactNode;
  /** Emoji string (alternative to icon) */
  emoji?: string;
  /** Size variant */
  size?: BadgeSize;
  /** Color variant */
  variant?: BadgeVariant;
  /** Custom background color */
  backgroundColor?: string;
  /** Custom border color */
  borderColor?: string;
  /** Badge label/title */
  label?: string;
  /** Show as locked/unlocked */
  locked?: boolean;
  /** Use flip animation to reveal */
  flippable?: boolean;
  /** Flipped state (for flippable badges) */
  flipped?: boolean;
  /** Callback when flip ends */
  onFlipEnd?: () => void;
  /** Custom container style */
  style?: ViewStyle;
  /** Show glow effect */
  glow?: boolean;
}
