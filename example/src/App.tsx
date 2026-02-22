import { Text, View, StyleSheet } from 'react-native';
import { Badge, ProgressBar, LevelBadge } from 'react-native-gamify-ui';

export default function App() {
  return (
    <View style={styles.container}>
      <LevelBadge level={5} variant="diamond" />
      <ProgressBar value={75} max={100} showPercentage />
      <Badge emoji="🏆" variant="gold" glow />
      <Text style={styles.text}>React Native Gamify UI</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
  text: {
    fontSize: 18,
    fontWeight: '600',
  },
});
