import { useEffect, useState } from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
  withSequence,
} from 'react-native-reanimated';
import type { FlashProps } from './types';
import { defaultConfig } from './styles';

export function Flash({
  children,
  trigger,
  duration = defaultConfig.duration,
  style,
  onAnimationEnd,
}: FlashProps) {
  const opacity = useSharedValue(1);

  useDerivedValue(() => {
    if (trigger) {
      const step = duration / 3;
      opacity.value = withSequence(
        withTiming(0, { duration: step }),
        withTiming(1, { duration: step }),
        withTiming(0, { duration: step }),
        withTiming(1, { duration: 0 })
      );
    } else {
      opacity.value = 1;
    }
  }, [trigger, duration]);

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
      opacity: opacity.value,
    }),
    [opacity]
  );

  return (
    <Animated.View style={[style, animatedStyle]}>{children}</Animated.View>
  );
}

export function useFlash() {
  const [key, setKey] = useState(0);

  const flash = () => setKey((k) => k + 1);

  return {
    flash,
    flashTrigger: key > 0,
    FlashWrapper: ({ children, ...props }: Omit<FlashProps, 'trigger'>) => (
      <Flash
        trigger={key > 0}
        {...props}
        onAnimationEnd={() => {
          props.onAnimationEnd?.();
          setKey(0);
        }}
      >
        {children}
      </Flash>
    ),
  };
}
