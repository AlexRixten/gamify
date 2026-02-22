import { View, Text, TouchableOpacity } from 'react-native';
import { Icon } from '../icon';
import { LevelBadge } from '../level-badge';
import type { LeaderboardItemProps } from './types';
import { defaultConfig, styles } from './styles';

export function LeaderboardItem({
  rank,
  name,
  avatar,
  avatarEmoji,
  score,
  scoreLabel = defaultConfig.scoreLabel,
  level,
  isCurrentUser = false,
  rankChange,
  compact = false,
  style,
  onPress,
}: LeaderboardItemProps) {
  const isTopThree = rank <= 3;

  const getRankColor = () => {
    if (rank === 1) return styles.rankGold;
    if (rank === 2) return styles.rankSilver;
    if (rank === 3) return styles.rankBronze;
    return null;
  };

  const getRankBadgeStyle = () => {
    if (rank === 1) return styles.rankBadgeGold;
    if (rank === 2) return styles.rankBadgeSilver;
    if (rank === 3) return styles.rankBadgeBronze;
    return null;
  };

  const getRankChangeIcon = () => {
    if (rankChange === 'up') {
      return (
        <View style={styles.rankChange}>
          <Icon name="arrow-upward" size={12} color="#10b981" />
        </View>
      );
    }
    if (rankChange === 'down') {
      return (
        <View style={styles.rankChange}>
          <Icon name="arrow-downward" size={12} color="#ef4444" />
        </View>
      );
    }
    return null;
  };

  const containerStyle = [
    styles.container,
    compact && styles.compact,
    isCurrentUser && styles.currentUser,
    isTopThree && styles.topThree,
    style,
  ];

  const avatarSize = compact ? 32 : 44;
  const avatarTextSize = compact ? 16 : 24;

  const renderRank = () => {
    if (isTopThree) {
      return (
        <View style={[styles.rankBadge, getRankBadgeStyle()]}>
          {rank === 1 ? (
            <Text style={{ fontSize: 16 }}>👑</Text>
          ) : (
            <Text style={[styles.rank, getRankColor(), { fontSize: 14 }]}>
              {rank}
            </Text>
          )}
        </View>
      );
    }
    return <Text style={[styles.rank, getRankColor()]}>{rank}</Text>;
  };

  const content = (
    <View style={containerStyle}>
      <View style={styles.rankContainer}>
        {renderRank()}
        {getRankChangeIcon()}
      </View>

      <View
        style={[
          styles.avatar,
          compact && styles.compactAvatar,
        ]}
      >
        {avatar ? (
          avatar
        ) : avatarEmoji ? (
          <Text style={[styles.avatarText, compact && styles.compactAvatarText]}>
            {avatarEmoji}
          </Text>
        ) : (
          <Text style={[styles.avatarText, compact && styles.compactAvatarText]}>
            👤
          </Text>
        )}
      </View>

      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={1}>
          {name}
          {isCurrentUser && ' (You)'}
        </Text>
        {level !== undefined && !compact && (
          <Text style={styles.level}>Level {level}</Text>
        )}
      </View>

      <View style={styles.scoreContainer}>
        <Text style={styles.score}>
          {score.toLocaleString()}
        </Text>
        <Text style={styles.scoreLabel}>{scoreLabel}</Text>
      </View>
    </View>
  );

  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
        {content}
      </TouchableOpacity>
    );
  }

  return content;
}
