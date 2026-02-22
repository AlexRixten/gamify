import { View, Text, TouchableOpacity } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withDelay,
  useDerivedValue,
} from 'react-native-reanimated';
import { LeaderboardItem } from '../leaderboard-item';
import type { LeaderboardCardProps, LeaderboardEntry } from './types';
import { styles } from './styles';

const AnimatedView = Animated.createAnimatedComponent(View);

function AnimatedLeaderboardItem({
  entry,
  index,
  compact,
}: {
  entry: LeaderboardEntry;
  index: number;
  compact: boolean;
}) {
  const translateY = useSharedValue(20);
  const opacity = useSharedValue(0);

  useDerivedValue(() => {
    const delay = index * 80;
    translateY.value = withDelay(delay, withSpring(0, { damping: 12 }));
    opacity.value = withDelay(delay, withSpring(1));
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
    opacity: opacity.value,
  }), []);

  return (
    <AnimatedView style={animatedStyle}>
      <LeaderboardItem
        rank={entry.rank}
        name={entry.name}
        avatarEmoji={entry.avatarEmoji}
        score={entry.score}
        level={entry.level}
        isCurrentUser={entry.isCurrentUser}
        rankChange={entry.rankChange}
        compact={compact}
      />
    </AnimatedView>
  );
}

export function LeaderboardCard({
  entries,
  currentUserId,
  title = 'Leaderboard',
  compact = false,
  maxEntries = 5,
  style,
  onEntryPress,
}: LeaderboardCardProps) {
  const displayEntries = entries.slice(0, maxEntries);
  const currentUserEntry = entries.find((e) => e.id === currentUserId || e.isCurrentUser);

  return (
    <View style={[styles.card, style]}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{entries.length} participants</Text>
        </View>
        <Text style={{ fontSize: 24 }}>🏆</Text>
      </View>

      <View style={styles.list}>
        {displayEntries.map((entry, index) => (
          <TouchableOpacity
            key={entry.id}
            onPress={() => onEntryPress?.(entry)}
            activeOpacity={0.7}
          >
            <AnimatedLeaderboardItem
              entry={entry}
              index={index}
              compact={compact}
            />
          </TouchableOpacity>
        ))}
      </View>

      {currentUserEntry && !displayEntries.includes(currentUserEntry) && (
        <View style={{ padding: 8, borderTopWidth: 1, borderTopColor: '#f0f0f0' }}>
          <LeaderboardItem
            rank={currentUserEntry.rank}
            name={currentUserEntry.name}
            avatarEmoji={currentUserEntry.avatarEmoji}
            score={currentUserEntry.score}
            level={currentUserEntry.level}
            isCurrentUser
            rankChange={currentUserEntry.rankChange}
            compact={compact}
          />
        </View>
      )}

      <TouchableOpacity style={styles.footer}>
        <Text style={styles.seeAll}>See all rankings</Text>
      </TouchableOpacity>
    </View>
  );
}
