import { StyleSheet } from 'react-native';

export const defaultConfig = {
  variant: 'circle' as const,
  size: 'md' as const,
  backgroundColor: '#6366f1',
  textColor: '#fff',
  borderColor: '#4f46e5',
  label: 'LVL',
  showLabel: true,
};

export const sizes = {
  sm: {
    width: 32,
    height: 32,
    fontSize: 14,
    labelFontSize: 8,
  },
  md: {
    width: 48,
    height: 48,
    fontSize: 20,
    labelFontSize: 10,
  },
  lg: {
    width: 64,
    height: 64,
    fontSize: 28,
    labelFontSize: 12,
  },
};

export const variantStyles = {
  circle: {
    borderRadius: 999,
  },
  shield: {
    borderRadius: 8,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  hexagon: {
    borderRadius: 4,
    transform: [{ rotate: '0deg' }],
  },
  diamond: {
    borderRadius: 8,
    transform: [{ rotate: '45deg' }],
  },
};

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  level: {
    fontWeight: '800',
  },
  label: {
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  glow: {
    position: 'absolute',
    borderRadius: 999,
  },
});
