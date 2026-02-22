import type { Meta, StoryObj } from '@storybook/react';
import { View, StyleSheet } from 'react-native';
import { LeaderboardItem } from './index';

const meta: Meta<typeof LeaderboardItem> = {
  title: 'Components/LeaderboardItem',
  component: LeaderboardItem,
  parameters: { layout: 'padded' },
  argTypes: {
    rank: { control: { type: 'range', min: 1, max: 100, step: 1 } },
    rankChange: {
      control: { type: 'select' },
      options: ['up', 'down', 'same', undefined],
    },
  },
};

export default meta;
type Story = StoryObj<typeof LeaderboardItem>;

const styles = StyleSheet.create({
  container: {
    maxWidth: 400,
  },
});

export const Default: Story = {
  args: {
    rank: 4,
    name: 'John Doe',
    avatarEmoji: '😎',
    score: 12500,
    level: 15,
  },
  decorators: [
    (Story) => (
      <View style={styles.container}>
        <Story />
      </View>
    ),
  ],
};

export const FirstPlace: Story = {
  args: {
    rank: 1,
    name: 'Champion',
    avatarEmoji: '🏆',
    score: 50000,
    level: 99,
  },
  decorators: [
    (Story) => (
      <View style={styles.container}>
        <Story />
      </View>
    ),
  ],
};

export const SecondPlace: Story = {
  args: {
    rank: 2,
    name: 'Silver Star',
    avatarEmoji: '🥈',
    score: 45000,
    level: 85,
  },
  decorators: [
    (Story) => (
      <View style={styles.container}>
        <Story />
      </View>
    ),
  ],
};

export const ThirdPlace: Story = {
  args: {
    rank: 3,
    name: 'Bronze Hero',
    avatarEmoji: '🥉',
    score: 40000,
    level: 72,
  },
  decorators: [
    (Story) => (
      <View style={styles.container}>
        <Story />
      </View>
    ),
  ],
};

export const CurrentUser: Story = {
  args: {
    rank: 5,
    name: 'You',
    avatarEmoji: '🎮',
    score: 10000,
    level: 12,
    isCurrentUser: true,
    rankChange: 'up',
  },
  decorators: [
    (Story) => (
      <View style={styles.container}>
        <Story />
      </View>
    ),
  ],
};

export const WithRankDown: Story = {
  args: {
    rank: 8,
    name: 'Falling Star',
    avatarEmoji: '⭐',
    score: 8500,
    level: 20,
    rankChange: 'down',
  },
  decorators: [
    (Story) => (
      <View style={styles.container}>
        <Story />
      </View>
    ),
  ],
};

export const Compact: Story = {
  args: {
    rank: 10,
    name: 'Compact User',
    avatarEmoji: '👤',
    score: 5000,
    compact: true,
  },
  decorators: [
    (Story) => (
      <View style={styles.container}>
        <Story />
      </View>
    ),
  ],
};

export const Leaderboard: Story = {
  render: () => (
    <View style={styles.container}>
      <LeaderboardItem
        rank={1}
        name="Top Player"
        avatarEmoji="🏆"
        score={99999}
        level={99}
      />
      <LeaderboardItem
        rank={2}
        name="Second Best"
        avatarEmoji="🥈"
        score={88888}
        level={85}
      />
      <LeaderboardItem
        rank={3}
        name="Third Place"
        avatarEmoji="🥉"
        score={77777}
        level={72}
      />
      <LeaderboardItem
        rank={4}
        name="Fourth"
        avatarEmoji="😎"
        score={66666}
        level={60}
      />
      <LeaderboardItem
        rank={5}
        name="You"
        avatarEmoji="🎮"
        score={55555}
        level={45}
        isCurrentUser
        rankChange="up"
      />
    </View>
  ),
};
