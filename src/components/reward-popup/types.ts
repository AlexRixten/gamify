import type { ViewStyle } from 'react-native';

export interface RewardPopupProps {
  /** Show the popup */
  visible: boolean;
  /** Reward title */
  title: string;
  /** Reward description */
  description?: string;
  /** XP/Points amount */
  amount: number;
  /** Label for the reward (e.g., "XP", "coins") */
  label?: string;
  /** Icon or emoji */
  icon?: string;
  /** Color theme */
  color?: string;
  /** Auto dismiss after duration (ms) */
  autoDismiss?: number;
  /** Callback when dismissed */
  onDismiss?: () => void;
  /** Custom container style */
  style?: ViewStyle;
}
