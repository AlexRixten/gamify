import type { ReactNode } from 'react';
import type { ViewStyle } from 'react-native';

export interface ZoomInProps {
  children: ReactNode;
  visible: boolean;
  duration?: number;
  style?: ViewStyle;
  onAnimationEnd?: () => void;
}
