import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Flip, useFlip } from './index';

const meta: Meta<typeof Flip> = {
  title: 'Animations/Transform/Flip',
  component: Flip,
  parameters: { layout: 'centered' },
  argTypes: {
    duration: { control: { type: 'range', min: 200, max: 1000, step: 50 } },
    direction: {
      control: { type: 'select' },
      options: ['horizontal', 'vertical'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Flip>;

const FrontCard = () => (
  <View style={[styles.card, styles.frontCard]}>
    <Text style={styles.emoji}>🏆</Text>
    <Text style={styles.text}>Tap to flip</Text>
  </View>
);

const BackCard = () => (
  <View style={[styles.card, styles.backCard]}>
    <Text style={styles.title}>Achievement!</Text>
    <Text style={styles.description}>You won a gold medal!</Text>
  </View>
);

const styles = StyleSheet.create({
  card: {
    width: 160,
    height: 200,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  frontCard: {
    backgroundColor: '#fbbf24',
  },
  backCard: {
    backgroundColor: '#6366f1',
  },
  emoji: {
    fontSize: 64,
  },
  text: {
    marginTop: 8,
    fontSize: 14,
    color: '#78350f',
    fontWeight: '500',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
  },
  description: {
    marginTop: 8,
    fontSize: 14,
    color: '#c7d2fe',
    textAlign: 'center',
    paddingHorizontal: 16,
  },
  button: {
    marginTop: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#3b82f6',
    borderRadius: 8,
  },
  buttonText: { color: '#fff', fontWeight: '600' },
});

const FlipWithButton = (args: React.ComponentProps<typeof Flip>) => {
  const [flipped, setFlipped] = useState(false);
  return (
    <View style={{ alignItems: 'center' }}>
      <Flip
        {...args}
        flipped={flipped}
        front={<FrontCard />}
        back={<BackCard />}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => setFlipped((f) => !f)}
      >
        <Text style={styles.buttonText}>{flipped ? 'Flip Back' : 'Flip'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const FlipWithHook = () => {
  const { flipped, flip, FlipWrapper } = useFlip();
  return (
    <View style={{ alignItems: 'center' }}>
      <FlipWrapper
        flipped={flipped}
        front={<FrontCard />}
        back={<BackCard />}
      />
      <TouchableOpacity style={styles.button} onPress={flip}>
        <Text style={styles.buttonText}>
          {flipped ? 'Flip Back' : 'Flip'} (Hook)
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export const Horizontal: Story = {
  render: (args) => <FlipWithButton {...args} />,
  args: { direction: 'horizontal' },
};

export const Vertical: Story = {
  render: (args) => <FlipWithButton {...args} />,
  args: { direction: 'vertical' },
};

export const Slow: Story = {
  render: (args) => <FlipWithButton {...args} />,
  args: { duration: 800 },
};

export const WithHook: Story = { render: () => <FlipWithHook /> };
