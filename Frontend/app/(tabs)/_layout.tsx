import React from 'react';
import { Tabs } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';
import {
  PSTabButton,
  TabBarBackground,
  TabIcon,
  TABS_CONFIG,
  getTabBarStyle,
  TAB_BAR_CONSTANTS,
} from '@/components/layout/tabs';

export default function TabLayout() {
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: TAB_BAR_CONSTANTS.COLORS.ACTIVE,
        tabBarInactiveTintColor: TAB_BAR_CONSTANTS.COLORS.ACTIVE,
        headerShown: useClientOnlyValue(false, true),
        tabBarShowLabel: false,
        tabBarStyle: getTabBarStyle(insets.bottom),
        tabBarBackground: TabBarBackground,
      }}
    >
      {TABS_CONFIG.map((tab) => (
        <Tabs.Screen
          key={tab.name}
          name={tab.name}
          options={{
            title: tab.title,
            tabBarIcon: ({ focused }) => (
              <TabIcon name={tab.iconName} focused={focused} />
            ),
            tabBarButton: (props) => (
              <PSTabButton {...props} label={tab.label} />
            ),
            headerShown: false,
          }}
        />
      ))}
    </Tabs>
  );
}
