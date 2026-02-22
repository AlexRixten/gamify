import { StyleSheet } from 'react-native';

export const defaultConfig = {
  status: 'locked' as const,
  rewardLabel: 'XP',
};

export const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  cardLocked: {
    opacity: 0.7,
    backgroundColor: '#f9fafb',
  },
  cardNew: {
    borderColor: '#fbbf24',
    borderWidth: 2,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  iconLocked: {
    backgroundColor: '#e5e7eb',
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  titleLocked: {
    color: '#9ca3af',
  },
  description: {
    fontSize: 13,
    color: '#6b7280',
    lineHeight: 18,
  },
  reward: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  rewardText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6366f1',
    marginLeft: 4,
  },
  progressContainer: {
    marginTop: 12,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#e5e7eb',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#6366f1',
    borderRadius: 2,
  },
  progressText: {
    fontSize: 11,
    color: '#9ca3af',
    marginTop: 4,
  },
  newBadge: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: '#fbbf24',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  newBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#78350f',
  },
  compact: {
    padding: 12,
  },
  compactIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
});
