// Components
export {
  ProgressBar,
  Badge,
  AchievementCard,
  PointsCounter,
  StreakCounter,
  LevelBadge,
  LeaderboardItem,
  Icon,
  FontAwesome,
} from './components';

export type {
  ProgressBarProps,
  BadgeProps,
  BadgeSize,
  BadgeVariant,
  AchievementCardProps,
  AchievementStatus,
  PointsCounterProps,
  StreakCounterProps,
  LevelBadgeProps,
  LevelBadgeVariant,
  LevelBadgeSize,
  LeaderboardItemProps,
  IconProps,
  FontAwesomeProps,
} from './components';

// Animations
export {
  Pulse,
  Shake,
  Bounce,
  Flash,
  Heartbeat,
  usePulse,
  useShake,
  useBounce,
  useFlash,
  useHeartbeat,
  FadeIn,
  SlideIn,
  ZoomIn,
  useFadeIn,
  useSlideIn,
  useZoomIn,
  Spin,
  useSpin,
  Flip,
  useFlip,
} from './animations';

// Core Types
export type {
  Level,
  RequirementType,
  AchievementRequirement,
  Achievement,
  BadgeRarity,
  Badge as BadgeData,
  Streak,
  GamificationConfig,
  UserProgress,
} from './core/types';

// Presets
export { fitnessPreset } from './presets/fitness';
export { learningPreset } from './presets/learning';
export { ecommercePreset } from './presets/ecommerce';
