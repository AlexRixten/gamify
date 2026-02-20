import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Flash, useFlash } from './index';

const meta: Meta<typeof Flash> = {
  title: 'Animations/Effect/Flash',
  component: Flash,
  parameters: { layout: 'centered' },
  argTypes: {
    duration: { control: { type: 'range', min: 200, max: 1000, step: 50 } },
  },
};

export default meta;
type Story = StoryObj<typeof Flash>;

const DemoChild = () => (
  <View style={styles.box}>
    <Text style={styles.text}>Flash</Text>
  </View>
);

const styles = StyleSheet.create({
  box: {
    width: 120,
    height: 120,
    backgroundColor: '#f59e0b',
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

const FlashWithButton = (args: React.ComponentProps<typeof Flash>) => {
  const [trigger, setTrigger] = useState(false);
  return (
    <View style={{ alignItems: 'center' }}>
      <Flash {...args} trigger={trigger} onAnimationEnd={() => setTrigger(false)}>
        <DemoChild />
      </Flash>
      <TouchableOpacity style={styles.button} onPress={() => setTrigger(true)}>
        <Text style={styles.buttonText}>Flash!</Text>
      </TouchableOpacity>
    </View>
  );
};

const FlashWithHook = () => {
  const { flash, FlashWrapper } = useFlash();
  return (
    <View style={{ alignItems: 'center' }}>
      <FlashWrapper>
        <DemoChild />
      </FlashWrapper>
      <TouchableOpacity style={styles.button} onPress={flash}>
        <Text style={styles.buttonText}>Flash (Hook)</Text>
      </TouchableOpacity>
    </View>
  );
};

export const Default: Story = {
  render: (args) => <FlashWithButton {...args} />,
  args: { children: <DemoChild /> },
};

export const Fast: Story = {
  render: (args) => <FlashWithButton {...args} />,
  args: { duration: 200, children: <DemoChild /> },
};

export const WithHook: Story = { render: () => <FlashWithHook /> };
