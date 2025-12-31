import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';

import GoalsScreen from '../screens/GoalsScreen';
import ProgressScreen from '../screens/ProgressScreen';
import AchievementsScreen from '../screens/AchievementsScreen';
import { COLORS } from '../constants/colors';

const Tab = createBottomTabNavigator();

// Explicit, safe icon mapping (no runtime guessing)
const ICONS = {
  Goals: {
    active: 'check-circle',
    inactive: 'radio-button-unchecked',
  },
  Progress: {
    active: 'insights',
    inactive: 'bar-chart',
  },
  Achievements: {
    active: 'emoji-events',
    inactive: 'emoji-events',
  },
};

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,

        tabBarLabelStyle: {
          fontSize: 12,
          marginBottom: 4,
          fontWeight: '900',
        },
        tabBarStyle: {
          paddingTop: 8,
          paddingBottom: 16,
          backgroundColor: 'rgba(44, 1, 61, 0.86)',
        },

        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.textSecondary,

        tabBarIcon: ({ color, focused }) => {
          const iconSet = ICONS[route.name];
          const iconName = focused ? iconSet.active : iconSet.inactive;

          return (
            <MaterialIcons
              name={iconName}
              size={22}
              color={color}
            />
          );
        },
      })}
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
