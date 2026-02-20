import { useState } from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
  Easing,
  useDerivedValue,
} from 'react-native-reanimated';
import type { PulseProps } from './types';
import { defaultConfig } from './styles';

export const Pulse = ({
  children,
  duration = defaultConfig.duration,
  scale = defaultConfig.scale,
  disabled = false,
}: PulseProps) => {
  const scaleValue = useSharedValue(1);

  useDerivedValue(() => {
    if (disabled) {
      scaleValue.value = 1;
    } else {
      scaleValue.value = withRepeat(
        withTiming(scale, {
          duration,
          easing: Easing.inOut(Easing.ease),
        }),
        -1,
        true
      );
    }
  }, [disabled, duration, scale]);

  const animatedStyle = useAnimatedStyle(
    () => ({
      transform: [{ scale: scaleValue.value }],
    }),
    [scaleValue]
  );

  return <Animated.View style={animatedStyle}>{children}</Animated.View>;
};

export function usePulse(initialDisabled = false) {
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
    PulseWrapper: ({ children, ...props }: Omit<PulseProps, 'disabled'>) => (
      <Pulse disabled={disabled} {...props}>
        {children}
      </Pulse>
    ),
  };
}
