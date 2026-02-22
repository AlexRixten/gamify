import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ZoomIn, useZoomIn } from './index';

const meta: Meta<typeof ZoomIn> = {
  title: 'Animations/Entrance/ZoomIn',
  component: ZoomIn,
  parameters: { layout: 'centered' },
  argTypes: {
    duration: { control: { type: 'range', min: 100, max: 800, step: 50 } },
  },
};

export default meta;
type Story = StoryObj<typeof ZoomIn>;

const DemoChild = () => (
  <View style={styles.box}>
    <Text style={styles.text}>ZoomIn</Text>
  </View>
);

const styles = StyleSheet.create({
  box: {
    width: 120,
    height: 120,
    backgroundColor: '#ec4899',
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

const ZoomInWithButton = (args: React.ComponentProps<typeof ZoomIn>) => {
  const [visible, setVisible] = useState(false);
  return (
    <View style={{ alignItems: 'center' }}>
      <ZoomIn {...args} visible={visible}>
        <DemoChild />
      </ZoomIn>
      <TouchableOpacity
        style={styles.button}
        onPress={() => setVisible((v) => !v)}
      >
        <Text style={styles.buttonText}>{visible ? 'Hide' : 'Show'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const ZoomInWithHook = () => {
  const { visible, toggle, ZoomInWrapper } = useZoomIn();
  return (
    <View style={{ alignItems: 'center' }}>
      <ZoomInWrapper>
        <DemoChild />
      </ZoomInWrapper>
      <TouchableOpacity style={styles.button} onPress={toggle}>
        <Text style={styles.buttonText}>
          {visible ? 'Hide' : 'Show'} (Hook)
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export const Default: Story = {
  render: (args) => <ZoomInWithButton {...args} />,
  args: { children: <DemoChild /> },
};

export const Slow: Story = {
  render: (args) => <ZoomInWithButton {...args} />,
  args: { duration: 600, children: <DemoChild /> },
};

export const WithHook: Story = { render: () => <ZoomInWithHook /> };
