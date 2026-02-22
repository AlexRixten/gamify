import type { ReactNode } from 'react';
import type { ViewStyle } from 'react-native';

export interface BounceProps {
  children: ReactNode;
  trigger: boolean;
  intensity?: number;
  duration?: number;
  style?: ViewStyle;
  onAnimationEnd?: () => void;
}
