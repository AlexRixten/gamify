import type { ReactNode } from 'react';
import type { ViewStyle } from 'react-native';

export type SlideDirection = 'up' | 'down' | 'left' | 'right';

export interface SlideInProps {
  children: ReactNode;
  visible: boolean;
  direction?: SlideDirection;
  distance?: number;
  duration?: number;
  style?: ViewStyle;
  onAnimationEnd?: () => void;
}
