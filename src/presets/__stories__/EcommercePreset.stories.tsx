import type { Meta, StoryObj } from '@storybook/react';
import { View, Text, StyleSheet } from 'react-native';
import { ecommercePreset } from '../ecommerce';
import { AchievementCard } from '../../components/achievement-card';
import { LevelBadge } from '../../components/level-badge';
import { Badge } from '../../components/badge';
import type { Badge as BadgeType, Achievement, AchievementStatus } from '../../core/types';

const meta: Meta = {
  title: 'Presets/E-commerce',
  parameters: {
    layout: 'padded',
  },
};

export default meta;

const styles = StyleSheet.create({
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginBottom: 12,
  },
  card: {
    marginBottom: 8,
  },
  levelsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  levelItem: {
    alignItems: 'center',
    minWidth: 80,
  },
  levelName: {
    fontSize: 11,
    color: '#666',
    marginTop: 4,
    textAlign: 'center',
  },
  xpRange: {
    fontSize: 10,
    color: '#999',
  },
  badgesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    justifyContent: 'center',
  },
});

function achievementToCardProps(achievement: Achievement, isUnlocked: boolean, progress?: number) {
  const status: AchievementStatus = isUnlocked ? 'unlocked' : 'locked';
  return {
    title: achievement.name,
    description: achievement.description,
    emoji: achievement.icon,
    status,
    reward: achievement.xpReward,
    rewardLabel: 'XP',
    progress: progress,
    progressMax: achievement.requirement.target,
  };
}

function badgeToBadgeProps(badge: BadgeType, unlocked: boolean) {
  const variantMap: Record<string, 'default' | 'gold' | 'silver' | 'bronze'> = {
    common: 'default',
    rare: 'bronze',
    epic: 'silver',
    legendary: 'gold',
  };
  return {
    emoji: badge.icon,
    label: badge.name,
    variant: variantMap[badge.rarity] || 'default',
    locked: !unlocked,
    glow: badge.rarity === 'legendary' && unlocked,
  };
}

export const Overview: StoryObj = {
  render: () => (
    <View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Levels ({ecommercePreset.levels.length})</Text>
        <View style={styles.levelsContainer}>
          {ecommercePreset.levels.map((level, index) => (
            <View key={level.id} style={styles.levelItem}>
              <LevelBadge level={index + 1} size="md" showLabel={false} />
              <Text style={styles.levelName}>{level.name}</Text>
              <Text style={styles.xpRange}>{level.xpRequired} XP</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Badges ({ecommercePreset.badges?.length || 0})</Text>
        <View style={styles.badgesGrid}>
          {ecommercePreset.badges?.map((badge) => (
            <Badge key={badge.id} {...badgeToBadgeProps(badge, true)} size="md" />
          ))}
        </View>
      </View>
    </View>
  ),
};

export const Levels: StoryObj = {
  render: () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Membership Levels ({ecommercePreset.levels.length})</Text>
      <View style={styles.levelsContainer}>
        {ecommercePreset.levels.map((level, index) => (
          <View key={level.id} style={styles.levelItem}>
            <LevelBadge level={index + 1} size="md" showLabel={false} />
            <Text style={styles.levelName}>{level.name}</Text>
            <Text style={styles.xpRange}>{level.xpRequired} XP</Text>
          </View>
        ))}
      </View>
    </View>
  ),
};

export const Achievements: StoryObj = {
  render: () => {
    const categories = [...new Set(ecommercePreset.achievements?.map((a) => a.category))];
    return (
      <View>
        {categories.map((category) => (
          <View key={category} style={styles.section}>
            <Text style={styles.sectionTitle}>
              {category.charAt(0).toUpperCase() + category.slice(1)} ({ecommercePreset.achievements?.filter((a) => a.category === category).length})
            </Text>
            {ecommercePreset.achievements
              ?.filter((a) => a.category === category)
              .map((achievement) => (
                <View key={achievement.id} style={styles.card}>
                  <AchievementCard
                    {...achievementToCardProps(achievement, true)}
                  />
                </View>
              ))}
          </View>
        ))}
      </View>
    );
  },
};

export const SecretAchievements: StoryObj = {
  render: () => {
    const secretAchievements = ecommercePreset.achievements?.filter((a) => a.isSecret);
    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Secret Achievements ({secretAchievements?.length || 0})</Text>
        {secretAchievements?.map((achievement) => (
          <View key={achievement.id} style={styles.card}>
            <AchievementCard
              {...achievementToCardProps(achievement, true)}
            />
          </View>
        ))}
      </View>
    );
  },
};

export const Badges: StoryObj = {
  render: () => {
    const badgesByRarity = {
      common: ecommercePreset.badges?.filter((b) => b.rarity === 'common') || [],
      rare: ecommercePreset.badges?.filter((b) => b.rarity === 'rare') || [],
      epic: ecommercePreset.badges?.filter((b) => b.rarity === 'epic') || [],
      legendary: ecommercePreset.badges?.filter((b) => b.rarity === 'legendary') || [],
    };

    return (
      <View>
        {badgesByRarity.common.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Common ({badgesByRarity.common.length})</Text>
            <View style={styles.badgesGrid}>
              {badgesByRarity.common.map((badge) => (
                <Badge key={badge.id} {...badgeToBadgeProps(badge, true)} size="sm" />
              ))}
            </View>
          </View>
        )}

        {badgesByRarity.rare.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Rare ({badgesByRarity.rare.length})</Text>
            <View style={styles.badgesGrid}>
              {badgesByRarity.rare.map((badge) => (
                <Badge key={badge.id} {...badgeToBadgeProps(badge, true)} size="md" />
              ))}
            </View>
          </View>
        )}

        {badgesByRarity.epic.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Epic ({badgesByRarity.epic.length})</Text>
            <View style={styles.badgesGrid}>
              {badgesByRarity.epic.map((badge) => (
                <Badge key={badge.id} {...badgeToBadgeProps(badge, true)} size="lg" />
              ))}
            </View>
          </View>
        )}

        {badgesByRarity.legendary.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Legendary ({badgesByRarity.legendary.length})</Text>
            <View style={styles.badgesGrid}>
              {badgesByRarity.legendary.map((badge) => (
                <Badge key={badge.id} {...badgeToBadgeProps(badge, true)} size="xl" />
              ))}
            </View>
          </View>
        )}
      </View>
    );
  },
};
