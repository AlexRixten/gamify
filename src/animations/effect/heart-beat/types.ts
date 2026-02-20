import type { ReactNode } from 'react';

export interface HeartbeatProps {
  children: ReactNode;
  duration?: number;
  intensity?: number;
  disabled?: boolean;
}
