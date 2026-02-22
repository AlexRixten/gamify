import { useRef } from 'react';
import { Text } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSequence,
  withSpring,
  Easing,
  runOnJS,
  useDerivedValue,
} from 'react-native-reanimated';
import type { PointsCounterProps } from './types';
import { defaultConfig, sizes, styles } from './styles';

function formatNumber(num: number): string {
  return num.toLocaleString();
}

export function PointsCounter({
  value,
  pointsToAdd,
  duration = defaultConfig.duration,
  prefix,
  suffix,
  size = defaultConfig.size,
  color = defaultConfig.color,
  positiveColor = defaultConfig.positiveColor,
  negativeColor = defaultConfig.negativeColor,
  formatNumber: shouldFormat = false,
  style,
  onAnimationEnd,
}: PointsCounterProps) {
  const displayValue = useSharedValue(value);
  const deltaOpacity = useSharedValue(0);
  const deltaTranslateY = useSharedValue(0);
  const scale = useSharedValue(1);
  const prevValueRef = useRef(value);

  const delta = pointsToAdd ?? value - prevValueRef.current;

  useDerivedValue(() => {
    if (delta !== 0) {
      deltaOpacity.value = withSequence(
        withTiming(1, { duration: 100 }),
        withTiming(1, { duration: duration - 400 }),
        withTiming(0, { duration: 300 })
      );
      deltaTranslateY.value = withSequence(
        withSpring(-10),
        withTiming(-30, { duration: duration - 200 })
      );

      scale.value = withSequence(
        withSpring(1.15),
        withTiming(1, { duration: 300 })
      );

      displayValue.value = withTiming(
        value,
        {
          duration: duration - 200,
          easing: Easing.out(Easing.cubic),
        },
        (finished) => {
          if (finished && onAnimationEnd) {
            runOnJS(onAnimationEnd)();
          }
        }
      );
    }
    prevValueRef.current = value;
  }, [value, delta, duration]);

  const deltaStyle = useAnimatedStyle(
    () => ({
      opacity: deltaOpacity.value,
      transform: [{ translateY: deltaTranslateY.value }],
    }),
    [deltaOpacity, deltaTranslateY]
  );

  const valueStyle = useAnimatedStyle(
    () => ({
      transform: [{ scale: scale.value }],
    }),
    [scale]
  );

  const sizeConfig = sizes[size];
  const isPositive = delta > 0;
  const deltaColor = isPositive ? positiveColor : negativeColor;
  const displayText = shouldFormat ? formatNumber(value) : value.toString();
  const deltaText = isPositive ? `+${delta}` : delta.toString();

  return (
    <Animated.View style={[styles.container, style]}>
      <Animated.View style={[styles.row, valueStyle]}>
        {prefix && (
          <Text style={{ fontSize: sizeConfig.fontSize, color }}>{prefix}</Text>
        )}
        <Text style={[styles.value, { fontSize: sizeConfig.fontSize, color }]}>
          {displayText}
        </Text>
        {suffix && (
          <Text
            style={[
              styles.suffix,
              { fontSize: sizeConfig.fontSize * 0.6, color },
            ]}
          >
            {suffix}
          </Text>
        )}
      </Animated.View>

      {delta !== 0 && (
        <Animated.View style={[styles.deltaContainer, deltaStyle]}>
          <Text
            style={[
              styles.delta,
              {
                fontSize: sizeConfig.deltaFontSize,
                color: deltaColor,
              },
            ]}
          >
            {deltaText}
          </Text>
        </Animated.View>
      )}
    </Animated.View>
  );
}
