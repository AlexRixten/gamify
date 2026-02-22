import type { Meta, StoryObj } from '@storybook/react';
import { View, Text, StyleSheet } from 'react-native';
import { UserLevelCard } from '../user-level-card';
import { StreakMilestone } from '../streak-milestone';
import { BadgeGrid } from '../badge-grid';
import { LeaderboardCard } from '../leaderboard-card';
import { fitnessPreset } from '../../presets/fitness';

const meta: Meta = {
  title: 'Components/Composite',
  parameters: {
    layout: 'padded',
  },
};

export default meta;

const styles = StyleSheet.create({
  container: {
    maxWidth: 400,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  button: {
    backgroundColor: '#6366f1',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  overlayContainer: {
    height: 400,
    position: 'relative',
  },
});

export const UserLevelCardDefault: StoryObj = {
  render: () => (
    <View style={styles.container}>
      <UserLevelCard
        level={5}
        levelName="Athlete"
        xp={850}
        xpToNextLevel={1500}
        color="#FF5722"
      />
    </View>
  ),
};

export const UserLevelCardWithGlow: StoryObj = {
  render: () => (
    <View style={styles.container}>
      <UserLevelCard
        level={10}
        levelName="Master"
        xp={4500}
        xpToNextLevel={5000}
        color="#6366f1"
        glow
      />
    </View>
  ),
};

export const UserLevelCardSizes: StoryObj = {
  render: () => (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Small</Text>
      <UserLevelCard
        level={3}
        levelName="Active"
        xp={250}
        xpToNextLevel={600}
        size="sm"
        color="#4CAF50"
      />
      <Text style={[styles.sectionTitle, { marginTop: 24 }]}>Medium</Text>
      <UserLevelCard
        level={5}
        levelName="Athlete"
        xp={850}
        xpToNextLevel={1500}
        size="md"
        color="#FF5722"
      />
      <Text style={[styles.sectionTitle, { marginTop: 24 }]}>Large</Text>
      <UserLevelCard
        level={8}
        levelName="Legend"
        xp={3500}
        xpToNextLevel={4000}
        size="lg"
        color="#6366f1"
        glow
      />
    </View>
  ),
};

export const StreakMilestoneDefault: StoryObj = {
  render: () => (
    <View style={styles.container}>
      <StreakMilestone count={7} color="#FF5722" />
    </View>
  ),
};

export const StreakMilestoneMilestones: StoryObj = {
  render: () => (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Day 3 - Starting</Text>
      <StreakMilestone count={3} color="#4CAF50" />
      <Text style={[styles.sectionTitle, { marginTop: 24 }]}>
        Day 7 - Week Warrior
      </Text>
      <StreakMilestone count={7} color="#FF5722" />
      <Text style={[styles.sectionTitle, { marginTop: 24 }]}>
        Day 30 - Monthly Master
      </Text>
      <StreakMilestone count={30} color="#6366f1" />
    </View>
  ),
};

export const BadgeGridDefault: StoryObj = {
  render: () => {
    const unlockedIds =
      fitnessPreset.badges?.slice(0, 6).map((b) => b.id) || [];
    return (
      <View style={styles.container}>
        <Text style={styles.sectionTitle}>Fitness Badges</Text>
        <BadgeGrid
          badges={fitnessPreset.badges || []}
          unlockedIds={unlockedIds}
          columns={3}
          badgeSize="md"
          animated={false}
        />
      </View>
    );
  },
};

export const LeaderboardCardDefault: StoryObj = {
  render: () => {
    const entries = [
      {
        id: '1',
        rank: 1,
        name: 'Top Player',
        avatarEmoji: '🏆',
        score: 99999,
        level: 99,
      },
      {
        id: '2',
        rank: 2,
        name: 'Second Best',
        avatarEmoji: '🥈',
        score: 88888,
        level: 85,
      },
      {
        id: '3',
        rank: 3,
        name: 'Third Place',
        avatarEmoji: '🥉',
        score: 77777,
        level: 72,
      },
      {
        id: '4',
        rank: 4,
        name: 'Fourth',
        avatarEmoji: '😎',
        score: 66666,
        level: 60,
      },
      {
        id: '5',
        rank: 5,
        name: 'You',
        avatarEmoji: '🎮',
        score: 55555,
        level: 45,
        isCurrentUser: true,
        rankChange: 'up' as const,
      },
    ];

    return (
      <View style={styles.container}>
        <LeaderboardCard entries={entries} currentUserId="5" />
      </View>
    );
  },
};

export const FullDashboard: StoryObj = {
  render: () => (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>User Profile</Text>
      <UserLevelCard
        level={5}
        levelName="Athlete"
        xp={850}
        xpToNextLevel={1500}
        color="#FF5722"
        glow
      />

      <Text style={[styles.sectionTitle, { marginTop: 24 }]}>
        Streak Progress
      </Text>
      <StreakMilestone count={7} color="#FF5722" />

      <Text style={[styles.sectionTitle, { marginTop: 24 }]}>
        Badges Earned
      </Text>
      <BadgeGrid
        badges={fitnessPreset.badges?.slice(0, 6) || []}
        unlockedIds={fitnessPreset.badges?.slice(0, 4).map((b) => b.id) || []}
        columns={3}
        badgeSize="md"
        animated={false}
      />
    </View>
  ),
};
