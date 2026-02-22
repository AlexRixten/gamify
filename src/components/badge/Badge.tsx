import { View, Text } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
  useDerivedValue,
} from 'react-native-reanimated';
import { Flip } from '../../animations/transform';
import type { BadgeProps } from './types';
import { sizes, variants, styles, defaultConfig } from './styles';

function BadgeBase({
  icon,
  emoji,
  size = defaultConfig.size,
  variant = defaultConfig.variant,
  backgroundColor,
  borderColor,
  locked = false,
  glow = false,
  style,
}: Omit<BadgeProps, 'flippable' | 'flipped' | 'onFlipEnd' | 'label'>) {
  const sizeConfig = sizes[size];
  const variantConfig = locked
    ? variants.locked
    : variants[variant as keyof typeof variants] ?? variants.default;

  const bg = backgroundColor ?? variantConfig.bg;
  const border = borderColor ?? variantConfig.border;

  const glowScale = useSharedValue(1);

  useDerivedValue(() => {
    if (glow && !locked) {
      glowScale.value = withRepeat(
        withTiming(1.2, { duration: 1500, easing: Easing.inOut(Easing.ease) }),
        -1,
        true
      );
    }
  }, [glow, locked]);

  const glowAnimatedStyle = useAnimatedStyle(
    () => ({
      transform: [{ scale: glowScale.value }],
      opacity: 0.4,
    }),
    [glowScale]
  );

  const badgeStyle = {
    width: sizeConfig.size,
    height: sizeConfig.size,
    backgroundColor: bg,
    borderColor: border,
    borderWidth: sizeConfig.borderWidth,
  };

  const glowSize = sizeConfig.size * 1.3;

  return (
    <View style={[styles.badgeWrapper, style]}>
      {glow && !locked && (
        <Animated.View
          style={[
            styles.glow,
            {
              width: glowSize,
              height: glowSize,
              backgroundColor: variantConfig.glow,
            },
            glowAnimatedStyle,
          ]}
        />
      )}
      <View style={[styles.badge, badgeStyle]}>
        {emoji ? (
          <Text style={[styles.emoji, { fontSize: sizeConfig.fontSize - 4 }]}>
            {locked ? '🔒' : emoji}
          </Text>
        ) : (
          icon
        )}
      </View>
    </View>
  );
}

export function Badge({
  label,
  flippable = false,
  flipped = false,
  onFlipEnd,
  ...props
}: BadgeProps) {
  const { locked, emoji } = props;

  if (flippable && !locked) {
    const frontEmoji = '❓';
    const backEmoji = emoji || '🏆';

    return (
      <View style={styles.container}>
        <Flip
          flipped={flipped}
          duration={600}
          front={<BadgeBase {...props} emoji={frontEmoji} glow={false} />}
          back={<BadgeBase {...props} emoji={backEmoji} glow={props.glow} />}
          onFlipEnd={onFlipEnd}
        />
        {label && <Text style={styles.label}>{label}</Text>}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <BadgeBase {...props} />
      {label && <Text style={styles.label}>{label}</Text>}
    </View>
  );
}
