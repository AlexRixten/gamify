import { StyleSheet } from 'react-native';

export const defaultConfig = {
  duration: 1000,
  size: 'lg' as const,
  color: '#1f2937',
  positiveColor: '#10b981',
  negativeColor: '#ef4444',
};

export const sizes = {
  sm: { fontSize: 16, deltaFontSize: 12 },
  md: { fontSize: 24, deltaFontSize: 16 },
  lg: { fontSize: 36, deltaFontSize: 24 },
  xl: { fontSize: 48, deltaFontSize: 32 },
};

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  value: {
    fontWeight: '700',
  },
  suffix: {
    fontWeight: '500',
    marginLeft: 4,
    opacity: 0.7,
  },
  deltaContainer: {
    position: 'absolute',
    top: -20,
    right: -30,
  },
  delta: {
    fontWeight: '700',
  },
});
