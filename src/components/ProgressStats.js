import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { COLORS } from '../constants/colors';

export default function ProgressStats({
  totalGoals,
  completedCount,
  completionRate,
  unlockedCount,
  totalAchievements
}) {
  const animatedWidth = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animatedWidth, {
      toValue: completionRate,
      duration: 550,
      useNativeDriver: false,
    }).start();
  }, [completionRate]);

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Overview</Text>

        <View style={styles.grid}>
          <View style={styles.item}>
            <Text style={styles.value}>{totalGoals}</Text>
            <Text style={styles.label}>Total goals</Text>
          </View>
          <View style={styles.item}>
            <Text style={[styles.value, { color: COLORS.green }]}>{completedCount}</Text>
            <Text style={styles.label}>Completed</Text>
          </View>
          <View style={styles.item}>
            <Text style={[styles.value, { color: COLORS.blue }]}>{completionRate}%</Text>
            <Text style={styles.label}>Rate</Text>
          </View>
        </View>

        <View style={styles.barTrack}>
          <Animated.View
            style={[
              styles.barFill,
              {
                width: animatedWidth.interpolate({
                  inputRange: [0, 100],
                  outputRange: ['0%', '100%'],
                }),
              },
            ]}
          />
        </View>
      </View>

      <View style={styles.cardAlt}>
        <Text style={styles.title}>Achievements</Text>
        <Text style={styles.small}>
          {unlockedCount}/{totalAchievements} unlocked
        </Text>

        <View style={styles.miniTrack}>
          <View style={[styles.miniFill, { width: `${totalAchievements > 0 ? Math.round((unlockedCount / totalAchievements) * 100) : 0}%` }]} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  card: {
    backgroundColor: 'rgba(147,51,234,0.18)',
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: 'rgba(147,51,234,0.22)',
    marginBottom: 14,
  },
  cardAlt: {
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  title: { fontSize: 16, fontWeight: '800', color: COLORS.text, marginBottom: 12 },
  grid: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 14 },
  item: { alignItems: 'center' },
  value: { fontSize: 30, fontWeight: '900', color: COLORS.primary },
  label: { marginTop: 4, fontSize: 12, color: COLORS.textSecondary },

  barTrack: {
    height: 12,
    backgroundColor: 'rgba(255,255,255,0.10)',
    borderRadius: 6,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    backgroundColor: COLORS.purple,
  },

  small: { color: COLORS.textSecondary, marginBottom: 10 },
  miniTrack: {
    height: 10,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 6,
    overflow: 'hidden',
  },
  miniFill: {
    height: '100%',
    backgroundColor: COLORS.green,
  },
});
