import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SlideIn, useSlideIn } from './index';
import type { SlideDirection } from './types';

const meta: Meta<typeof SlideIn> = {
  title: 'Animations/Entrance/SlideIn',
  component: SlideIn,
  parameters: { layout: 'centered' },
  argTypes: {
    direction: {
      control: { type: 'select' },
      options: ['up', 'down', 'left', 'right'],
    },
    distance: { control: { type: 'range', min: 50, max: 200, step: 10 } },
    duration: { control: { type: 'range', min: 100, max: 800, step: 50 } },
  },
};

export default meta;
type Story = StoryObj<typeof SlideIn>;

const DemoChild = () => (
  <View style={styles.box}>
    <Text style={styles.text}>SlideIn</Text>
  </View>
);

const styles = StyleSheet.create({
  box: {
    width: 120,
    height: 120,
    backgroundColor: '#06b6d4',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: { color: '#fff', fontWeight: '600', fontSize: 18 },
  button: {
    marginTop: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#3b82f6',
    borderRadius: 8,
  },
  buttonText: { color: '#fff', fontWeight: '600' },
});

const SlideInWithButton = (args: React.ComponentProps<typeof SlideIn>) => {
  const [visible, setVisible] = useState(false);
  return (
    <View style={{ alignItems: 'center' }}>
      <SlideIn {...args} visible={visible}>
        <DemoChild />
      </SlideIn>
      <TouchableOpacity
        style={styles.button}
        onPress={() => setVisible((v) => !v)}
      >
        <Text style={styles.buttonText}>{visible ? 'Hide' : 'Show'}</Text>
      </TouchableOpacity>
    </View>
  );
};

export const FromUp: Story = {
  render: (args) => <SlideInWithButton {...args} />,
  args: { direction: 'up' as SlideDirection, children: <DemoChild /> },
};

export const FromDown: Story = {
  render: (args) => <SlideInWithButton {...args} />,
  args: { direction: 'down' as SlideDirection, children: <DemoChild /> },
};

export const FromLeft: Story = {
  render: (args) => <SlideInWithButton {...args} />,
  args: { direction: 'left' as SlideDirection, children: <DemoChild /> },
};

export const FromRight: Story = {
  render: (args) => <SlideInWithButton {...args} />,
  args: { direction: 'right' as SlideDirection, children: <DemoChild /> },
};

export const Slow: Story = {
  render: (args) => <SlideInWithButton {...args} />,
  args: { duration: 600, children: <DemoChild /> },
};
