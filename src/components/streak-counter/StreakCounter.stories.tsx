import type { Meta, StoryObj } from '@storybook/react';
import { View, StyleSheet } from 'react-native';
import { StreakCounter } from './index';

const meta: Meta<typeof StreakCounter> = {
  title: 'Components/StreakCounter',
  component: StreakCounter,
  parameters: { layout: 'centered' },
  argTypes: {
    count: { control: { type: 'range', min: 0, max: 365, step: 1 } },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof StreakCounter>;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: 32,
    alignItems: 'center',
  },
});

export const Default: Story = {
  args: {
    count: 5,
  },
};

export const SmallStreak: Story = {
  args: {
    count: 2,
    label: 'days',
  },
};

export const WeekStreak: Story = {
  args: {
    count: 7,
    glow: true,
  },
};

export const MonthStreak: Story = {
  args: {
    count: 30,
    glow: true,
    label: 'days strong!',
  },
};

export const BigStreak: Story = {
  args: {
    count: 100,
    size: 'lg',
    glow: true,
  },
};

export const Sizes: Story = {
  render: () => (
    <View style={styles.row}>
      <StreakCounter count={5} size="sm" />
      <StreakCounter count={10} size="md" />
      <StreakCounter count={50} size="lg" glow />
    </View>
  ),
};

export const WithoutIcon: Story = {
  args: {
    count: 14,
    showIcon: false,
    glow: true,
  },
};

export const CustomColor: Story = {
  args: {
    count: 21,
    color: '#ec4899',
    glow: true,
  },
};
