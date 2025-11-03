import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { Text } from '@/components/Themed';
import { FontAwesome } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';

interface TabButtonProps {
  label: string;
  icon: string;
  isActive: boolean;
  onPress: () => void;
  badge?: number;
}

export const AyuntamientoDetailTabs: React.FC<{
  activeTab: 'info' | 'desbloqueos';
  onTabChange: (tab: 'info' | 'desbloqueos') => void;
  desbloqueosCount: number;
}> = ({ activeTab, onTabChange, desbloqueosCount }) => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  return (
    <View style={[styles.tabsContainer, { backgroundColor: colors.card, borderBottomColor: colors.cardBorder }]}>
      <TabButton
        label="Información"
        icon="info-circle"
        isActive={activeTab === 'info'}
        onPress={() => onTabChange('info')}
      />
      <TabButton
        label="Desbloqueos"
        icon="unlock"
        isActive={activeTab === 'desbloqueos'}
        onPress={() => onTabChange('desbloqueos')}
        badge={desbloqueosCount}
      />
    </View>
  );
};

const TabButton: React.FC<TabButtonProps> = ({ label, icon, isActive, onPress, badge }) => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.tabButton,
        isActive && { borderBottomColor: colors.tint, borderBottomWidth: 2 },
      ]}
    >
      <FontAwesome name={icon as any} size={16} color={isActive ? colors.tint : colors.text + '99'} />
      <Text style={[styles.tabLabel, { color: isActive ? colors.tint : colors.text + '99' }]}>
        {label}
      </Text>
      {badge !== undefined && badge > 0 && (
        <View style={[styles.badge, { backgroundColor: colors.tint }]}>
          <Text style={styles.badgeText}>{badge}</Text>
        </View>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  tabsContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    paddingHorizontal: 20,
  },
  tabButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    gap: 8,
    position: 'relative',
  },
  tabLabel: {
    fontSize: 15,
    fontWeight: '600',
  },
  badge: {
    position: 'absolute',
    top: 8,
    right: 8,
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    paddingHorizontal: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
  },
});

