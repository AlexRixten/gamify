import { View, Text } from 'react-native';
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
import type { StreakMilestoneProps } from './types';
import { sizes, styles } from './styles';

const AnimatedView = Animated.View;

const defaultMilestones = [3, 7, 14, 30, 60, 100];

function MilestoneCircle({
  target,
  current,
  color,
  size,
}: {
  target: number;
  current: number;
  color: string;
  size: number;
}) {
  const isCompleted = current >= target;
  const isNext =
    !isCompleted &&
    current < target &&
    (current >= target - 2 ||
      target === defaultMilestones.find((m) => m > current));

  const scale = useSharedValue(1);
  const rotation = useSharedValue(0);

  useDerivedValue(() => {
    if (isCompleted) {
      scale.value = withSequence(
        withSpring(1.2, { damping: 8 }),
        withSpring(1, { damping: 10 })
      );
    } else if (isNext) {
      scale.value = withRepeat(
        withSequence(
          withTiming(1.1, { duration: 500 }),
          withTiming(1, { duration: 500 })
        ),
        -1,
        true
      );
      rotation.value = withRepeat(
        withSequence(
          withTiming(5, { duration: 500 }),
          withTiming(-5, { duration: 500 })
        ),
        -1,
        true
      );
    }
  }, [isCompleted, isNext]);

  const animatedStyle = useAnimatedStyle(
    () => ({
      transform: [{ scale: scale.value }, { rotate: `${rotation.value}deg` }],
      backgroundColor: isCompleted ? color : isNext ? `${color}20` : '#f5f5f5',
      borderColor: isCompleted ? color : isNext ? color : '#ddd',
    }),
    []
  );

  return (
    <AnimatedView
      style={[
        styles.milestone,
        { width: size, height: size, borderRadius: size / 2 },
        animatedStyle,
      ]}
    >
      <Text
        style={[
          styles.milestoneText,
          { color: isCompleted ? '#fff' : isNext ? color : '#999' },
        ]}
      >
        {target}
      </Text>
    </AnimatedView>
  );
}

export function StreakMilestone({
  count,
  label = 'day streak',
  milestones = defaultMilestones,
  color = '#FF5722',
  celebrateMilestone = true,
  size = 'md',
  style,
}: StreakMilestoneProps) {
  const sizeConfig = sizes[size];

  const streakScale = useSharedValue(1);
  const glowOpacity = useSharedValue(0);

  useDerivedValue(() => {
    streakScale.value = withRepeat(
      withSequence(
        withTiming(1.05, { duration: 800, easing: Easing.inOut(Easing.ease) }),
        withTiming(1, { duration: 800, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      true
    );

    if (count >= 7) {
      glowOpacity.value = withRepeat(
        withSequence(
          withTiming(0.4, { duration: 1000 }),
          withTiming(0.2, { duration: 1000 })
        ),
        -1,
        true
      );
    }
  }, [count]);

  const streakStyle = useAnimatedStyle(
    () => ({
      transform: [{ scale: streakScale.value }],
    }),
    []
  );

  const isMilestone = milestones.includes(count);

  return (
    <View style={[styles.card, { padding: sizeConfig.cardPadding }, style]}>
      <View style={styles.content}>
        <AnimatedView style={[styles.streakRow, streakStyle]}>
          <Text style={[styles.icon, { fontSize: sizeConfig.iconSize }]}>
            🔥
          </Text>
          <Text
            style={[styles.count, { fontSize: sizeConfig.countSize, color }]}
          >
            {count}
          </Text>
        </AnimatedView>

        <Text style={[styles.label, { fontSize: sizeConfig.labelSize }]}>
          {label}
        </Text>

        {isMilestone && celebrateMilestone && (
          <Text
            style={{ color, fontSize: 12, fontWeight: '600', marginTop: 4 }}
          >
            🎉 Milestone reached!
          </Text>
        )}

        <View style={styles.milestonesContainer}>
          {milestones.map((milestone) => (
            <MilestoneCircle
              key={milestone}
              target={milestone}
              current={count}
              color={color}
              size={sizeConfig.milestoneSize}
            />
          ))}
        </View>
      </View>
    </View>
  );
}
