import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet, View, Text } from 'react-native';
import { COLORS } from '../constants/colors';
import ProgressStats from '../components/ProgressStats';
import { useResolutions } from '../context/ResolutionsContext';

export default function ProgressScreen() {
  const { stats, achievementsState } = useResolutions();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />
      <View style={styles.header}>
        <Text style={styles.title}>Progress</Text>
        <Text style={styles.subtitle}>Keep it honest. Keep it moving.</Text>
      </View>

      <ProgressStats
        totalGoals={stats.totalGoals}
        completedCount={stats.completedGoals}
        completionRate={stats.completionRate}
        unlockedCount={achievementsState.unlockedCount}
        totalAchievements={achievementsState.totalCount}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: { padding: 20, borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.08)' },
  title: { fontSize: 24, fontWeight: 'bold', color: COLORS.text },
  subtitle: { marginTop: 6, color: COLORS.textSecondary },
});
