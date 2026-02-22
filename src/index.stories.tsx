import type { Meta, StoryObj } from '@storybook/react';
import { View, Text, StyleSheet } from 'react-native';
import { ProgressBar } from './components/progress-bar';
import { Badge } from './components/badge';
import { PointsCounter } from './components/points-counter';

const meta: Meta = {
  title: 'Welcome',
  parameters: {
    layout: 'padded',
  },
};

export default meta;

const styles = StyleSheet.create({
  container: {
    maxWidth: 600,
  },
  header: {
    marginBottom: 32,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1a1a2e',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#999',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    alignItems: 'center',
  },
  featureList: {
    marginTop: 16,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  featureIcon: {
    marginRight: 8,
    fontSize: 16,
  },
  featureText: {
    fontSize: 14,
    color: '#444',
  },
});

export const GettingStarted: StoryObj = {
  render: () => (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Gamify Library</Text>
        <Text style={styles.subtitle}>
          A React Native library with gamification components and animations.
          Add levels, badges, achievements, and progress tracking to your app.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Components</Text>
        <View style={styles.row}>
          <Badge emoji="🏆" size="md" />
          <Badge emoji="⭐" size="md" variant="gold" glow />
          <Badge emoji="🎖️" size="md" locked />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Progress Tracking</Text>
        <ProgressBar value={75} progressColor="#6366f1" />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Points & Counters</Text>
        <PointsCounter value={12500} suffix=" XP" />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Features</Text>
        <View style={styles.featureList}>
          <View style={styles.featureItem}>
            <Text style={styles.featureIcon}>animated</Text>
            <Text style={styles.featureText}>
              Smooth animations with Reanimated
            </Text>
          </View>
          <View style={styles.featureItem}>
            <Text style={styles.featureIcon}>customizable</Text>
            <Text style={styles.featureText}>
              Fully customizable styles and colors
            </Text>
          </View>
          <View style={styles.featureItem}>
            <Text style={styles.featureIcon}>presets</Text>
            <Text style={styles.featureText}>
              Ready-to-use presets (Fitness, Learning, Ecommerce)
            </Text>
          </View>
          <View style={styles.featureItem}>
            <Text style={styles.featureIcon}>typescript</Text>
            <Text style={styles.featureText}>Full TypeScript support</Text>
          </View>
        </View>
      </View>
    </View>
  ),
};
