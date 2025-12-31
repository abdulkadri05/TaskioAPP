import React from 'react';
import {
  StatusBar,
  StyleSheet,
  View,
  Text,
  ScrollView
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons  } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';
import { useResolutions } from '../context/ResolutionsContext';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function AchievementsScreen() {
  const { achievementsState } = useResolutions();

  const items = [...achievementsState.items].sort((a, b) => {
    if (a.unlocked !== b.unlocked) return a.unlocked ? -1 : 1;
    return b.progress - a.progress;
  });

  const getAchievementIcon = (id) => {
    if (id.includes('goal')) return 'trophy';
    if (id.includes('milestone')) return 'flag';
    if (id.includes('rate')) return 'star';
    if (id.includes('streak')) return 'flame';
    return 'ribbon';
  };

  const getAchievementColor = (id) => {
    if (id.includes('goal')) return COLORS.green;
    if (id.includes('milestone')) return COLORS.blue;
    if (id.includes('rate')) return COLORS.orange;
    if (id.includes('streak')) return COLORS.pink;
    return COLORS.purple;
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />

      {/* Header */}
      <LinearGradient
        colors={['rgba(236, 72, 153, 0.15)', 'rgba(219, 39, 119, 0.1)']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <MaterialIcons  name="dashboard" size={32} color={COLORS.pink} />
          <View style={styles.headerText}>
            <Text style={styles.title}>Achievements</Text>
            <Text style={styles.subtitle}>
              {achievementsState.unlockedCount} of {achievementsState.totalCount} unlocked
            </Text>
          </View>
        </View>
        
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                {
                  width: `${achievementsState.totalCount > 0 
                    ? Math.round((achievementsState.unlockedCount / achievementsState.totalCount) * 100) 
                    : 0}%`
                }
              ]}
            />
          </View>
        </View>
      </LinearGradient>

      {/* Achievement List */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {items.map(item => {
          const iconName = getAchievementIcon(item.id);
          const iconColor = getAchievementColor(item.id);
          
          return (
            <View key={item.id} style={[
              styles.achievementCard,
              item.unlocked && styles.unlockedCard
            ]}>
              {item.unlocked && (
                <LinearGradient
                  colors={[`${iconColor}15`, `${iconColor}08`]}
                  style={StyleSheet.absoluteFill}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                />
              )}
              
              <View style={styles.achievementContent}>
                <View style={[
                  styles.iconContainer,
                  item.unlocked && { backgroundColor: `${iconColor}20` }
                ]}>
                  <MaterialIcons 
                    name={item.unlocked ? iconName : `${iconName}-outline`}
                    size={28}
                    color={item.unlocked ? iconColor : COLORS.textTertiary}
                  />
                </View>

                <View style={styles.achievementInfo}>
                  <Text style={[
                    styles.achievementTitle,
                    !item.unlocked && styles.lockedText
                  ]}>
                    {item.title}
                  </Text>
                  <Text style={[
                    styles.achievementDescription,
                    !item.unlocked && styles.lockedText
                  ]}>
                    {item.description}
                  </Text>

                  <View style={styles.progressSection}>
                    <View style={styles.progressTrack}>
                      <View style={[
                        styles.progressBar2,
                        { 
                          width: `${Math.round(item.progress * 100)}%`,
                          backgroundColor: item.unlocked ? iconColor : COLORS.textTertiary
                        }
                      ]} />
                    </View>
                    <Text style={[
                      styles.progressText,
                      !item.unlocked && styles.lockedText
                    ]}>
                      {item.current}/{item.target}
                    </Text>
                  </View>

                  {item.unlocked && item.unlockedAt && (
                    <Text style={styles.unlockedDate}>
                      Unlocked {formatDate(item.unlockedAt)}
                    </Text>
                  )}
                </View>
              </View>
            </View>
          );
        })}

        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

function formatDate(iso) {
  try {
    const d = new Date(iso);
    const now = new Date();
    const diffMs = now - d;
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'today';
    if (diffDays === 1) return 'yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    return d.toLocaleDateString();
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
    marginBottom: 20,
  },
  headerText: {
    flex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: '900',
    color: COLORS.text,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.textSecondary,
    fontWeight: '600',
  },
  progressContainer: {
    gap: 8,
  },
  progressBar: {
    height: 12,
    backgroundColor: COLORS.border,
    borderRadius: 6,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: COLORS.pink,
    borderRadius: 6,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  achievementCard: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 20,
    padding: 18,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: 'hidden',
  },
  unlockedCard: {
    borderColor: 'rgba(16, 185, 129, 0.3)',
  },
  achievementContent: {
    flexDirection: 'row',
    gap: 16,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  achievementInfo: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: COLORS.text,
    marginBottom: 6,
  },
  achievementDescription: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 12,
    lineHeight: 20,
  },
  lockedText: {
    opacity: 0.5,
  },
  progressSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 8,
  },
  progressTrack: {
    flex: 1,
    height: 8,
    backgroundColor: COLORS.border,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBar2: {
    height: '100%',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.textSecondary,
    minWidth: 40,
  },
  unlockedDate: {
    fontSize: 12,
    color: COLORS.green,
    fontWeight: '600',
  },
});