import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FadeIn, useFadeIn } from './index';

const meta: Meta<typeof FadeIn> = {
  title: 'Animations/Entrance/FadeIn',
  component: FadeIn,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    duration: {
      control: { type: 'range', min: 100, max: 1000, step: 50 },
    },
    delay: {
      control: { type: 'range', min: 0, max: 1000, step: 100 },
    },
    visible: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof FadeIn>;

const DemoChild = () => (
  <View style={styles.box}>
    <Text style={styles.text}>FadeIn</Text>
  </View>
);

const styles = StyleSheet.create({
  box: {
    width: 120,
    height: 120,
    backgroundColor: '#8b5cf6',
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

const FadeInWithButton = (args: React.ComponentProps<typeof FadeIn>) => {
  const [visible, setVisible] = useState(false);

  return (
    <View style={{ alignItems: 'center' }}>
      <FadeIn {...args} visible={visible}>
        <DemoChild />
      </FadeIn>
      <TouchableOpacity style={styles.button} onPress={() => setVisible((v) => !v)}>
        <Text style={styles.buttonText}>{visible ? 'Hide' : 'Show'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const FadeInWithHook = () => {
  const { visible, toggle, FadeInWrapper } = useFadeIn();

  return (
    <View style={{ alignItems: 'center' }}>
      <FadeInWrapper>
        <DemoChild />
      </FadeInWrapper>
      <TouchableOpacity style={styles.button} onPress={toggle}>
        <Text style={styles.buttonText}>{visible ? 'Hide' : 'Show'} (Hook)</Text>
      </TouchableOpacity>
    </View>
  );
};

export const Default: Story = {
  render: (args) => <FadeInWithButton {...args} />,
  args: {
    children: <DemoChild />,
  },
};

export const Slow: Story = {
  render: (args) => <FadeInWithButton {...args} />,
  args: {
    duration: 800,
    children: <DemoChild />,
  },
};

export const WithDelay: Story = {
  render: (args) => <FadeInWithButton {...args} />,
  args: {
    delay: 500,
    children: <DemoChild />,
  },
};

export const WithHook: Story = {
  render: () => <FadeInWithHook />,
};
