import { useState } from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
  withSequence,
  Easing,
} from 'react-native-reanimated';
import type { HeartbeatProps } from './types';
import { defaultConfig } from './styles';

export function Heartbeat({
  children,
  duration = defaultConfig.duration,
  intensity = defaultConfig.intensity,
  disabled = false,
}: HeartbeatProps) {
  const scale = useSharedValue(1);

  useDerivedValue(() => {
    if (disabled) {
      scale.value = 1;
    } else {
      const d = duration / 4;
      scale.value = withSequence(
        withTiming(intensity, { duration: d, easing: Easing.ease }),
        withTiming(1, { duration: d, easing: Easing.ease }),
        withTiming(intensity * 0.95, { duration: d / 2, easing: Easing.ease }),
        withTiming(1, { duration: d * 1.5, easing: Easing.ease })
      );
    }
  }, [disabled, duration, intensity]);

  const animatedStyle = useAnimatedStyle(
    () => ({
      transform: [{ scale: scale.value }],
    }),
    [scale]
  );

  return <Animated.View style={animatedStyle}>{children}</Animated.View>;
}

export function useHeartbeat(initialDisabled = true) {
  const [disabled, setDisabled] = useState(initialDisabled);

  const start = () => setDisabled(false);
  const stop = () => setDisabled(true);
  const toggle = () => setDisabled((d) => !d);

  return {
    disabled,
    start,
    stop,
    toggle,
    setDisabled,
    HeartbeatWrapper: ({
      children,
      ...props
    }: Omit<HeartbeatProps, 'disabled'>) => (
      <Heartbeat disabled={disabled} {...props}>
        {children}
      </Heartbeat>
    ),
  };
}
