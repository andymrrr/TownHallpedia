import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { Text } from '@/components/Themed';
import { FontAwesome } from '@expo/vector-icons';
import { useColorScheme } from '@/components/useColorScheme';
import Colors from '@/constants/Colors';
import { DesbloqueoItem } from '../interfaces';

interface AyuntamientoDetailDesbloqueosProps {
  heroes: DesbloqueoItem[];
  tropas: DesbloqueoItem[];
  hechizos: DesbloqueoItem[];
  activeSubTab: 'heroes' | 'tropas' | 'hechizos';
  onSubTabChange: (tab: 'heroes' | 'tropas' | 'hechizos') => void;
}

export const AyuntamientoDetailDesbloqueos: React.FC<AyuntamientoDetailDesbloqueosProps> = ({
  heroes,
  tropas,
  hechizos,
  activeSubTab,
  onSubTabChange,
}) => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  return (
    <>
      {/* Sub-tabs para desbloqueos */}
      <View style={[styles.subTabsContainer, { backgroundColor: colors.card }]}>
        <SubTabButton
          label="Héroes"
          icon="user-circle"
          count={heroes.length}
          isActive={activeSubTab === 'heroes'}
          onPress={() => onSubTabChange('heroes')}
          color="#FF6B35"
          colors={colors}
        />
        <SubTabButton
          label="Tropas"
          icon="users"
          count={tropas.length}
          isActive={activeSubTab === 'tropas'}
          onPress={() => onSubTabChange('tropas')}
          color="#4A90E2"
          colors={colors}
        />
        <SubTabButton
          label="Hechizos"
          icon="magic"
          count={hechizos.length}
          isActive={activeSubTab === 'hechizos'}
          onPress={() => onSubTabChange('hechizos')}
          color="#7209B7"
          colors={colors}
        />
      </View>

      {/* Contenido según sub-tab activo */}
      <View style={[styles.section, { backgroundColor: colors.card }]}>
        {activeSubTab === 'heroes' && heroes.length > 0 && (
          <UnlockList items={heroes} icon="star" color="#FF6B35" colors={colors} />
        )}
        {activeSubTab === 'tropas' && tropas.length > 0 && (
          <UnlockList items={tropas} icon="shield" color="#4A90E2" colors={colors} />
        )}
        {activeSubTab === 'hechizos' && hechizos.length > 0 && (
          <UnlockList items={hechizos} icon="bolt" color="#7209B7" colors={colors} />
        )}
        {((activeSubTab === 'heroes' && heroes.length === 0) ||
          (activeSubTab === 'tropas' && tropas.length === 0) ||
          (activeSubTab === 'hechizos' && hechizos.length === 0)) && (
          <View style={styles.emptyState}>
            <FontAwesome name="inbox" size={48} color={colors.text + '40'} />
            <Text style={[styles.emptyText, { color: colors.text + '99' }]}>
              No hay elementos desbloqueados en este nivel
            </Text>
          </View>
        )}
      </View>
    </>
  );
};

interface SubTabButtonProps {
  label: string;
  icon: string;
  count: number;
  isActive: boolean;
  onPress: () => void;
  color: string;
  colors: any;
}

const SubTabButton: React.FC<SubTabButtonProps> = ({ label, icon, count, isActive, onPress, color, colors }) => (
  <Pressable
    onPress={onPress}
    style={[
      styles.subTabButton,
      isActive && { backgroundColor: color + '20', borderBottomColor: color },
    ]}
  >
    <FontAwesome name={icon as any} size={16} color={isActive ? color : colors.text + '99'} />
    <Text style={[styles.subTabLabel, { color: isActive ? color : colors.text + '99' }]}>
      {label}
    </Text>
    <View style={[styles.subTabBadge, { backgroundColor: isActive ? color : colors.text + '40' }]}>
      <Text style={styles.subTabBadgeText}>{count}</Text>
    </View>
  </Pressable>
);

interface UnlockListProps {
  items: DesbloqueoItem[];
  icon: string;
  color: string;
  colors: any;
}

const UnlockList: React.FC<UnlockListProps> = ({ items, icon, color, colors }) => (
  <>
    {items.map((item, index) => (
      <UnlockItem
        key={item.id}
        nombre={item.nombre}
        nivel={item.nivel}
        icon={icon}
        color={color}
        colors={colors}
        isLast={index === items.length - 1}
      />
    ))}
  </>
);

interface UnlockItemProps {
  nombre: string;
  nivel: number;
  icon: string;
  color: string;
  colors: any;
  isLast?: boolean;
}

const UnlockItem: React.FC<UnlockItemProps> = ({ nombre, nivel, icon, color, colors, isLast }) => (
  <View style={[styles.unlockItem, !isLast && { borderBottomColor: colors.cardBorder }]}>
    <View style={[styles.unlockIconContainer, { backgroundColor: color + '20' }]}>
      <FontAwesome name={icon as any} size={16} color={color} />
    </View>
    <View style={styles.unlockInfo}>
      <Text style={[styles.unlockNombre, { color: colors.text }]}>{nombre}</Text>
      <Text style={[styles.unlockNivel, { color: colors.text + '99' }]}>Nivel {nivel}</Text>
    </View>
    <View style={[styles.unlockBadge, { backgroundColor: color + '20' }]}>
      <Text style={[styles.unlockBadgeText, { color: color }]}>Nv. {nivel}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  subTabsContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginTop: 16,
    borderRadius: 12,
    padding: 4,
    gap: 4,
  },
  subTabButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 8,
    gap: 6,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  subTabLabel: {
    fontSize: 13,
    fontWeight: '600',
  },
  subTabBadge: {
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    paddingHorizontal: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  subTabBadgeText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
  },
  section: {
    marginHorizontal: 20,
    marginTop: 16,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  unlockItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    gap: 12,
  },
  unlockIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  unlockInfo: {
    flex: 1,
  },
  unlockNombre: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 2,
  },
  unlockNivel: {
    fontSize: 13,
    fontWeight: '400',
  },
  unlockBadge: {
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  unlockBadgeText: {
    fontSize: 12,
    fontWeight: '700',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    marginTop: 16,
    fontSize: 15,
    textAlign: 'center',
  },
});

