import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Heartbeat, useHeartbeat } from './index';

const meta: Meta<typeof Heartbeat> = {
  title: 'Animations/Effect/Heartbeat',
  component: Heartbeat,
  parameters: { layout: 'centered' },
  argTypes: {
    duration: { control: { type: 'range', min: 500, max: 2000, step: 100 } },
    intensity: { control: { type: 'range', min: 1.1, max: 1.5, step: 0.05 } },
  },
};

export default meta;
type Story = StoryObj<typeof Heartbeat>;

const DemoChild = () => (
  <View style={styles.box}>
    <Text style={styles.text}>❤️</Text>
  </View>
);

const styles = StyleSheet.create({
  box: {
    width: 120,
    height: 120,
    backgroundColor: '#ef4444',
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: { fontSize: 48 },
  button: {
    marginTop: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#3b82f6',
    borderRadius: 8,
  },
  buttonText: { color: '#fff', fontWeight: '600' },
});

const HeartbeatWithButton = (args: React.ComponentProps<typeof Heartbeat>) => {
  const [disabled, setDisabled] = useState(true);
  return (
    <View style={{ alignItems: 'center' }}>
      <Heartbeat {...args} disabled={disabled}>
        <DemoChild />
      </Heartbeat>
      <TouchableOpacity
        style={styles.button}
        onPress={() => setDisabled((d) => !d)}
      >
        <Text style={styles.buttonText}>{disabled ? 'Start' : 'Stop'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const HeartbeatWithHook = () => {
  const { disabled, toggle, HeartbeatWrapper } = useHeartbeat(true);
  return (
    <View style={{ alignItems: 'center' }}>
      <HeartbeatWrapper>
        <DemoChild />
      </HeartbeatWrapper>
      <TouchableOpacity style={styles.button} onPress={toggle}>
        <Text style={styles.buttonText}>
          {disabled ? 'Start' : 'Stop'} (Hook)
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export const Default: Story = {
  render: (args) => <HeartbeatWithButton {...args} />,
  args: { children: <DemoChild /> },
};

export const Fast: Story = {
  render: (args) => <HeartbeatWithButton {...args} />,
  args: { duration: 600, children: <DemoChild /> },
};

export const WithHook: Story = { render: () => <HeartbeatWithHook /> };
