import { useEffect, useState } from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
  withSequence,
} from 'react-native-reanimated';
import type { ShakeProps } from './types';
import { defaultConfig } from './styles';

export function Shake({
  children,
  trigger,
  intensity = defaultConfig.intensity,
  duration = defaultConfig.duration,
  style,
  onAnimationEnd,
}: ShakeProps) {
  const translateX = useSharedValue(0);

  useDerivedValue(() => {
    if (trigger) {
      const stepDuration = duration / 8;
      translateX.value = withSequence(
        withTiming(intensity, { duration: stepDuration }),
        withTiming(-intensity, { duration: stepDuration }),
        withTiming(intensity * 0.8, { duration: stepDuration }),
        withTiming(-intensity * 0.8, { duration: stepDuration }),
        withTiming(intensity * 0.5, { duration: stepDuration }),
        withTiming(-intensity * 0.5, { duration: stepDuration }),
        withTiming(intensity * 0.2, { duration: stepDuration }),
        withTiming(0, { duration: stepDuration })
      );
    } else {
      translateX.value = 0;
    }
  }, [trigger, intensity, duration]);

  useEffect(() => {
    if (trigger) {
      const timer = setTimeout(() => {
        onAnimationEnd?.();
      }, duration);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [trigger, duration, onAnimationEnd]);

  const animatedStyle = useAnimatedStyle(
    () => ({
      transform: [{ translateX: translateX.value }],
    }),
    [translateX]
  );

  return (
    <Animated.View style={[style, animatedStyle]}>{children}</Animated.View>
  );
}

export function useShake() {
  const [shakeKey, setShakeKey] = useState(0);

  const shake = () => {
    setShakeKey((k) => k + 1);
  };

  return {
    shake,
    shakeKey,
    shakeTrigger: shakeKey > 0,
    ShakeWrapper: ({ children, ...props }: Omit<ShakeProps, 'trigger'>) => (
      <Shake
        trigger={shakeKey > 0}
        {...props}
        onAnimationEnd={() => {
          props.onAnimationEnd?.();
          setShakeKey(0);
        }}
      >
        {children}
      </Shake>
    ),
  };
}
