import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Bounce, useBounce } from './index';

const meta: Meta<typeof Bounce> = {
  title: 'Animations/Effect/Bounce',
  component: Bounce,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    intensity: {
      control: { type: 'range', min: 1.1, max: 2, step: 0.1 },
    },
    duration: {
      control: { type: 'range', min: 300, max: 1000, step: 50 },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Bounce>;

const DemoChild = () => (
  <View style={styles.box}>
    <Text style={styles.text}>Bounce</Text>
  </View>
);

const styles = StyleSheet.create({
  box: {
    width: 120,
    height: 120,
    backgroundColor: '#10b981',
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

const BounceWithButton = (args: React.ComponentProps<typeof Bounce>) => {
  const [trigger, setTrigger] = useState(false);

  return (
    <View style={{ alignItems: 'center' }}>
      <Bounce
        {...args}
        trigger={trigger}
        onAnimationEnd={() => setTrigger(false)}
      >
        <DemoChild />
      </Bounce>
      <TouchableOpacity style={styles.button} onPress={() => setTrigger(true)}>
        <Text style={styles.buttonText}>Bounce!</Text>
      </TouchableOpacity>
    </View>
  );
};

const BounceWithHook = () => {
  const { bounce, BounceWrapper } = useBounce();

  return (
    <View style={{ alignItems: 'center' }}>
      <BounceWrapper>
        <DemoChild />
      </BounceWrapper>
      <TouchableOpacity style={styles.button} onPress={bounce}>
        <Text style={styles.buttonText}>Bounce (Hook)</Text>
      </TouchableOpacity>
    </View>
  );
};

export const Default: Story = {
  render: (args) => <BounceWithButton {...args} />,
  args: {
    children: <DemoChild />,
  },
};

export const Intense: Story = {
  render: (args) => <BounceWithButton {...args} />,
  args: {
    intensity: 1.5,
    children: <DemoChild />,
  },
};

export const Fast: Story = {
  render: (args) => <BounceWithButton {...args} />,
  args: {
    duration: 300,
    children: <DemoChild />,
  },
};

export const WithHook: Story = {
  render: () => <BounceWithHook />,
};
