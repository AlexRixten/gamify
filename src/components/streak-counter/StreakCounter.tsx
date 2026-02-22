import { Text } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
  useDerivedValue,
} from 'react-native-reanimated';
import { Pulse } from '../../animations/effect';
import type { StreakCounterProps } from './types';
import { defaultConfig, sizes, styles } from './styles';

export function StreakCounter({
  count,
  label = defaultConfig.label,
  showIcon = defaultConfig.showIcon,
  size = defaultConfig.size,
  color = defaultConfig.color,
  glow = false,
  style,
}: StreakCounterProps) {
  const sizeConfig = sizes[size];
  const shouldGlow = glow || count >= 7;
  const shouldPulse = count >= 3;

  const glowScale = useSharedValue(1);

  useDerivedValue(() => {
    if (shouldGlow) {
      glowScale.value = withRepeat(
        withTiming(1.3, { duration: 2000, easing: Easing.inOut(Easing.ease) }),
        -1,
        true
      );
    }
  }, [shouldGlow]);

  const glowAnimatedStyle = useAnimatedStyle(
    () => ({
      transform: [{ scale: glowScale.value }],
    }),
    [glowScale]
  );

  const content = (
    <Animated.View style={[styles.container, style]}>
      {shouldGlow && (
        <Animated.View
          style={[
            styles.glow,
            {
              width: 100,
              height: 100,
              backgroundColor: color,
            },
            glowAnimatedStyle,
          ]}
        />
      )}
      <Animated.View style={styles.row}>
        {showIcon && (
          <Text
            style={{
              fontSize: sizeConfig.iconSize,
              marginRight: 8,
            }}
          >
            🔥
          </Text>
        )}
        <Text
          style={[
            styles.count,
            {
              fontSize: sizeConfig.countFontSize,
              color,
            },
          ]}
        >
          {count}
        </Text>
      </Animated.View>
      <Text
        style={[
          styles.label,
          {
            fontSize: sizeConfig.labelFontSize,
            color,
            opacity: 0.8,
          },
        ]}
      >
        {label}
      </Text>
    </Animated.View>
  );

  if (shouldPulse) {
    return (
      <Pulse duration={1500} scale={1.05} disabled={false}>
        {content}
      </Pulse>
    );
  }

  return content;
}
