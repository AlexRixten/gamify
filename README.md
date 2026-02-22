# React Native Gamify UI

A beautiful gamification UI component library for React Native with animations, achievements, badges, streaks, leaderboards, and more.

## Features

- **Components**: Achievement Cards, Badges, Progress Bars, Points Counter, Streak Counter, Level Badge, Leaderboard Items
- **Animations**: Pulse, Shake, Bounce, Flash, Heartbeat, FadeIn, SlideIn, ZoomIn, Spin, Flip
- **Presets**: Pre-configured themes for Fitness, Learning, and E-commerce apps
- **TypeScript**: Full TypeScript support with exported types

## Installation

```sh
npm install react-native-gamify-ui
```

or

```sh
yarn add react-native-gamify-ui
```

### Peer Dependencies

Make sure you have these installed:

```sh
npm install react-native-reanimated react-native-vector-icons
```

## Usage

### Components

```tsx
import {
  AchievementCard,
  Badge,
  ProgressBar,
  PointsCounter,
  StreakCounter,
  LevelBadge,
  LeaderboardItem,
} from 'react-native-gamify-ui';

// Achievement Card
<AchievementCard
  title="First Steps"
  description="Complete your first task"
  icon="trophy"
  status="unlocked"
  progress={100}
/>

// Badge
<Badge
  name="Champion"
  icon="medal"
  variant="gold"
  size="medium"
/>

// Progress Bar
<ProgressBar
  progress={75}
  height={8}
  color="#4CAF50"
  animated
/>

// Points Counter
<PointsCounter
  points={1500}
  animated
/>

// Streak Counter
<StreakCounter
  currentStreak={7}
  longestStreak={14}
/>

// Level Badge
<LevelBadge
  level={25}
  variant="gold"
  size="large"
/>

// Leaderboard Item
<LeaderboardItem
  rank={1}
  name="Player One"
  score={10000}
  avatar="https://..."
/>
```

### Animations

```tsx
import {
  Pulse,
  Shake,
  Bounce,
  FadeIn,
  ZoomIn,
  Spin,
  usePulse,
  useShake,
} from 'react-native-gamify-ui';

// As wrapper components
<Pulse duration={500}>
  <View><Text>Pulsing content</Text></View>
</Pulse>

<FadeIn delay={200}>
  <View><Text>Fading in</Text></View>
</FadeIn>

// As hooks
const { style, start } = usePulse();

<View style={style}>
  <Text onPress={start}>Tap to pulse</Text>
</View>
```

### Presets

```tsx
import { fitnessPreset, learningPreset, ecommercePreset } from 'react-native-gamify-ui';

// Use preset configurations
const config = fitnessPreset;
```

## Components Reference

| Component | Description |
|-----------|-------------|
| `AchievementCard` | Display achievement with progress and status |
| `Badge` | Show earned badges with variants |
| `ProgressBar` | Animated progress indicator |
| `PointsCounter` | Display points with animation |
| `StreakCounter` | Show current and longest streak |
| `LevelBadge` | Display user level |
| `LeaderboardItem` | Leaderboard entry component |
| `Icon` / `FontAwesome` | Icon components |

## Animations Reference

| Animation | Type | Description |
|-----------|------|-------------|
| `Pulse` | Effect | Scaling pulse effect |
| `Shake` | Effect | Horizontal shake |
| `Bounce` | Effect | Vertical bounce |
| `Flash` | Effect | Opacity flash |
| `Heartbeat` | Effect | Heartbeat rhythm |
| `FadeIn` | Entrance | Fade in animation |
| `SlideIn` | Entrance | Slide from direction |
| `ZoomIn` | Entrance | Scale in animation |
| `Spin` | Loading | Continuous rotation |
| `Flip` | Transform | 3D flip effect |

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
