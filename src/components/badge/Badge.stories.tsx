import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Icon, FontAwesome } from '../icon';
import { Badge } from './index';

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  parameters: { layout: 'centered' },
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg', 'xl'],
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'gold', 'silver', 'bronze'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: 16,
    alignItems: 'flex-end',
  },
  button: {
    marginTop: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#6366f1',
    borderRadius: 8,
  },
  buttonText: { color: '#fff', fontWeight: '600' },
});

const FlippableBadge = (args: React.ComponentProps<typeof Badge>) => {
  const [flipped, setFlipped] = useState(false);
  return (
    <View style={{ alignItems: 'center' }}>
      <Badge
        {...args}
        flipped={flipped}
        onFlipEnd={() => console.log('Flipped!')}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => setFlipped((f) => !f)}
      >
        <Text style={styles.buttonText}>
          {flipped ? 'Reset' : 'Reveal Badge'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export const Default: Story = {
  args: {
    emoji: '🏆',
    size: 'md',
  },
};

export const Gold: Story = {
  args: {
    emoji: '🥇',
    variant: 'gold',
    glow: true,
  },
};

export const Silver: Story = {
  args: {
    emoji: '🥈',
    variant: 'silver',
  },
};

export const Bronze: Story = {
  args: {
    emoji: '🥉',
    variant: 'bronze',
  },
};

export const Locked: Story = {
  args: {
    emoji: '⭐',
    locked: true,
    label: 'Locked',
  },
};

export const WithLabel: Story = {
  args: {
    emoji: '🎯',
    label: 'First Goal',
    variant: 'gold',
  },
};

export const Sizes: Story = {
  render: () => (
    <View style={styles.row}>
      <Badge emoji="⭐" size="sm" />
      <Badge emoji="⭐" size="md" />
      <Badge emoji="⭐" size="lg" />
      <Badge emoji="⭐" size="xl" />
    </View>
  ),
};

export const WithGlow: Story = {
  args: {
    emoji: '✨',
    variant: 'gold',
    glow: true,
    size: 'lg',
  },
};

export const Flippable: Story = {
  render: (args) => <FlippableBadge {...args} />,
  args: {
    emoji: '🏅',
    flippable: true,
    variant: 'gold',
    label: 'Achievement',
  },
};

export const CustomColors: Story = {
  args: {
    emoji: '💎',
    backgroundColor: '#ec4899',
    borderColor: '#be185d',
    size: 'lg',
  },
};

export const WithIcon: Story = {
  render: () => (
    <View style={styles.row}>
      <Badge
        icon={<Icon name="star" size={24} color="#fff" />}
        variant="gold"
        label="Star"
      />
      <Badge
        icon={<Icon name="emoji-events" size={28} color="#fff" />}
        variant="gold"
        size="lg"
        glow
        label="Champion"
      />
      <Badge
        icon={<FontAwesome name="trophy" size={20} color="#fff" />}
        variant="bronze"
        label="Winner"
      />
    </View>
  ),
};
