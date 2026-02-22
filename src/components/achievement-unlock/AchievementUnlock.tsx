import { View, Text } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withSequence,
  withTiming,
  withDelay,
  withRepeat,
  Easing,
  useDerivedValue,
  runOnJS,
} from 'react-native-reanimated';
import type { AchievementUnlockProps } from './types';
import { styles } from './styles';

const AnimatedView = Animated.View;

function Particle({ delay, color }: { delay: number; color: string }) {
  const translateY = useSharedValue(0);
  const translateX = useSharedValue(0);
  const opacity = useSharedValue(1);
  const scale = useSharedValue(1);

  useDerivedValue(() => {
    const randomX = (Math.random() - 0.5) * 200;
    const randomY = -Math.random() * 150 - 50;

    translateX.value = withDelay(
      delay,
      withTiming(randomX, { duration: 1000, easing: Easing.out(Easing.cubic) })
    );
    translateY.value = withDelay(
      delay,
      withTiming(randomY, { duration: 1000, easing: Easing.out(Easing.cubic) })
    );
    opacity.value = withDelay(delay, withTiming(0, { duration: 1000 }));
    scale.value = withDelay(
      delay,
      withSequence(
        withTiming(1.5, { duration: 200 }),
        withTiming(0, { duration: 800 })
      )
    );
  }, []);

  const particleStyle = useAnimatedStyle(
    () => ({
      transform: [
        { translateY: translateY.value },
        { translateX: translateX.value },
        { scale: scale.value },
      ],
      opacity: opacity.value,
    }),
    []
  );

  return (
    <AnimatedView
      style={[
        {
          position: 'absolute',
          width: 12,
          height: 12,
          borderRadius: 6,
          backgroundColor: color,
        },
        particleStyle,
      ]}
    />
  );
}

export function AchievementUnlock({
  title,
  description,
  emoji = '🏆',
  reward,
  rewardLabel = 'XP',
  visible,
  duration = 2000,
  onAnimationEnd,
  style,
}: AchievementUnlockProps) {
  const scale = useSharedValue(0);
  const rotate = useSharedValue(-10);
  const opacity = useSharedValue(0);
  const glowScale = useSharedValue(1);
  const bounce = useSharedValue(0);

  const colors = ['#FFD700', '#FF6B6B', '#4ECDC4', '#6366f1', '#FF69B4'];

  useDerivedValue(() => {
    if (visible) {
      opacity.value = withTiming(1, { duration: 300 });
      scale.value = withSequence(
        withSpring(1.1, { damping: 8, stiffness: 200 }),
        withSpring(1, { damping: 12, stiffness: 150 })
      );
      rotate.value = withSequence(
        withSpring(5, { damping: 8 }),
        withSpring(-3, { damping: 8 }),
        withSpring(0, { damping: 10 })
      );
      glowScale.value = withRepeat(
        withSequence(
          withTiming(1.3, { duration: 500, easing: Easing.inOut(Easing.ease) }),
          withTiming(1, { duration: 500, easing: Easing.inOut(Easing.ease) })
        ),
        3,
        true
      );
      bounce.value = withSequence(
        withDelay(300, withSpring(1.1, { damping: 8 })),
        withSpring(1, { damping: 10 })
      );

      if (onAnimationEnd) {
        runOnJS(setTimeout)(() => {
          runOnJS(onAnimationEnd)();
        }, duration + 500);
      }
    } else {
      opacity.value = withTiming(0, { duration: 200 });
      scale.value = withTiming(0.8, { duration: 200 });
    }
  }, [visible]);

  const cardStyle = useAnimatedStyle(
    () => ({
      transform: [{ scale: scale.value }, { rotate: `${rotate.value}deg` }],
      opacity: opacity.value,
    }),
    []
  );

  const glowStyle = useAnimatedStyle(
    () => ({
      transform: [{ scale: glowScale.value }],
    }),
    []
  );

  const emojiStyle = useAnimatedStyle(
    () => ({
      transform: [{ scale: bounce.value }],
    }),
    []
  );

  if (!visible) return null;

  return (
    <View style={[styles.overlay, style]}>
      {/* Particles */}
      <View style={styles.particles}>
        {colors.map((color, i) => (
          <Particle key={i} delay={i * 100} color={color} />
        ))}
      </View>

      <AnimatedView style={[styles.card, cardStyle]}>
        {/* Glow effect */}
        <AnimatedView
          style={[
            {
              position: 'absolute',
              width: 120,
              height: 120,
              borderRadius: 60,
              backgroundColor: '#FFD700',
              opacity: 0.3,
            },
            glowStyle,
          ]}
        />

        {/* Badge */}
        <View style={styles.badge}>
          <Text style={styles.badgeText}>ACHIEVEMENT UNLOCKED!</Text>
        </View>

        {/* Icon */}
        <AnimatedView style={[styles.iconContainer, emojiStyle]}>
          <Text style={styles.emoji}>{emoji}</Text>
        </AnimatedView>

        {/* Title */}
        <Text style={styles.title}>{title}</Text>

        {/* Description */}
        {description && <Text style={styles.description}>{description}</Text>}

        {/* Reward */}
        {reward !== undefined && (
          <View style={styles.reward}>
            <Text style={{ fontSize: 16 }}>⭐</Text>
            <Text style={styles.rewardText}>
              +{reward} {rewardLabel}
            </Text>
          </View>
        )}
      </AnimatedView>
    </View>
  );
}

export function useAchievementUnlock() {
  const visible = useSharedValue(false);

  const show = () => {
    visible.value = true;
  };

  const hide = () => {
    visible.value = false;
  };

  return { visible, show, hide };
}
