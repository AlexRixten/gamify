import { View, Text } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
  useDerivedValue,
} from 'react-native-reanimated';
import type { LevelBadgeProps, LevelBadgeVariant, LevelBadgeSize } from './types';
import { defaultConfig, sizes, variantStyles, styles } from './styles';

export function LevelBadge({
  level,
  variant = defaultConfig.variant,
  size = defaultConfig.size,
  backgroundColor = defaultConfig.backgroundColor,
  textColor = defaultConfig.textColor,
  borderColor = defaultConfig.borderColor,
  glow = false,
  label = defaultConfig.label,
  showLabel = defaultConfig.showLabel,
  style,
}: LevelBadgeProps) {
  const sizeConfig = sizes[size];
  const variantStyle = variantStyles[variant];

  const glowScale = useSharedValue(1);

  useDerivedValue(() => {
    if (glow) {
      glowScale.value = withRepeat(
        withTiming(1.2, { duration: 1500, easing: Easing.inOut(Easing.ease) }),
        -1,
        true
      );
    }
  }, [glow]);

  const glowAnimatedStyle = useAnimatedStyle(
    () => ({
      transform: [{ scale: glowScale.value }],
    }),
    [glowScale]
  );

  const isDiamond = variant === 'diamond';

  const badgeStyle = {
    width: sizeConfig.width,
    height: sizeConfig.height,
    backgroundColor,
    borderColor,
    ...variantStyle,
  };

  const glowSize = Math.max(sizeConfig.width, sizeConfig.height) * 1.4;

  const content = (
    <View style={[styles.container, badgeStyle, style]}>
      <View style={styles.content}>
        {showLabel && (
          <Text
            style={[
              styles.label,
              {
                fontSize: sizeConfig.labelFontSize,
                color: textColor,
                opacity: 0.8,
              },
            ]}
          >
            {label}
          </Text>
        )}
        <Text
          style={[
            styles.level,
            {
              fontSize: sizeConfig.fontSize,
              color: textColor,
            },
          ]}
        >
          {level}
        </Text>
      </View>
    </View>
  );

  if (glow) {
    return (
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Animated.View
          style={[
            styles.glow,
            {
              width: glowSize,
              height: glowSize,
              backgroundColor,
              opacity: 0.3,
            },
            glowAnimatedStyle,
          ]}
        />
        {content}
      </View>
    );
  }

  return content;
}
