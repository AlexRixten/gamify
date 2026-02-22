import type { ReactNode } from 'react';
import type { ViewStyle } from 'react-native';

export interface FlashProps {
  children: ReactNode;
  trigger: boolean;
  duration?: number;
  style?: ViewStyle;
  onAnimationEnd?: () => void;
}
