import { useEffect, useState } from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
  withDelay,
  Easing,
} from 'react-native-reanimated';
import type { FadeInProps } from './types';
import { defaultConfig } from './styles';

export function FadeIn({
  children,
  visible,
  duration = defaultConfig.duration,
  delay = defaultConfig.delay,
  style,
  onAnimationEnd,
}: FadeInProps) {
  const opacity = useSharedValue(0);

  useDerivedValue(() => {
    if (visible) {
      if (delay > 0) {
        opacity.value = withDelay(
          delay,
          withTiming(1, { duration, easing: Easing.ease })
        );
      } else {
        opacity.value = withTiming(1, { duration, easing: Easing.ease });
      }
    } else {
      opacity.value = withTiming(0, { duration, easing: Easing.ease });
    }
  }, [visible, duration, delay]);

  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        onAnimationEnd?.();
      }, duration + delay);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [visible, duration, delay, onAnimationEnd]);

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

export function useFadeIn(initialVisible = false) {
  const [visible, setVisible] = useState(initialVisible);

  const show = () => setVisible(true);
  const hide = () => setVisible(false);
  const toggle = () => setVisible((v) => !v);

  return {
    visible,
    show,
    hide,
    toggle,
    setVisible,
    FadeInWrapper: ({ children, ...props }: Omit<FadeInProps, 'visible'>) => (
      <FadeIn visible={visible} {...props}>
        {children}
      </FadeIn>
    ),
  };
}
