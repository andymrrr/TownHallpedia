import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';

import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={24} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        tabBarInactiveTintColor: Colors[colorScheme ?? 'light'].tabIconDefault,
        headerShown: useClientOnlyValue(false, true),
        tabBarStyle: {
          backgroundColor: Colors[colorScheme ?? 'light'].background,
          borderTopColor: Colors[colorScheme ?? 'light'].cardBorder,
        },
      }}
    >
      <Tabs.Screen
        name="ayuntamientos/index"
        options={{
          title: 'Ayuntamientos',
          tabBarLabel: 'Ayuntamientos',
          tabBarIcon: ({ color }) => <TabBarIcon name="building" color={color} />,
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="heroes/index"
        options={{
          title: 'Héroes',
          tabBarLabel: 'Héroes',
          tabBarIcon: ({ color }) => <TabBarIcon name="star" color={color} />,
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="hechizos/index"
        options={{
          title: 'Hechizos',
          tabBarLabel: 'Hechizos',
          tabBarIcon: ({ color }) => <TabBarIcon name="magic" color={color} />,
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="buscar/index"
        options={{
          title: 'Buscar',
          tabBarLabel: 'Buscar',
          tabBarIcon: ({ color }) => <TabBarIcon name="search" color={color} />,
          headerShown: false,
        }}
      />
    </Tabs>
  );
}
