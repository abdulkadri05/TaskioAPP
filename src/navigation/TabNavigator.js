import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import GoalsScreen from '../screens/GoalsScreen';
import ProgressScreen from '../screens/ProgressScreen';
import AchievementsScreen from '../screens/AchievementsScreen';
import { COLORS } from '../constants/colors';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: COLORS.background,
          borderTopColor: 'rgba(255,255,255,0.08)',
        },
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.textSecondary,
      }}
    >
      <Tab.Screen
        name="Goals"
        component={GoalsScreen}
        options={{ tabBarLabel: 'Goals' }}
      />
      <Tab.Screen
        name="Progress"
        component={ProgressScreen}
        options={{ tabBarLabel: 'Progress' }}
      />
      <Tab.Screen
        name="Achievements"
        component={AchievementsScreen}
        options={{ tabBarLabel: 'Achievements' }}
      />
    </Tab.Navigator>
  );
}
