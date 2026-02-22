import { StyleSheet } from 'react-native';

export const sizes = {
  sm: {
    cardPadding: 16,
    iconSize: 32,
    countSize: 28,
    labelSize: 12,
    milestoneSize: 24,
  },
  md: {
    cardPadding: 20,
    iconSize: 40,
    countSize: 36,
    labelSize: 14,
    milestoneSize: 32,
  },
  lg: {
    cardPadding: 24,
    iconSize: 48,
    countSize: 44,
    labelSize: 16,
    milestoneSize: 40,
  },
};

export const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
    overflow: 'hidden',
  },
  content: {
    alignItems: 'center',
  },
  streakRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  icon: {
    marginRight: 8,
  },
  count: {
    fontWeight: '700',
    color: '#333',
  },
  label: {
    color: '#666',
    textAlign: 'center',
  },
  milestonesContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  milestone: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
  },
  milestoneText: {
    fontWeight: '600',
    fontSize: 12,
  },
});
