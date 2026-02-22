import { View, Text, TouchableOpacity } from 'react-native';
import { ZoomIn } from '../../animations/entrance';
import { Icon } from '../icon';
import type { AchievementCardProps } from './types';
import { defaultConfig, styles } from './styles';

export function AchievementCard({
  title,
  description,
  icon,
  emoji,
  status = defaultConfig.status,
  reward,
  rewardLabel = defaultConfig.rewardLabel,
  progress,
  progressMax = 100,
  compact = false,
  backgroundColor,
  animate = true,
  style,
  onPress,
}: AchievementCardProps) {
  const isLocked = status === 'locked';
  const isNew = status === 'new';

  const cardStyle = [
    styles.card,
    compact && styles.compact,
    isLocked && styles.cardLocked,
    isNew && styles.cardNew,
    backgroundColor && { backgroundColor },
    style,
  ];

  const iconSize = compact ? 20 : 24;
  const iconContainerStyle = [
    compact ? styles.compactIcon : styles.iconContainer,
    isLocked && styles.iconLocked,
  ];

  const content = (
    <View style={cardStyle}>
      {isNew && (
        <View style={styles.newBadge}>
          <Text style={styles.newBadgeText}>NEW!</Text>
        </View>
      )}

      <View style={styles.row}>
        <View style={iconContainerStyle}>
          {isLocked ? (
            <Icon name="lock" size={iconSize} color="#9ca3af" />
          ) : emoji ? (
            <Text style={{ fontSize: iconSize + 8 }}>{emoji}</Text>
          ) : icon ? (
            icon
          ) : (
            <Icon name="emoji-events" size={iconSize} color="#6366f1" />
          )}
        </View>

        <View style={styles.content}>
          <Text style={[styles.title, isLocked && styles.titleLocked]}>
            {title}
          </Text>
          {description && !compact && (
            <Text style={styles.description}>{description}</Text>
          )}
          {reward !== undefined && (
            <View style={styles.reward}>
              <Icon name="star" size={14} color="#6366f1" />
              <Text style={styles.rewardText}>
                +{reward} {rewardLabel}
              </Text>
            </View>
          )}
        </View>
      </View>

      {progress !== undefined && !compact && (
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                { width: `${Math.min((progress / progressMax) * 100, 100)}%` },
              ]}
            />
          </View>
          <Text style={styles.progressText}>
            {progress}/{progressMax}
          </Text>
        </View>
      )}
    </View>
  );

  if (isNew && animate) {
    return (
      <ZoomIn visible={true} duration={400}>
        {onPress ? (
          <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
            {content}
          </TouchableOpacity>
        ) : (
          content
        )}
      </ZoomIn>
    );
  }

  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
        {content}
      </TouchableOpacity>
    );
  }

  return content;
}
