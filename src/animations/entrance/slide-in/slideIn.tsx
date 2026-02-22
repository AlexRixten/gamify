import { useEffect, useState } from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import type { SlideInProps, SlideDirection } from './types';
import { defaultConfig } from './styles';

const getInitialOffset = (
  direction: SlideDirection,
  distance: number
): { x: number; y: number } => {
  switch (direction) {
    case 'up':
      return { x: 0, y: distance };
    case 'down':
      return { x: 0, y: -distance };
    case 'left':
      return { x: distance, y: 0 };
    case 'right':
      return { x: -distance, y: 0 };
  }
};

export function SlideIn({
  children,
  visible,
  direction = 'up',
  distance = defaultConfig.distance,
  duration = defaultConfig.duration,
  style,
  onAnimationEnd,
}: SlideInProps) {
  const translateX = useSharedValue(getInitialOffset(direction, distance).x);
  const translateY = useSharedValue(getInitialOffset(direction, distance).y);
  const opacity = useSharedValue(0);

  useDerivedValue(() => {
    if (visible) {
      translateX.value = withTiming(0, {
        duration,
        easing: Easing.out(Easing.ease),
      });
      translateY.value = withTiming(0, {
        duration,
        easing: Easing.out(Easing.ease),
      });
      opacity.value = withTiming(1, {
        duration,
        easing: Easing.out(Easing.ease),
      });
    } else {
      const initial = getInitialOffset(direction, distance);
      translateX.value = initial.x;
      translateY.value = initial.y;
      opacity.value = 0;
    }
  }, [visible, direction, distance, duration]);

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
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
      ],
      opacity: opacity.value,
    }),
    [translateX, translateY, opacity]
  );

  return (
    <Animated.View style={[style, animatedStyle]}>{children}</Animated.View>
  );
}

export function useSlideIn(initialVisible = false) {
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
    SlideInWrapper: ({ children, ...props }: Omit<SlideInProps, 'visible'>) => (
      <SlideIn visible={visible} {...props}>
        {children}
      </SlideIn>
    ),
  };
}
