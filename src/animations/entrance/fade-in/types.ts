import type { ReactNode } from 'react';
import type { ViewStyle } from 'react-native';

export interface FadeInProps {
  children: ReactNode;
  visible: boolean;
  duration?: number;
  delay?: number;
  style?: ViewStyle;
  onAnimationEnd?: () => void;
}
