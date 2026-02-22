import type { Meta, StoryObj } from '@storybook/react';
import { View, Text, StyleSheet } from 'react-native';
import { UserLevelCard } from '../user-level-card';
import { StreakMilestone } from '../streak-milestone';
import { BadgeGrid } from '../badge-grid';
import { LeaderboardCard } from '../leaderboard-card';
import { AchievementCard } from '../achievement-card';
import { LeaderboardItem } from '../leaderboard-item';
import { fitnessPreset } from '../../presets/fitness';
import { learningPreset } from '../../presets/learning';

const meta: Meta = {
  title: 'Examples/Dashboard',
  parameters: {
    layout: 'padded',
  },
};

export default meta;

const styles = StyleSheet.create({
  container: {
    maxWidth: 400,
    gap: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#999',
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
  },
  statLabel: {
    fontSize: 11,
    color: '#999',
    marginTop: 2,
  },
  divider: {
    width: 1,
    backgroundColor: '#f0f0f0',
    marginHorizontal: 12,
  },
  achievementsList: {
    gap: 8,
  },
  leaderboard: {
    gap: 4,
  },
});

export const FitnessProfile: StoryObj = {
  render: () => {
    const stats = [
      { value: '47', label: 'Workouts' },
      { value: '156km', label: 'Distance' },
      { value: '12.4K', label: 'Calories' },
    ];

    const unlockedBadges = fitnessPreset.badges?.slice(0, 6) || [];

    return (
      <View style={styles.container}>
        {/* User Level Card */}
        <UserLevelCard
          level={5}
          levelName="Athlete"
          xp={850}
          xpToNextLevel={1500}
          color="#FF5722"
        />

        {/* Streak Card */}
        <StreakMilestone count={7} color="#FF5722" size="sm" />

        {/* Stats Card */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>This Month</Text>
          <View style={styles.statsRow}>
            {stats.map((stat) => (
              <View key={stat.label} style={styles.statItem}>
                <Text style={[styles.statValue, { color: '#FF5722' }]}>
                  {stat.value}
                </Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Badges */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Earned Badges</Text>
          <BadgeGrid
            badges={unlockedBadges}
            unlockedIds={unlockedBadges.map((b) => b.id)}
            columns={3}
            badgeSize="sm"
            showLabels={false}
            animated={false}
          />
        </View>

        {/* Recent Achievement */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Latest Achievement</Text>
          <AchievementCard
            title="Week Warrior"
            description="Maintain a 7-day streak"
            emoji="⭐"
            status="unlocked"
            reward={150}
            compact
          />
        </View>
      </View>
    );
  },
};

export const LearningProfile: StoryObj = {
  render: () => {
    const stats = [
      { value: '42', label: 'Lessons' },
      { value: '8', label: 'Courses' },
      { value: '156', label: 'Hours' },
    ];

    const unlockedBadges = learningPreset.badges?.slice(0, 6) || [];

    return (
      <View style={styles.container}>
        {/* User Level Card */}
        <UserLevelCard
          level={4}
          levelName="Scholar"
          xp={650}
          xpToNextLevel={1000}
          color="#6366f1"
        />

        {/* Stats Card */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Your Progress</Text>
          <View style={styles.statsRow}>
            {stats.map((stat) => (
              <View key={stat.label} style={styles.statItem}>
                <Text style={[styles.statValue, { color: '#6366f1' }]}>
                  {stat.value}
                </Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Badges */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Achievements</Text>
          <BadgeGrid
            badges={unlockedBadges}
            unlockedIds={unlockedBadges.map((b) => b.id)}
            columns={4}
            badgeSize="sm"
            showLabels={false}
            animated={false}
          />
        </View>

        {/* Recent Achievement */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Latest Achievement</Text>
          <AchievementCard
            title="Century Scholar"
            description="Complete 100 lessons"
            emoji="🏆"
            status="unlocked"
            reward={400}
            compact
          />
        </View>
      </View>
    );
  },
};

export const EcommerceProfile: StoryObj = {
  render: () => {
    const stats = [
      { value: '23', label: 'Orders' },
      { value: '$847', label: 'Saved' },
      { value: '15', label: 'Reviews' },
    ];

    const entries = [
      { id: '1', rank: 1, name: 'Shopaholic', avatarEmoji: '🛍️', score: 15000 },
      { id: '2', rank: 2, name: 'VIP Buyer', avatarEmoji: '💎', score: 12500 },
      { id: '3', rank: 3, name: 'Regular', avatarEmoji: '⭐', score: 10000 },
      {
        id: '4',
        rank: 4,
        name: 'You',
        avatarEmoji: '🎮',
        score: 8500,
        isCurrentUser: true,
        rankChange: 'up' as const,
      },
    ];

    return (
      <View style={styles.container}>
        {/* User Level Card */}
        <UserLevelCard
          level={4}
          levelName="VIP Member"
          xp={1800}
          xpToNextLevel={2500}
          color="#FFD700"
          glow
        />

        {/* Stats Card */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Your Stats</Text>
          <View style={styles.statsRow}>
            {stats.map((stat) => (
              <View key={stat.label} style={styles.statItem}>
                <Text style={[styles.statValue, { color: '#FFD700' }]}>
                  {stat.value}
                </Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Leaderboard */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Top Shoppers</Text>
          <View style={styles.leaderboard}>
            {entries.map((entry) => (
              <LeaderboardItem
                key={entry.id}
                rank={entry.rank}
                name={entry.name}
                avatarEmoji={entry.avatarEmoji}
                score={entry.score}
                isCurrentUser={entry.isCurrentUser}
                rankChange={entry.rankChange}
                compact
              />
            ))}
          </View>
        </View>

        {/* Recent Achievement */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Latest Reward</Text>
          <AchievementCard
            title="Loyal Customer"
            description="Made 10 purchases"
            emoji="🎁"
            status="unlocked"
            reward={200}
            compact
          />
        </View>
      </View>
    );
  },
};

export const LeaderboardExample: StoryObj = {
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
        <LeaderboardCard
          entries={entries}
          currentUserId="5"
          title="Global Rankings"
        />
      </View>
    );
  },
};

export const FullDashboard: StoryObj = {
  render: () => {
    const stats = [
      { value: '47', label: 'Workouts' },
      { value: '156km', label: 'Distance' },
      { value: '12.4K', label: 'Calories' },
    ];

    return (
      <View style={styles.container}>
        <UserLevelCard
          level={5}
          levelName="Athlete"
          xp={850}
          xpToNextLevel={1500}
          color="#FF5722"
          glow
        />
        <StreakMilestone count={7} color="#FF5722" />
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Statistics</Text>
          <View style={styles.statsRow}>
            {stats.map((stat) => (
              <View key={stat.label} style={styles.statItem}>
                <Text style={[styles.statValue, { color: '#FF5722' }]}>
                  {stat.value}
                </Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    );
  },
};
