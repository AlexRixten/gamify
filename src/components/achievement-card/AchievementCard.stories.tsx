import type { Meta, StoryObj } from '@storybook/react';
import { View, StyleSheet } from 'react-native';
import { AchievementCard } from './index';

const meta: Meta<typeof AchievementCard> = {
  title: 'Components/AchievementCard',
  component: AchievementCard,
  parameters: { layout: 'padded' },
  argTypes: {
    status: {
      control: { type: 'select' },
      options: ['locked', 'unlocked', 'new'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof AchievementCard>;

const styles = StyleSheet.create({
  container: {
    gap: 16,
    maxWidth: 350,
  },
});

export const Unlocked: Story = {
  args: {
    title: 'First Steps',
    description: 'Complete your first task and begin your journey',
    emoji: '🎯',
    status: 'unlocked',
    reward: 100,
  },
};

export const Locked: Story = {
  args: {
    title: 'Champion',
    description: 'Win 100 games to unlock this achievement',
    emoji: '🏆',
    status: 'locked',
    reward: 500,
  },
};

export const WithProgress: Story = {
  args: {
    title: 'Marathon Runner',
    description: 'Complete 50 daily challenges',
    emoji: '🏃',
    status: 'locked',
    reward: 250,
    progress: 32,
    progressMax: 50,
  },
};

export const NewAchievement: Story = {
  args: {
    title: 'Rising Star',
    description: 'You earned your first 1000 XP!',
    emoji: '⭐',
    status: 'new',
    reward: 200,
  },
};

export const Compact: Story = {
  args: {
    title: 'Quick Win',
    emoji: '⚡',
    status: 'unlocked',
    reward: 50,
    compact: true,
  },
};

export const AllStates: Story = {
  render: () => (
    <View style={styles.container}>
      <AchievementCard
        title="First Steps"
        description="Complete your first task"
        emoji="🎯"
        status="unlocked"
        reward={100}
      />
      <AchievementCard
        title="In Progress"
        description="Keep going!"
        emoji="🔥"
        status="locked"
        reward={250}
        progress={65}
        progressMax={100}
      />
      <AchievementCard
        title="Champion"
        description="Win 100 games"
        emoji="🏆"
        status="locked"
        reward={1000}
      />
    </View>
  ),
};

export const CustomBackground: Story = {
  args: {
    title: 'Special Edition',
    description: 'A rare achievement',
    emoji: '💎',
    status: 'unlocked',
    reward: 999,
    backgroundColor: '#fdf4ff',
  },
};
