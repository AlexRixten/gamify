import { StyleSheet } from 'react-native';

export const defaultConfig = {
  label: 'day streak',
  size: 'md' as const,
  color: '#f97316',
  showIcon: true,
};

export const sizes = {
  sm: {
    countFontSize: 24,
    labelFontSize: 10,
    iconSize: 20,
  },
  md: {
    countFontSize: 36,
    labelFontSize: 12,
    iconSize: 28,
  },
  lg: {
    countFontSize: 48,
    labelFontSize: 14,
    iconSize: 36,
  },
};

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  count: {
    fontWeight: '800',
  },
  label: {
    fontWeight: '500',
    marginTop: 4,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  glow: {
    position: 'absolute',
    borderRadius: 999,
    opacity: 0.3,
  },
});
