import { useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import { Badge } from '../badge';
import type { BadgeGridProps } from './types';
import type { Badge as BadgeType } from '../../core/types';
import { styles } from './styles';

const AnimatedView = Animated.View;

function AnimatedBadgeItem({
  badge,
  index,
  isUnlocked,
  badgeSize,
  showLabel,
  staggerDelay,
  animated,
  onPress,
}: {
  badge: BadgeType;
  index: number;
  isUnlocked: boolean;
  badgeSize: 'sm' | 'md' | 'lg' | 'xl';
  showLabel: boolean;
  staggerDelay: number;
  animated: boolean;
  onPress?: (badge: BadgeType) => void;
}) {
  const scale = useSharedValue(animated ? 0.01 : 1);
  const opacity = useSharedValue(animated ? 0 : 1);

  useEffect(() => {
    if (animated) {
      const delay = index * staggerDelay + 50;
      scale.value = withDelay(
        delay,
        withSpring(1, { damping: 12, stiffness: 150 })
      );
      opacity.value = withDelay(delay, withTiming(1, { duration: 200 }));
    }
  }, [animated, index, opacity, scale, staggerDelay]);

  const animatedStyle = useAnimatedStyle(
    () => ({
      transform: [{ scale: scale.value }],
      opacity: opacity.value,
    }),
    []
  );

  const variantMap: Record<string, 'default' | 'gold' | 'silver' | 'bronze'> = {
    common: 'default',
    rare: 'bronze',
    epic: 'silver',
    legendary: 'gold',
  };

  const content = (
    <AnimatedView style={[styles.badgeWrapper, animatedStyle]}>
      <Badge
        emoji={badge.icon}
        size={badgeSize}
        variant={variantMap[badge.rarity] || 'default'}
        locked={!isUnlocked}
        glow={badge.rarity === 'legendary' && isUnlocked}
      />
      {showLabel && (
        <Text style={styles.label} numberOfLines={2}>
          {badge.name}
        </Text>
      )}
    </AnimatedView>
  );

  if (onPress) {
    return (
      <TouchableOpacity onPress={() => onPress(badge)} activeOpacity={0.8}>
        {content}
      </TouchableOpacity>
    );
  }

  return content;
}

export function BadgeGrid({
  badges,
  unlockedIds = [],
  columns = 3,
  badgeSize = 'md',
  animated = false,
  staggerDelay = 100,
  showLabels = true,
  style,
  onBadgePress,
}: BadgeGridProps) {
  const columnWidth = `${100 / columns}%`;

  return (
    <View style={[styles.container, style]}>
      {badges.map((badge, index) => {
        const isUnlocked = unlockedIds.includes(badge.id);
        return (
          <View key={badge.id} style={{ width: columnWidth }}>
            <AnimatedBadgeItem
              badge={badge}
              index={index}
              isUnlocked={isUnlocked}
              badgeSize={badgeSize}
              showLabel={showLabels}
              staggerDelay={staggerDelay}
              animated={animated}
              onPress={onBadgePress}
            />
          </View>
        );
      })}
    </View>
  );
}
