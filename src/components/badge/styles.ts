import { StyleSheet } from 'react-native';

export const defaultConfig = {
  size: 'md' as const,
  variant: 'default' as const,
};

export const sizes = {
  sm: { size: 40, fontSize: 18, borderWidth: 2 },
  md: { size: 56, fontSize: 24, borderWidth: 3 },
  lg: { size: 80, fontSize: 36, borderWidth: 4 },
  xl: { size: 100, fontSize: 44, borderWidth: 5 },
};

export const variants = {
  default: {
    bg: '#6366f1',
    border: '#4f46e5',
    glow: 'rgba(99, 102, 241, 0.5)',
  },
  gold: { bg: '#fbbf24', border: '#d97706', glow: 'rgba(251, 191, 36, 0.5)' },
  silver: {
    bg: '#9ca3af',
    border: '#6b7280',
    glow: 'rgba(156, 163, 175, 0.5)',
  },
  bronze: { bg: '#d97706', border: '#b45309', glow: 'rgba(217, 119, 6, 0.5)' },
  locked: { bg: '#e5e7eb', border: '#d1d5db', glow: 'transparent' },
};

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  badgeWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  badge: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 999,
  },
  lockedOverlay: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  lockIcon: {
    fontSize: 16,
    opacity: 0.7,
  },
  label: {
    marginTop: 8,
    fontSize: 12,
    fontWeight: '600',
    color: '#374151',
    textAlign: 'center',
  },
  glow: {
    position: 'absolute',
    borderRadius: 999,
    opacity: 0.6,
  },
  emoji: {
    textAlign: 'center',
  },
});
