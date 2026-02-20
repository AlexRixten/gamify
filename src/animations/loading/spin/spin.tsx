import { useState } from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useDerivedValue,
  withRepeat,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import type { SpinProps } from './types';
import { defaultConfig } from './styles';

export function Spin({
  children,
  duration = defaultConfig.duration,
  disabled = false,
}: SpinProps) {
  const rotation = useSharedValue(0);

  useDerivedValue(() => {
    if (disabled) {
      rotation.value = 0;
    } else {
      rotation.value = withRepeat(
        withTiming(360, { duration, easing: Easing.linear }),
        -1,
        false
      );
    }
  }, [disabled, duration]);

  const animatedStyle = useAnimatedStyle(
    () => ({
      transform: [{ rotate: `${rotation.value}deg` }],
    }),
    [rotation]
  );

  return <Animated.View style={animatedStyle}>{children}</Animated.View>;
}

export function useSpin(initialDisabled = true) {
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
    SpinWrapper: ({ children, ...props }: Omit<SpinProps, 'disabled'>) => (
      <Spin disabled={disabled} {...props}>
        {children}
      </Spin>
    ),
  };
}
