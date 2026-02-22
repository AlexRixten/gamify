import type { Meta, StoryObj } from '@storybook/react';
import { View, StyleSheet } from 'react-native';
import { LevelBadge } from './index';

const meta: Meta<typeof LevelBadge> = {
  title: 'Components/LevelBadge',
  component: LevelBadge,
  parameters: { layout: 'centered' },
  argTypes: {
    level: { control: { type: 'range', min: 1, max: 99, step: 1 } },
    variant: {
      control: { type: 'select' },
      options: ['circle', 'shield', 'hexagon', 'diamond'],
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof LevelBadge>;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: 16,
    alignItems: 'center',
  },
  grid: {
    flexDirection: 'row',
    gap: 24,
    alignItems: 'center',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
});

export const Default: Story = {
  args: {
    level: 5,
  },
};

export const Circle: Story = {
  args: {
    level: 10,
    variant: 'circle',
    glow: true,
  },
};

export const Shield: Story = {
  args: {
    level: 25,
    variant: 'shield',
    backgroundColor: '#059669',
    borderColor: '#047857',
  },
};

export const Hexagon: Story = {
  args: {
    level: 50,
    variant: 'hexagon',
    backgroundColor: '#7c3aed',
    borderColor: '#6d28d9',
    glow: true,
  },
};

export const Diamond: Story = {
  args: {
    level: 99,
    variant: 'diamond',
    backgroundColor: '#dc2626',
    borderColor: '#b91c1c',
    glow: true,
  },
};

export const Sizes: Story = {
  render: () => (
    <View style={styles.row}>
      <LevelBadge level={5} size="sm" />
      <LevelBadge level={10} size="md" />
      <LevelBadge level={25} size="lg" glow />
    </View>
  ),
};

export const Variants: Story = {
  render: () => (
    <View style={styles.grid}>
      <LevelBadge level={5} variant="circle" />
      <LevelBadge level={10} variant="shield" />
      <LevelBadge level={15} variant="hexagon" />
      <LevelBadge level={20} variant="diamond" />
    </View>
  ),
};

export const CustomLabel: Story = {
  args: {
    level: 42,
    label: 'LV',
    variant: 'circle',
    glow: true,
  },
};

export const WithoutLabel: Story = {
  args: {
    level: 77,
    showLabel: false,
    variant: 'shield',
    size: 'lg',
  },
};

export const HighLevel: Story = {
  args: {
    level: 99,
    variant: 'circle',
    size: 'lg',
    backgroundColor: '#fbbf24',
    borderColor: '#d97706',
    textColor: '#78350f',
    glow: true,
  },
};
