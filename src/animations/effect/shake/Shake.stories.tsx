import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Shake, useShake } from './index';

const meta: Meta<typeof Shake> = {
  title: 'Animations/Effect/Shake',
  component: Shake,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    intensity: {
      control: { type: 'range', min: 5, max: 50, step: 5 },
    },
    duration: {
      control: { type: 'range', min: 200, max: 1000, step: 50 },
    },
    trigger: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Shake>;

const DemoChild = () => (
  <View style={styles.box}>
    <Text style={styles.text}>Shake</Text>
  </View>
);

const styles = StyleSheet.create({
  box: {
    width: 120,
    height: 120,
    backgroundColor: '#ef4444',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 18,
  },
  button: {
    marginTop: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#3b82f6',
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
});

const ShakeWithButton = (args: React.ComponentProps<typeof Shake>) => {
  const [trigger, setTrigger] = useState(false);

  return (
    <View style={{ alignItems: 'center' }}>
      <Shake
        {...args}
        trigger={trigger}
        onAnimationEnd={() => setTrigger(false)}
      >
        <DemoChild />
      </Shake>
      <TouchableOpacity style={styles.button} onPress={() => setTrigger(true)}>
        <Text style={styles.buttonText}>Shake!</Text>
      </TouchableOpacity>
    </View>
  );
};

const ShakeWithHook = () => {
  const { shake, ShakeWrapper } = useShake();

  return (
    <View style={{ alignItems: 'center' }}>
      <ShakeWrapper>
        <DemoChild />
      </ShakeWrapper>
      <TouchableOpacity style={styles.button} onPress={shake}>
        <Text style={styles.buttonText}>Shake (Hook)</Text>
      </TouchableOpacity>
    </View>
  );
};

export const Default: Story = {
  render: (args) => <ShakeWithButton {...args} />,
  args: {
    children: <DemoChild />,
  },
};

export const Intense: Story = {
  render: (args) => <ShakeWithButton {...args} />,
  args: {
    intensity: 30,
    children: <DemoChild />,
  },
};

export const Fast: Story = {
  render: (args) => <ShakeWithButton {...args} />,
  args: {
    duration: 250,
    children: <DemoChild />,
  },
};

export const WithHook: Story = {
  render: () => <ShakeWithHook />,
};
