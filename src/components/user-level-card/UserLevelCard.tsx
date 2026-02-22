import { View, Text, TouchableOpacity } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withRepeat,
  withSequence,
  withTiming,
  Easing,
  useDerivedValue,
} from 'react-native-reanimated';
import { LevelBadge } from '../level-badge';
import { PointsCounter } from '../points-counter';
import { ProgressBar } from '../progress-bar';
import type { UserLevelCardProps } from './types';
import { sizes, styles } from './styles';

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);

export function UserLevelCard({
  level,
  levelName,
  xp,
  xpToNextLevel,
  progress,
  size = 'md',
  color = '#6366f1',
  glow = false,
  style,
  onPress,
}: UserLevelCardProps) {
  const sizeConfig = sizes[size];
  const calculatedProgress =
    progress ?? Math.min((xp / xpToNextLevel) * 100, 100);

  const scale = useSharedValue(0.9);
  const opacity = useSharedValue(0);

  const glowOpacity = useSharedValue(0.3);

  useDerivedValue(() => {
    scale.value = withSpring(1, { damping: 12, stiffness: 100 });
    opacity.value = withTiming(1, { duration: 300 });
  }, []);

  useDerivedValue(() => {
    if (glow) {
      glowOpacity.value = withRepeat(
        withSequence(
          withTiming(0.6, {
            duration: 1500,
            easing: Easing.inOut(Easing.ease),
          }),
          withTiming(0.3, { duration: 1500, easing: Easing.inOut(Easing.ease) })
        ),
        -1,
        true
      );
    }
  }, [glow]);

  const cardStyle = useAnimatedStyle(
    () => ({
      transform: [{ scale: scale.value }],
      opacity: opacity.value,
    }),
    []
  );

  const glowStyle = useAnimatedStyle(
    () => ({
      opacity: glowOpacity.value,
    }),
    []
  );

  const content = (
    <View style={[styles.card, { padding: sizeConfig.padding }, style]}>
      {glow && (
        <Animated.View
          style={[
            {
              position: 'absolute',
              top: -20,
              left: -20,
              right: -20,
              bottom: -20,
              backgroundColor: color,
              borderRadius: 36,
            },
            glowStyle,
          ]}
        />
      )}
      <View style={styles.container}>
        <LevelBadge
          level={level}
          size={sizeConfig.levelSize}
          glow={glow}
          backgroundColor={color}
        />
        <View style={styles.content}>
          <View style={styles.levelInfo}>
            <View>
              {levelName && (
                <Text style={[styles.levelName, { color }]}>{levelName}</Text>
              )}
              <Text style={styles.levelNumber}>Level {level}</Text>
            </View>
            <PointsCounter
              value={xp}
              suffix=" XP"
              size={sizeConfig.counterSize}
              color={color}
            />
          </View>
          <View style={styles.progressContainer}>
            <View style={styles.progressLabel}>
              <Text style={styles.progressText}>Progress to next level</Text>
              <Text style={styles.progressText}>
                {Math.round(calculatedProgress)}%
              </Text>
            </View>
            <ProgressBar value={calculatedProgress} progressColor={color} />
          </View>
        </View>
      </View>
    </View>
  );

  if (onPress) {
    return (
      <AnimatedTouchableOpacity
        onPress={onPress}
        activeOpacity={0.9}
        style={cardStyle}
      >
        {content}
      </AnimatedTouchableOpacity>
    );
  }

  return <Animated.View style={cardStyle}>{content}</Animated.View>;
}
