import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigator from './navigation/TabNavigator';
import { ResolutionsProvider } from './context/ResolutionsContext';

export default function App() {
  return (
    <ResolutionsProvider>
      <NavigationContainer>
        <TabNavigator />
      </NavigationContainer>
    </ResolutionsProvider>
  );
}
