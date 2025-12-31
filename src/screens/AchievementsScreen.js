import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet, View, Text, ScrollView } from 'react-native';
import { COLORS } from '../constants/colors';
import { useResolutions } from '../context/ResolutionsContext';

export default function AchievementsScreen() {
  const { achievementsState } = useResolutions();

  const items = [...achievementsState.items].sort((a, b) => {
    if (a.unlocked !== b.unlocked) return a.unlocked ? -1 : 1;
    return b.progress - a.progress;
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />

      <View style={styles.header}>
        <Text style={styles.title}>Achievements</Text>
        <Text style={styles.subtitle}>
          {achievementsState.unlockedCount}/{achievementsState.totalCount} unlocked
        </Text>
      </View>

      <ScrollView style={styles.content}>
        {items.map(item => (
          <View key={item.id} style={[styles.card, item.unlocked ? styles.unlockedCard : styles.lockedCard]}>
            <View style={styles.row}>
              <View style={[styles.dot, item.unlocked ? styles.dotUnlocked : styles.dotLocked]} />
              <View style={styles.textBlock}>
                <Text style={[styles.cardTitle, !item.unlocked && styles.lockedText]}>{item.title}</Text>
                <Text style={[styles.cardDesc, !item.unlocked && styles.lockedText]}>{item.description}</Text>

                <View style={styles.progressTrack}>
                  <View style={[styles.progressFill, { width: `${Math.round(item.progress * 100)}%` }]} />
                </View>

                <View style={styles.metaRow}>
                  <Text style={[styles.meta, !item.unlocked && styles.lockedText]}>
                    {item.current}/{item.target}
                  </Text>
                  {item.unlocked && item.unlockedAt && (
                    <Text style={styles.unlockedAt}>
                      {formatDate(item.unlockedAt)}
                    </Text>
                  )}
                </View>
              </View>
            </View>
          </View>
        ))}

        <View style={{ height: 30 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

function formatDate(iso) {
  try {
    const d = new Date(iso);
    return d.toLocaleDateString();
  } catch {
    return '';
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: { padding: 20, borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.08)' },
  title: { fontSize: 24, fontWeight: 'bold', color: COLORS.text },
  subtitle: { marginTop: 6, color: COLORS.textSecondary },

  content: { paddingHorizontal: 16, paddingTop: 16 },

  card: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
  },
  unlockedCard: {
    backgroundColor: 'rgba(34,197,94,0.08)',
    borderColor: 'rgba(34,197,94,0.18)',
  },
  lockedCard: {
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderColor: 'rgba(255,255,255,0.08)',
  },

  row: { flexDirection: 'row', gap: 12 },
  dot: { width: 10, height: 10, borderRadius: 5, marginTop: 6 },
  dotUnlocked: { backgroundColor: COLORS.green },
  dotLocked: { backgroundColor: 'rgba(255,255,255,0.20)' },

  textBlock: { flex: 1 },
  cardTitle: { color: COLORS.text, fontSize: 16, fontWeight: '800' },
  cardDesc: { marginTop: 6, color: COLORS.textSecondary, fontSize: 13, lineHeight: 18 },
  lockedText: { opacity: 0.65 },

  progressTrack: {
    marginTop: 12,
    height: 10,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 6,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: COLORS.purple,
  },

  metaRow: { marginTop: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  meta: { color: COLORS.textSecondary, fontSize: 12 },
  unlockedAt: { color: COLORS.textSecondary, fontSize: 12, opacity: 0.9 },
});
