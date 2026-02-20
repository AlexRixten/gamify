import { useEffect, useState } from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import type { ZoomInProps } from './types';
import { defaultConfig } from './styles';

export function ZoomIn({
  children,
  visible,
  duration = defaultConfig.duration,
  style,
  onAnimationEnd,
}: ZoomInProps) {
  const scale = useSharedValue(0);
  const opacity = useSharedValue(0);

  useDerivedValue(() => {
    if (visible) {
      scale.value = withTiming(1, { duration, easing: Easing.out(Easing.back(1.5)) });
      opacity.value = withTiming(1, { duration: duration * 0.6 });
    } else {
      scale.value = withTiming(0, { duration: duration * 0.5 });
      opacity.value = withTiming(0, { duration: duration * 0.5 });
    }
  }, [visible, duration]);

  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        onAnimationEnd?.();
      }, duration);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [visible, duration, onAnimationEnd]);

  const animatedStyle = useAnimatedStyle(
    () => ({
      transform: [{ scale: scale.value }],
      opacity: opacity.value,
    }),
    [scale, opacity]
  );

  return (
    <Animated.View style={[style, animatedStyle]}>{children}</Animated.View>
  );
}

export function useZoomIn(initialVisible = false) {
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
    ZoomInWrapper: ({ children, ...props }: Omit<ZoomInProps, 'visible'>) => (
      <ZoomIn visible={visible} {...props}>
        {children}
      </ZoomIn>
    ),
  };
}
