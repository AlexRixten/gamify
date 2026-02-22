import { StyleSheet } from 'react-native';

export const defaultConfig = {
  scoreLabel: 'pts',
};

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 12,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
    borderWidth: 1,
    borderColor: '#f3f4f6',
  },
  currentUser: {
    backgroundColor: '#eef2ff',
    borderColor: '#6366f1',
    borderWidth: 2,
  },
  topThree: {
    shadowOpacity: 0.1,
  },
  rankContainer: {
    width: 32,
    alignItems: 'center',
    marginRight: 12,
  },
  rank: {
    fontSize: 18,
    fontWeight: '700',
    color: '#6b7280',
  },
  rankGold: {
    color: '#fbbf24',
  },
  rankSilver: {
    color: '#9ca3af',
  },
  rankBronze: {
    color: '#d97706',
  },
  rankBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rankBadgeGold: {
    backgroundColor: '#fef3c7',
  },
  rankBadgeSilver: {
    backgroundColor: '#f3f4f6',
  },
  rankBadgeBronze: {
    backgroundColor: '#fef3c7',
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  avatarText: {
    fontSize: 24,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1f2937',
  },
  level: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 2,
  },
  scoreContainer: {
    alignItems: 'flex-end',
  },
  score: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1f2937',
  },
  scoreLabel: {
    fontSize: 11,
    color: '#9ca3af',
  },
  rankChange: {
    marginTop: 2,
  },
  rankChangeUp: {
    color: '#10b981',
  },
  rankChangeDown: {
    color: '#ef4444',
  },
  crown: {
    position: 'absolute',
    top: -8,
    left: -4,
  },
  compact: {
    padding: 8,
    marginBottom: 4,
  },
  compactAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  compactAvatarText: {
    fontSize: 16,
  },
});
