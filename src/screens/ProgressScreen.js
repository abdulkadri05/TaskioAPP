import React from 'react';
import { StatusBar, StyleSheet, View, Text, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons  } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';
import ProgressStats from '../components/ProgressStats';
import { useResolutions } from '../context/ResolutionsContext';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ProgressScreen() {
  const { stats, achievementsState, resolutions } = useResolutions();

  // Calculate additional insights
  const activeGoals = resolutions.filter(r => !r.completed).length;
  const recentlyCompleted = resolutions
    .filter(r => r.completed && r.completedAt)
    .sort((a, b) => new Date(b.completedAt) - new Date(a.completedAt))
    .slice(0, 3);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />
      
      {/* Header */}
      <LinearGradient
        colors={['rgba(59, 130, 246, 0.15)', 'rgba(37, 99, 235, 0.1)']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <MaterialIcons  name="check-circle" size={32} color={COLORS.blue} />
          <View>
            <Text style={styles.title}>Progress</Text>
            <Text style={styles.subtitle}>Track your journey</Text>
          </View>
        </View>
      </LinearGradient>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Main Progress Stats */}
        <ProgressStats
          totalGoals={stats.totalGoals}
          completedCount={stats.completedGoals}
          completionRate={stats.completionRate}
          unlockedCount={achievementsState.unlockedCount}
          totalAchievements={achievementsState.totalCount}
        />

        {/* Additional Insights */}
        <View style={styles.insightsContainer}>
          <Text style={styles.sectionTitle}>Insights</Text>
          
          <View style={styles.insightGrid}>
            <View style={styles.insightCard}>
              <MaterialIcons  name="check-circle" size={24} color={COLORS.red} />
              <Text style={styles.insightValue}>{activeGoals}</Text>
              <Text style={styles.insightLabel}>Active Goals</Text>
            </View>

            <View style={styles.insightCard}>
              <MaterialIcons  name="check-circle" size={24} color={COLORS.green} />
              <Text style={styles.insightValue}>{stats.completedMilestones}</Text>
              <Text style={styles.insightLabel}>Milestones Done</Text>
            </View>
          </View>
        </View>

        {/* Recent Completions */}
        {recentlyCompleted.length > 0 && (
          <View style={styles.recentContainer}>
            <Text style={styles.sectionTitle}>Recent Wins</Text>
            {recentlyCompleted.map(goal => (
              <View key={goal.id} style={styles.recentCard}>
                <MaterialIcons  name="checkmark-circle" size={24} color={COLORS.green} />
                <View style={styles.recentInfo}>
                  <Text style={styles.recentText} numberOfLines={1}>
                    {goal.emoji ? `${goal.emoji} ` : ''}{goal.text}
                  </Text>
                  <Text style={styles.recentDate}>
                    {formatRelativeDate(goal.completedAt)}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        )}

        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

function formatRelativeDate(isoDate) {
  try {
    const date = new Date(isoDate);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  } catch {
    return '';
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '900',
    color: COLORS.text,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.textSecondary,
    fontWeight: '600',
    marginTop: 2,
  },
  insightsContainer: {
    paddingHorizontal: 20,
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.text,
    marginBottom: 16,
  },
  insightGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  insightCard: {
    flex: 1,
    backgroundColor: COLORS.cardBg,
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    gap: 8,
  },
  insightValue: {
    fontSize: 28,
    fontWeight: '900',
    color: COLORS.text,
  },
  insightLabel: {
    fontSize: 12,
    color: COLORS.textSecondary,
    fontWeight: '600',
    textAlign: 'center',
  },
  recentContainer: {
    paddingHorizontal: 20,
    marginTop: 24,
  },
  recentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    backgroundColor: COLORS.cardBg,
    borderRadius: 16,
    padding: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  recentInfo: {
    flex: 1,
  },
  recentText: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 4,
  },
  recentDate: {
    fontSize: 12,
    color: COLORS.textSecondary,
    fontWeight: '600',
  },
});