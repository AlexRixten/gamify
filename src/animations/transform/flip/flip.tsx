import { useEffect, useState, memo } from 'react';
import { StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import type { FlipProps } from './types';
import { defaultConfig } from './styles';

export function Flip({
  front,
  back,
  flipped,
  duration = defaultConfig.duration,
  direction = 'horizontal',
  style,
  onFlipEnd,
}: FlipProps) {
  const rotation = useSharedValue(0);

  useDerivedValue(() => {
    rotation.value = withTiming(flipped ? 180 : 0, {
      duration,
      easing: Easing.inOut(Easing.ease),
    });
  }, [flipped, duration]);

  useEffect(() => {
    const timer = setTimeout(() => {
      onFlipEnd?.();
    }, duration);
    return () => clearTimeout(timer);
  }, [flipped, duration, onFlipEnd]);

  const frontAnimatedStyle = useAnimatedStyle(() => {
    'worklet';
    const deg = rotation.value;
    const hideFront = deg > 90;

    if (direction === 'horizontal') {
      return {
        transform: [{ rotateY: `${deg}deg` }],
        opacity: hideFront ? 0 : 1,
      };
    }
    return {
      transform: [{ rotateX: `${deg}deg` }],
      opacity: hideFront ? 0 : 1,
    };
  }, [rotation, direction]);

  const backAnimatedStyle = useAnimatedStyle(() => {
    'worklet';
    const deg = rotation.value;
    const showBack = deg > 90;
    const backDeg = deg - 180;

    if (direction === 'horizontal') {
      return {
        transform: [{ rotateY: `${backDeg}deg` }],
        opacity: showBack ? 1 : 0,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      };
    }
    return {
      transform: [{ rotateX: `${backDeg}deg` }],
      opacity: showBack ? 1 : 0,
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    };
  }, [rotation, direction]);

  return (
    <Animated.View style={[styles.container, style]}>
      <Animated.View style={[styles.face, frontAnimatedStyle]}>
        {front}
      </Animated.View>
      <Animated.View style={[styles.face, backAnimatedStyle]}>
        {back}
      </Animated.View>
    </Animated.View>
  );
}

interface FlipWrapperProps {
  flipped: boolean;
  front: React.ReactNode;
  back: React.ReactNode;
  duration?: number;
  direction?: 'horizontal' | 'vertical';
  style?: object;
}

const FlipWrapperImpl = memo(function FlipWrapperImpl({
  flipped,
  front,
  back,
  duration,
  direction,
  style,
}: FlipWrapperProps) {
  return (
    <Flip
      flipped={flipped}
      front={front}
      back={back}
      duration={duration}
      direction={direction}
      style={style}
    />
  );
});

export function useFlip(initialFlipped = false) {
  const [flipped, setFlipped] = useState(initialFlipped);

  const flip = () => setFlipped((f) => !f);
  const flipToFront = () => setFlipped(false);
  const flipToBack = () => setFlipped(true);

  return {
    flipped,
    flip,
    flipToFront,
    flipToBack,
    setFlipped,
    FlipWrapper: FlipWrapperImpl,
  };
}

const styles = StyleSheet.create({
  container: {
    perspective: 1000,
  },
  face: {
    backfaceVisibility: 'hidden',
  },
});
