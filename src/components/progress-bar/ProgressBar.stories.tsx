import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { ProgressBar } from './index';

const meta: Meta<typeof ProgressBar> = {
  title: 'Components/ProgressBar',
  component: ProgressBar,
  parameters: { layout: 'padded' },
  argTypes: {
    value: { control: { type: 'range', min: 0, max: 100, step: 1 } },
    max: { control: { type: 'range', min: 10, max: 200, step: 10 } },
    height: { control: { type: 'range', min: 4, max: 32, step: 2 } },
    duration: { control: { type: 'range', min: 100, max: 2000, step: 100 } },
  },
};

export default meta;
type Story = StoryObj<typeof ProgressBar>;

const styles = StyleSheet.create({
  button: {
    marginTop: 16,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#6366f1',
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontWeight: '600' },
});

const InteractiveProgress = (
  args: React.ComponentProps<typeof ProgressBar>
) => {
  const [value, setValue] = useState(args.value);
  return (
    <View>
      <ProgressBar {...args} value={value} />
      <View style={{ flexDirection: 'row', gap: 8, marginTop: 16 }}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setValue((v) => Math.max(0, v - 10))}
        >
          <Text style={styles.buttonText}>-10</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setValue((v) => Math.min(args.max, v + 10))}
        >
          <Text style={styles.buttonText}>+10</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => setValue(0)}>
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export const Default: Story = {
  args: {
    value: 65,
    showPercentage: true,
  },
};

export const WithLabel: Story = {
  args: {
    value: 750,
    max: 1000,
    label: 'Level 5',
    showValue: true,
  },
};

export const Thin: Story = {
  args: {
    value: 40,
    height: 4,
  },
};

export const Thick: Story = {
  args: {
    value: 75,
    height: 24,
    showPercentage: true,
  },
};

export const CustomColors: Story = {
  args: {
    value: 80,
    height: 16,
    trackColor: '#fef3c7',
    progressColor: '#f59e0b',
  },
};

export const Interactive: Story = {
  render: (args) => <InteractiveProgress {...args} />,
  args: {
    value: 50,
    max: 100,
    label: 'XP Progress',
    showValue: true,
  },
};

export const Loading: Story = {
  args: {
    value: 0,
    max: 100,
    label: 'Loading...',
  },
};

export const Complete: Story = {
  args: {
    value: 100,
    max: 100,
    label: 'Complete!',
    progressColor: '#10b981',
    showValue: true,
  },
};
