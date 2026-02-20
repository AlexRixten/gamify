import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Pulse, usePulse } from './index';

const meta: Meta<typeof Pulse> = {
  title: 'Animations/Effect/Pulse',
  component: Pulse,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    duration: {
      control: { type: 'range', min: 200, max: 3000, step: 100 },
    },
    scale: {
      control: { type: 'range', min: 1.01, max: 2, step: 0.05 },
    },
    disabled: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Pulse>;

const DemoChild = () => (
  <View style={styles.box}>
    <Text style={styles.text}>Pulse</Text>
  </View>
);

const styles = StyleSheet.create({
  box: {
    width: 120,
    height: 120,
    backgroundColor: '#6366f1',
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

// Interactive story with toggle button
const PulseWithButton = (args: React.ComponentProps<typeof Pulse>) => {
  const [disabled, setDisabled] = useState(true);

  return (
    <View style={{ alignItems: 'center' }}>
      <Pulse {...args} disabled={disabled}>
        <DemoChild />
      </Pulse>
      <TouchableOpacity
        style={styles.button}
        onPress={() => setDisabled((d) => !d)}
      >
        <Text style={styles.buttonText}>
          {disabled ? 'Start' : 'Stop'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

// Story using usePulse hook
const PulseWithHook = () => {
  const { disabled, toggle, PulseWrapper } = usePulse(true);

  return (
    <View style={{ alignItems: 'center' }}>
      <PulseWrapper>
        <DemoChild />
      </PulseWrapper>
      <TouchableOpacity style={styles.button} onPress={toggle}>
        <Text style={styles.buttonText}>
          {disabled ? 'Start' : 'Stop'} (Hook)
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export const Default: Story = {
  render: (args) => <PulseWithButton {...args} />,
  args: {
    children: <DemoChild />,
  },
};

export const Fast: Story = {
  render: (args) => <PulseWithButton {...args} />,
  args: {
    duration: 400,
    children: <DemoChild />,
  },
};

export const Intense: Story = {
  render: (args) => <PulseWithButton {...args} />,
  args: {
    scale: 1.3,
    children: <DemoChild />,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: <DemoChild />,
  },
};

export const WithHook: Story = {
  render: () => <PulseWithHook />,
};
