import type { Meta, StoryObj } from '@storybook/react';
import { View, Text, StyleSheet } from 'react-native';

// Example component for Storybook
const ExampleComponent = ({ title }: { title: string }) => (
  <View style={styles.container}>
    <Text style={styles.text}>{title}</Text>
  </View>
);

const meta: Meta<typeof ExampleComponent> = {
  title: 'Example/Component',
  component: ExampleComponent,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Title text to display',
    },
  },
};

export default meta;
type Story = StoryObj<typeof ExampleComponent>;

export const Default: Story = {
  args: {
    title: 'Hello Storybook!',
  },
};

export const Custom: Story = {
  args: {
    title: 'Custom Title',
  },
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#007AFF',
    borderRadius: 8,
  },
  text: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
