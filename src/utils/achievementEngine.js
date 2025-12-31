export function buildAchievementState(achievements, stats, unlocks) {
  const items = achievements.map(a => {
    const current = getCurrentValue(a, stats);
    const progress = Math.max(0, Math.min(1, a.target === 0 ? 1 : current / a.target));

    const unlockedByRule = isUnlockedByRule(a, stats, current);
    const unlockedAt = unlocks[a.id] || null;
    const unlocked = Boolean(unlockedAt) || unlockedByRule;

    return {
      ...a,
      current,
      progress,
      unlocked,
      unlockedAt,
    };
  });

  const newlyUnlockedIds = items
    .filter(i => i.unlocked && !unlocks[i.id])
    .map(i => i.id);

  const unlockedCount = items.filter(i => i.unlocked).length;

  return {
    items,
    unlockedCount,
    totalCount: items.length,
    newlyUnlockedIds,
  };
}

function getCurrentValue(achievement, stats) {
  if (achievement.type === 'completedGoals') return stats.completedGoals;
  if (achievement.type === 'completedMilestones') return stats.completedMilestones;
  if (achievement.type === 'completionRate') return stats.completionRate;
  if (achievement.type === 'streak') return stats.streak;
  return 0;
}

function isUnlockedByRule(achievement, stats, current) {
  if (achievement.requiresGoals && stats.totalGoals <= 0) return false;
  return current >= achievement.target;
}
