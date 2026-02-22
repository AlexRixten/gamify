import { View, Text } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
  useDerivedValue,
} from 'react-native-reanimated';
import type { ProgressBarProps } from './types';
import { defaultConfig, styles } from './styles';

export function ProgressBar({
  value,
  max = defaultConfig.max,
  height = defaultConfig.height,
  borderRadius = defaultConfig.borderRadius,
  trackColor = defaultConfig.trackColor,
  progressColor = defaultConfig.progressColor,
  animated = true,
  duration = defaultConfig.duration,
  style,
  label,
  showValue,
  showPercentage,
}: ProgressBarProps) {
  const progress = useSharedValue(0);

  const clampedValue = Math.max(0, Math.min(value, max));
  const percentage = (clampedValue / max) * 100;

  useDerivedValue(() => {
    const targetProgress = (clampedValue / max) * 100;
    if (animated) {
      progress.value = withTiming(targetProgress, {
        duration,
        easing: Easing.out(Easing.cubic),
      });
    } else {
      progress.value = targetProgress;
    }
  }, [clampedValue, max, animated, duration]);

  const animatedStyle = useAnimatedStyle(
    () => ({
      width: `${progress.value}%`,
    }),
    [progress]
  );

  const trackStyle = {
    height,
    borderRadius,
    backgroundColor: trackColor,
  };

  const progressStyle = {
    backgroundColor: progressColor,
    borderRadius,
  };

  return (
    <View style={[styles.container, style]}>
      {(label || showValue) && (
        <View style={styles.row}>
          {label && <Text style={styles.label}>{label}</Text>}
          {showValue && (
            <Text style={styles.value}>
              {clampedValue}/{max}
            </Text>
          )}
        </View>
      )}
      <View style={[styles.track, trackStyle]}>
        <Animated.View style={[styles.progress, progressStyle, animatedStyle]}>
          {showPercentage && height >= 20 && (
            <View style={styles.percentage}>
              <Text style={styles.percentageText}>
                {Math.round(percentage)}%
              </Text>
            </View>
          )}
        </Animated.View>
      </View>
    </View>
  );
}
