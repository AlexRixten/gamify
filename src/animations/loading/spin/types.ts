import type { ReactNode } from 'react';

export interface SpinProps {
  children: ReactNode;
  duration?: number;
  disabled?: boolean;
}
