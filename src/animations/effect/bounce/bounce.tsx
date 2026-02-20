import { useEffect, useState } from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
  withSequence,
} from 'react-native-reanimated';
import type { BounceProps } from './types';
import { defaultConfig } from './styles';

export function Bounce({
  children,
  trigger,
  intensity = defaultConfig.intensity,
  duration = defaultConfig.duration,
  style,
  onAnimationEnd,
}: BounceProps) {
  const scale = useSharedValue(1);

  useDerivedValue(() => {
    if (trigger) {
      const bounceHeight = intensity;
      const d = duration / 5;
      scale.value = withSequence(
        withTiming(bounceHeight, { duration: d }),
        withTiming(bounceHeight * 0.9, { duration: d }),
        withTiming(bounceHeight * 0.95, { duration: d }),
        withTiming(1, { duration: d * 2 })
      );
    } else {
      scale.value = 1;
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
      transform: [{ scale: scale.value }],
    }),
    [scale]
  );

  return (
    <Animated.View style={[style, animatedStyle]}>{children}</Animated.View>
  );
}

export function useBounce() {
  const [key, setKey] = useState(0);

  const bounce = () => setKey((k) => k + 1);

  return {
    bounce,
    bounceTrigger: key > 0,
    BounceWrapper: ({ children, ...props }: Omit<BounceProps, 'trigger'>) => (
      <Bounce
        trigger={key > 0}
        {...props}
        onAnimationEnd={() => {
          props.onAnimationEnd?.();
          setKey(0);
        }}
      >
        {children}
      </Bounce>
    ),
  };
}
