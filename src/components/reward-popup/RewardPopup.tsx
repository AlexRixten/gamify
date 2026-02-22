import { View, Text, TouchableOpacity } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withSequence,
  withTiming,
  withRepeat,
  withDelay,
  Easing,
  useDerivedValue,
  runOnJS,
} from 'react-native-reanimated';
import type { RewardPopupProps } from './types';
import { styles } from './styles';

const AnimatedView = Animated.View;
const AnimatedText = Animated.Text;

function FloatingCoin({ delay, startX }: { delay: number; startX: number }) {
  const translateY = useSharedValue(0);
  const translateX = useSharedValue(startX);
  const opacity = useSharedValue(1);
  const rotation = useSharedValue(0);
  const scale = useSharedValue(1);

  useDerivedValue(() => {
    translateY.value = withDelay(
      delay,
      withTiming(-200, { duration: 1500, easing: Easing.out(Easing.cubic) })
    );
    translateX.value = withDelay(
      delay,
      withTiming(startX + (Math.random() - 0.5) * 100, { duration: 1500 })
    );
    opacity.value = withDelay(delay, withTiming(0, { duration: 1500 }));
    rotation.value = withDelay(
      delay,
      withRepeat(withTiming(360, { duration: 800 }), 2, false)
    );
    scale.value = withDelay(
      delay,
      withSequence(
        withTiming(1.2, { duration: 200 }),
        withTiming(0.5, { duration: 1300 })
      )
    );
  }, []);

  const coinStyle = useAnimatedStyle(
    () => ({
      transform: [
        { translateY: translateY.value },
        { translateX: translateX.value },
        { rotate: `${rotation.value}deg` },
        { scale: scale.value },
      ],
      opacity: opacity.value,
    }),
    []
  );

  return <AnimatedText style={[styles.coin, coinStyle]}>🪙</AnimatedText>;
}

export function RewardPopup({
  visible,
  title,
  description,
  amount,
  label = 'XP',
  icon = '⭐',
  color = '#6366f1',
  autoDismiss,
  onDismiss,
  style,
}: RewardPopupProps) {
  const scale = useSharedValue(0);
  const opacity = useSharedValue(0);
  const bounce = useSharedValue(0);
  const glowScale = useSharedValue(1);
  const counter = useSharedValue(0);

  useDerivedValue(() => {
    if (visible) {
      opacity.value = withTiming(1, { duration: 200 });
      scale.value = withSequence(
        withSpring(1.1, { damping: 8, stiffness: 200 }),
        withSpring(1, { damping: 12, stiffness: 150 })
      );
      bounce.value = withSequence(
        withDelay(200, withSpring(1.2, { damping: 8 })),
        withSpring(1, { damping: 10 })
      );
      glowScale.value = withRepeat(
        withSequence(
          withTiming(1.5, { duration: 600 }),
          withTiming(1, { duration: 600 })
        ),
        -1,
        true
      );
      counter.value = withDelay(
        300,
        withTiming(amount, { duration: 1000, easing: Easing.out(Easing.cubic) })
      );

      if (autoDismiss && onDismiss) {
        runOnJS(setTimeout)(() => {
          runOnJS(onDismiss)();
        }, autoDismiss);
      }
    } else {
      opacity.value = withTiming(0, { duration: 150 });
      scale.value = withTiming(0.8, { duration: 150 });
    }
  }, [visible]);

  const popupStyle = useAnimatedStyle(
    () => ({
      transform: [{ scale: scale.value }],
      opacity: opacity.value,
    }),
    []
  );

  const amountStyle = useAnimatedStyle(
    () => ({
      transform: [{ scale: bounce.value }],
    }),
    []
  );

  const glowStyle = useAnimatedStyle(
    () => ({
      transform: [{ scale: glowScale.value }],
    }),
    []
  );

  if (!visible) return null;

  return (
    <View style={[styles.overlay, style]}>
      {/* Floating coins */}
      <View style={styles.coins}>
        {[...Array(6)].map((_, i) => (
          <FloatingCoin key={i} delay={i * 100} startX={(i - 2.5) * 30} />
        ))}
      </View>

      <AnimatedView style={[styles.popup, popupStyle]}>
        {/* Glow */}
        <AnimatedView
          style={[
            {
              position: 'absolute',
              width: 100,
              height: 100,
              borderRadius: 50,
              backgroundColor: color,
              opacity: 0.2,
            },
            glowStyle,
          ]}
        />

        {/* Icon */}
        <View style={[styles.iconContainer, { backgroundColor: `${color}20` }]}>
          <Text style={styles.icon}>{icon}</Text>
        </View>

        {/* Amount */}
        <AnimatedView style={[styles.amountContainer, amountStyle]}>
          <AnimatedText style={[styles.amount, { color }]}>
            +{amount}
          </AnimatedText>
          <Text style={[styles.label, { color }]}>{label}</Text>
        </AnimatedView>

        {/* Title */}
        <Text style={styles.title}>{title}</Text>

        {/* Description */}
        {description && <Text style={styles.description}>{description}</Text>}

        {/* Button */}
        <TouchableOpacity
          style={[styles.button, { backgroundColor: color }]}
          onPress={onDismiss}
        >
          <Text style={styles.buttonText}>Awesome!</Text>
        </TouchableOpacity>
      </AnimatedView>
    </View>
  );
}

export function useRewardPopup() {
  const visible = useSharedValue(false);

  const show = () => {
    visible.value = true;
  };

  const hide = () => {
    visible.value = false;
  };

  return { visible, show, hide };
}
