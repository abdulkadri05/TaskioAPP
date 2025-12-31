import AsyncStorage from '@react-native-async-storage/async-storage';

const RESOLUTIONS_KEY = '@resolutions';
const STREAK_KEY = '@streak';
const ACHIEVEMENT_UNLOCKS_KEY = '@achievement_unlocks';

export const saveResolutions = async (resolutions) => {
  try {
    await AsyncStorage.setItem(RESOLUTIONS_KEY, JSON.stringify(resolutions));
  } catch (error) {
    console.error('Error saving resolutions:', error);
  }
};

export const loadResolutions = async () => {
  try {
    const data = await AsyncStorage.getItem(RESOLUTIONS_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error loading resolutions:', error);
    return [];
  }
};

export const saveStreak = async (streak) => {
  try {
    await AsyncStorage.setItem(STREAK_KEY, streak.toString());
  } catch (error) {
    console.error('Error saving streak:', error);
  }
};

export const loadStreak = async () => {
  try {
    const data = await AsyncStorage.getItem(STREAK_KEY);
    return data ? parseInt(data) : 0;
  } catch (error) {
    console.error('Error loading streak:', error);
    return 0;
  }
};

export const saveAchievementUnlocks = async (unlocks) => {
  try {
    await AsyncStorage.setItem(ACHIEVEMENT_UNLOCKS_KEY, JSON.stringify(unlocks || {}));
  } catch (error) {
    console.error('Error saving achievement unlocks:', error);
  }
};

export const loadAchievementUnlocks = async () => {
  try {
    const data = await AsyncStorage.getItem(ACHIEVEMENT_UNLOCKS_KEY);
    return data ? JSON.parse(data) : {};
  } catch (error) {
    console.error('Error loading achievement unlocks:', error);
    return {};
  }
};
