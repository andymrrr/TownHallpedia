import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import { Pressable, View, StyleSheet } from 'react-native';

import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
  centered?: boolean;
}) {
  if (props.centered) {
    return <FontAwesome size={28} {...props} />;
  }
  return <FontAwesome size={24} style={{ marginBottom: -3 }} {...props} />;
}

function CenteredTabBarButton({ children, onPress }: { children: React.ReactNode; onPress: () => void }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.centeredTabButton,
        pressed && styles.centeredTabButtonPressed,
      ]}
    >
      {children}
    </Pressable>
  );
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
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
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
        name="buscar/index"
        options={{
          title: 'Buscar',
          tabBarLabel: '',
          tabBarIcon: ({ color }) => <TabBarIcon name="search" color={color} centered />,
          tabBarButton: (props) => (
            <CenteredTabBarButton onPress={props.onPress}>
              <View style={styles.centeredIconContainer}>
                <FontAwesome 
                  name="search" 
                  size={28} 
                  color={props.accessibilityState?.selected 
                    ? Colors[colorScheme ?? 'light'].tint 
                    : Colors[colorScheme ?? 'light'].tabIconDefault} 
                />
              </View>
            </CenteredTabBarButton>
          ),
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
        name="edificios/index"
        options={{
          title: 'Edificios',
          tabBarLabel: 'Edificios',
          tabBarIcon: ({ color }) => <TabBarIcon name="building" color={color} />,
          headerShown: false,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  centeredTabButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    paddingTop: 8,
  },
  centeredTabButtonPressed: {
    opacity: 0.7,
  },
  centeredIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50,
    borderRadius: 25,
  },
});
