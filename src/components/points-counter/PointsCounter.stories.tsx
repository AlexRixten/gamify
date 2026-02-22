import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { PointsCounter } from './index';

const meta: Meta<typeof PointsCounter> = {
  title: 'Components/PointsCounter',
  component: PointsCounter,
  parameters: { layout: 'centered' },
  argTypes: {
    value: { control: { type: 'number' } },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg', 'xl'],
    },
    duration: { control: { type: 'range', min: 300, max: 2000, step: 100 } },
  },
};

export default meta;
type Story = StoryObj<typeof PointsCounter>;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    alignItems: 'center',
    minWidth: 200,
  },
  row: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 16,
  },
  button: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#6366f1',
    borderRadius: 8,
  },
  buttonText: { color: '#fff', fontWeight: '600' },
  minusButton: {
    backgroundColor: '#ef4444',
  },
});

const InteractiveCounter = (
  args: React.ComponentProps<typeof PointsCounter>
) => {
  const [value, setValue] = useState(args.value);

  return (
    <View style={styles.container}>
      <PointsCounter {...args} value={value} pointsToAdd={value - args.value} />
      <View style={styles.row}>
        <TouchableOpacity
          style={[styles.button, styles.minusButton]}
          onPress={() => setValue((v) => v - 100)}
        >
          <Text style={styles.buttonText}>-100</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setValue((v) => v + 100)}
        >
          <Text style={styles.buttonText}>+100</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setValue((v) => v + 500)}
        >
          <Text style={styles.buttonText}>+500</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export const Default: Story = {
  args: {
    value: 1250,
    suffix: 'XP',
  },
};

export const WithPrefix: Story = {
  args: {
    value: 500,
    prefix: '★',
    suffix: 'pts',
  },
};

export const LargeNumber: Story = {
  args: {
    value: 1000000,
    formatNumber: true,
    size: 'xl',
  },
};

export const Sizes: Story = {
  render: () => (
    <View style={{ gap: 16, alignItems: 'center' }}>
      <PointsCounter value={100} size="sm" suffix="XP" />
      <PointsCounter value={500} size="md" suffix="XP" />
      <PointsCounter value={1000} size="lg" suffix="XP" />
      <PointsCounter value={5000} size="xl" suffix="XP" />
    </View>
  ),
};

export const Interactive: Story = {
  render: (args) => <InteractiveCounter {...args} />,
  args: {
    value: 1000,
    suffix: 'XP',
    size: 'xl',
  },
};

export const CustomColors: Story = {
  args: {
    value: 2500,
    suffix: 'coins',
    color: '#6366f1',
    positiveColor: '#10b981',
  },
};
