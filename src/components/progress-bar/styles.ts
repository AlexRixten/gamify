import { StyleSheet } from 'react-native';

export const defaultConfig = {
  max: 100,
  height: 12,
  borderRadius: 6,
  trackColor: '#e5e7eb',
  progressColor: '#6366f1',
  duration: 500,
} as const;

export const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  track: {
    overflow: 'hidden',
  },
  progress: {
    height: '100%',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
  },
  value: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6b7280',
  },
  percentage: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  percentageText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#fff',
  },
});
