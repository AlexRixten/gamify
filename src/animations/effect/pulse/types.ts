import type { ReactNode } from 'react';

export interface PulseProps {
  children: ReactNode;
  duration?: number;
  scale?: number;
  disabled?: boolean;
}
