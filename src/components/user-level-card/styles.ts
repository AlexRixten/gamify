import { StyleSheet } from 'react-native';

export const sizes = {
  sm: {
    padding: 12,
    levelSize: 'md' as const,
    counterSize: 'md' as const,
  },
  md: {
    padding: 16,
    levelSize: 'lg' as const,
    counterSize: 'lg' as const,
  },
  lg: {
    padding: 20,
    levelSize: 'lg' as const,
    counterSize: 'lg' as const,
  },
};

export const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    overflow: 'hidden',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    marginLeft: 16,
  },
  levelInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  levelName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
  },
  levelNumber: {
    fontSize: 12,
    color: '#666',
  },
  progressContainer: {
    marginTop: 4,
  },
  progressLabel: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  progressText: {
    fontSize: 12,
    color: '#666',
  },
});
