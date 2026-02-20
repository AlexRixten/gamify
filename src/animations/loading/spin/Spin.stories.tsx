import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Spin, useSpin } from './index';

const meta: Meta<typeof Spin> = {
  title: 'Animations/Loading/Spin',
  component: Spin,
  parameters: { layout: 'centered' },
  argTypes: {
    duration: { control: { type: 'range', min: 500, max: 3000, step: 100 } },
  },
};

export default meta;
type Story = StoryObj<typeof Spin>;

const DemoChild = () => (
  <View style={styles.box}>
    <Text style={styles.text}>⚙️</Text>
  </View>
);

const styles = StyleSheet.create({
  box: {
    width: 80,
    height: 80,
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

const SpinWithButton = (args: React.ComponentProps<typeof Spin>) => {
  const [disabled, setDisabled] = useState(true);
  return (
    <View style={{ alignItems: 'center' }}>
      <Spin {...args} disabled={disabled}>
        <DemoChild />
      </Spin>
      <TouchableOpacity
        style={styles.button}
        onPress={() => setDisabled((d) => !d)}
      >
        <Text style={styles.buttonText}>{disabled ? 'Start' : 'Stop'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const SpinWithHook = () => {
  const { disabled, toggle, SpinWrapper } = useSpin(true);
  return (
    <View style={{ alignItems: 'center' }}>
      <SpinWrapper>
        <DemoChild />
      </SpinWrapper>
      <TouchableOpacity style={styles.button} onPress={toggle}>
        <Text style={styles.buttonText}>
          {disabled ? 'Start' : 'Stop'} (Hook)
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export const Default: Story = {
  render: (args) => <SpinWithButton {...args} />,
  args: { children: <DemoChild /> },
};

export const Fast: Story = {
  render: (args) => <SpinWithButton {...args} />,
  args: { duration: 500, children: <DemoChild /> },
};

export const Slow: Story = {
  render: (args) => <SpinWithButton {...args} />,
  args: { duration: 2000, children: <DemoChild /> },
};

export const WithHook: Story = { render: () => <SpinWithHook /> };
