import type { ReactNode } from 'react';
import type { ViewStyle } from 'react-native';

export type FlipDirection = 'horizontal' | 'vertical';

export interface FlipProps {
  front: ReactNode;
  back: ReactNode;
  flipped: boolean;
  duration?: number;
  direction?: FlipDirection;
  style?: ViewStyle;
  onFlipEnd?: () => void;
}
