import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import {
  loadResolutions,
  saveResolutions,
  loadStreak,
  saveStreak,
  loadAchievementUnlocks,
  saveAchievementUnlocks
} from '../utils/storage';
import { buildAchievementState } from '../utils/achievementEngine';
import { ACHIEVEMENTS } from '../data/achievements';

const ResolutionsContext = createContext(null);

export function ResolutionsProvider({ children }) {
  const [resolutions, setResolutions] = useState([]);
  const [streak, setStreak] = useState(0);
  const [activeCategory, setActiveCategory] = useState('all');
  const [achievementUnlocks, setAchievementUnlocks] = useState({});

  useEffect(() => {
    loadAll();
  }, []);

  useEffect(() => {
    saveResolutions(resolutions);

    const completed = resolutions.filter(r => r.completed).length;
    if (completed > streak) {
      setStreak(completed);
      saveStreak(completed);
    }
  }, [resolutions]);

  useEffect(() => {
    saveAchievementUnlocks(achievementUnlocks);
  }, [achievementUnlocks]);

  const loadAll = async () => {
    const savedResolutions = await loadResolutions();
    const savedStreak = await loadStreak();
    const savedUnlocks = await loadAchievementUnlocks();

    if (savedResolutions) setResolutions(savedResolutions);
    if (savedStreak) setStreak(savedStreak);
    if (savedUnlocks) setAchievementUnlocks(savedUnlocks);
  };

  const addResolution = (text) => {
    const resolution = {
      id: Date.now(),
      text,
      completed: false,
      createdAt: new Date().toISOString(),
      completedAt: null,
      image: null,
      milestones: [],
      emoji: null,
      category: 'general',
    };
    setResolutions([resolution, ...resolutions]);
  };

  const toggleComplete = (id) => {
    setResolutions(resolutions.map(r =>
      r.id === id ? {
        ...r,
        completed: !r.completed,
        completedAt: !r.completed ? new Date().toISOString() : null
      } : r
    ));
  };

  const deleteResolution = (id) => {
    setResolutions(resolutions.filter(r => r.id !== id));
  };

  const updateResolutionImage = (id, imageUri) => {
    setResolutions(resolutions.map(r =>
      r.id === id ? { ...r, image: imageUri } : r
    ));
  };

  const toggleEmoji = (id) => {
    setResolutions(resolutions.map(r =>
      r.id === id
        ? { ...r, emoji: r.emoji ? null : '•' }
        : r
    ));
  };

  const addMilestone = (id, milestoneText) => {
    setResolutions(resolutions.map(r =>
      r.id === id ? {
        ...r,
        milestones: [...(r.milestones || []), {
          text: milestoneText,
          completed: false,
          id: Date.now()
        }]
      } : r
    ));
  };

  const toggleMilestone = (resId, milestoneId) => {
    setResolutions(resolutions.map(r =>
      r.id === resId ? {
        ...r,
        milestones: r.milestones.map(m =>
          m.id === milestoneId ? { ...m, completed: !m.completed } : m
        )
      } : r
    ));
  };

  const stats = useMemo(() => {
    const totalGoals = resolutions.length;
    const completedGoals = resolutions.filter(r => r.completed).length;

    const allMilestones = resolutions.flatMap(r => (r.milestones || []));
    const totalMilestones = allMilestones.length;
    const completedMilestones = allMilestones.filter(m => m.completed).length;

    const completionRate = totalGoals > 0
      ? Math.round((completedGoals / totalGoals) * 100)
      : 0;

    return {
      totalGoals,
      completedGoals,
      completionRate,
      totalMilestones,
      completedMilestones,
      streak,
    };
  }, [resolutions, streak]);

  const achievementsState = useMemo(() => {
    const state = buildAchievementState(ACHIEVEMENTS, stats, achievementUnlocks);

    if (state.newlyUnlockedIds.length > 0) {
      const now = new Date().toISOString();
      const nextUnlocks = { ...achievementUnlocks };

      state.newlyUnlockedIds.forEach(id => {
        if (!nextUnlocks[id]) nextUnlocks[id] = now;
      });

      setAchievementUnlocks(nextUnlocks);
    }

    return state;
  }, [stats, achievementUnlocks]);

  const filteredResolutions =
    activeCategory === 'all'
      ? resolutions
      : resolutions.filter(r => r.category === activeCategory);

  const value = {
    resolutions,
    filteredResolutions,
    setResolutions,
    streak,
    activeCategory,
    setActiveCategory,
    addResolution,
    toggleComplete,
    deleteResolution,
    updateResolutionImage,
    addMilestone,
    toggleMilestone,
    toggleEmoji,
    stats,
    achievementsState,
    achievementUnlocks,
  };

  return (
    <ResolutionsContext.Provider value={value}>
      {children}
    </ResolutionsContext.Provider>
  );
}

export function useResolutions() {
  const ctx = useContext(ResolutionsContext);
  if (!ctx) throw new Error('useResolutions must be used inside ResolutionsProvider');
  return ctx;
}
