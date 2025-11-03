import { Stack, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Image, ImageSourcePropType, Pressable } from 'react-native';
import { Text } from '@/components/Themed';
import AppHeader from '@/components/common/header/AppHeader';
import { useColorScheme } from '@/components/useColorScheme';
import Colors from '@/constants/Colors';
import { FontAwesome } from '@expo/vector-icons';
import { getTownHallImage, getPlaceholderImageUrl } from '@/features/ayuntamientos/components/TownHallCard/utils/townHallImages';
import { formatNumber, formatTimeHours, getLevelColor } from '@/features/ayuntamientos/components/TownHallCard/utils/townHallUtils';

// Datos de demo - luego se reemplazarán con datos del backend
const getDemoData = (nivel: number) => {
  const base = nivel * 100000;
  return {
    nivel,
    capacidadOro: base * 2,
    capacidadElixir: base * 2,
    capacidadOscuro: base * 0.5,
    tiempoConstruccion: nivel * 24,
    costoMejora: base * 10,
    tipoRecurso: nivel <= 5 ? 'Oro' : 'Elixir',
    imagenUrl: undefined,
    heroes: [
      { id: 1, nombre: 'Rey Bárbaro', nivel: nivel },
      { id: 2, nombre: 'Reina Arquera', nivel: nivel + 1 },
    ].slice(0, Math.min(nivel, 2)),
    hechizos: [
      { id: 1, nombre: 'Rayo', nivel: nivel },
      { id: 2, nombre: 'Curación', nivel: nivel },
      { id: 3, nombre: 'Ira', nivel: nivel + 1 },
    ].slice(0, Math.min(nivel * 2, 5)),
    tropas: [
      { id: 1, nombre: 'Bárbaro', nivel: nivel },
      { id: 2, nombre: 'Arquero', nivel: nivel },
      { id: 3, nombre: 'Gigante', nivel: nivel + 1 },
      { id: 4, nombre: 'Goblin', nivel: nivel },
      { id: 5, nombre: 'Globo', nivel: nivel + 2 },
    ].slice(0, Math.min(nivel * 2, 8)),
  };
};

type TabType = 'info' | 'desbloqueos';

export default function AyuntamientoDetailScreen() {
  const { nivel } = useLocalSearchParams<{ nivel: string }>();
  const nivelNum = parseInt(nivel || '1', 10);
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const demoData = getDemoData(nivelNum);
  const levelColor = getLevelColor(nivelNum);
  const [activeTab, setActiveTab] = useState<TabType>('info');

  const imageSource: ImageSourcePropType = demoData.imagenUrl
    ? { uri: demoData.imagenUrl }
    : (getTownHallImage(nivelNum, demoData.imagenUrl) as ImageSourcePropType) || { uri: getPlaceholderImageUrl(nivelNum) };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Stack.Screen 
        options={{ 
          title: `Ayuntamiento ${nivelNum}`,
          headerShown: false,
        }} 
      />
      <AppHeader 
        title="Ayuntamiento" 
        subtitle={`Nivel ${nivelNum}`}
        variant="compact" 
        showBackButton={true}
      />
      
      {/* Tabs */}
      <View style={[styles.tabsContainer, { backgroundColor: colors.card, borderBottomColor: colors.cardBorder }]}>
        <TabButton
          label="Información"
          icon="info-circle"
          isActive={activeTab === 'info'}
          onPress={() => setActiveTab('info')}
          colors={colors}
        />
        <TabButton
          label="Desbloqueos"
          icon="unlock"
          isActive={activeTab === 'desbloqueos'}
          onPress={() => setActiveTab('desbloqueos')}
          colors={colors}
          badge={demoData.heroes.length + demoData.tropas.length + demoData.hechizos.length}
        />
      </View>

      <ScrollView 
        style={styles.scrollView} 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {activeTab === 'info' ? (
          <>
            {/* Hero Image Section */}
            <View style={[styles.heroSection, { backgroundColor: colors.card }]}>
              <View style={[styles.imageWrapper, { backgroundColor: colors.background }]}>
                <Image
                  source={imageSource}
                  style={styles.heroImage}
                  resizeMode="contain"
                />
                <View style={[styles.levelBadge, { backgroundColor: levelColor + '20' }]}>
                  <View style={[styles.levelBadgeInner, { backgroundColor: levelColor }]}>
                    <Text style={styles.levelBadgeText}>Nv. {nivelNum}</Text>
                  </View>
                </View>
              </View>
            </View>

            {/* Capacidades Section */}
            <View style={[styles.section, { backgroundColor: colors.card }]}>
              <View style={styles.sectionHeader}>
                <FontAwesome name="database" size={20} color={colors.tint} />
                <Text style={[styles.sectionTitle, { color: colors.text }]}>Capacidades de Almacenamiento</Text>
              </View>
              
              <View style={styles.statsGrid}>
                <StatCard
                  icon="money"
                  label="Oro"
                  value={formatNumber(demoData.capacidadOro)}
                  color="#FFD700"
                  colors={colors}
                />
                <StatCard
                  icon="tint"
                  label="Elixir"
                  value={formatNumber(demoData.capacidadElixir)}
                  color="#E63946"
                  colors={colors}
                />
                <StatCard
                  icon="fire"
                  label="Oscuro"
                  value={formatNumber(demoData.capacidadOscuro)}
                  color="#7209B7"
                  colors={colors}
                />
              </View>
            </View>

            {/* Información de Mejora */}
            <View style={[styles.section, { backgroundColor: colors.card }]}>
              <View style={styles.sectionHeader}>
                <FontAwesome name="arrow-up" size={20} color={colors.tint} />
                <Text style={[styles.sectionTitle, { color: colors.text }]}>Información de Mejora</Text>
              </View>

              <InfoRow
                icon="clock-o"
                label="Tiempo de Construcción"
                value={formatTimeHours(demoData.tiempoConstruccion)}
                colors={colors}
              />
              <InfoRow
                icon="dollar"
                label="Costo de Mejora"
                value={formatNumber(demoData.costoMejora)}
                colors={colors}
              />
              <InfoRow
                icon="tag"
                label="Tipo de Recurso"
                value={demoData.tipoRecurso || 'N/A'}
                colors={colors}
              />
            </View>

            {/* Características */}
            <View style={[styles.section, { backgroundColor: colors.card }]}>
              <View style={styles.sectionHeader}>
                <FontAwesome name="star" size={20} color={colors.tint} />
                <Text style={[styles.sectionTitle, { color: colors.text }]}>Características</Text>
              </View>
              
              <FeatureItem
                icon="shield"
                text="Edificio principal del pueblo"
                colors={colors}
              />
              <FeatureItem
                icon="home"
                text={`Desbloquea nuevas construcciones`}
                colors={colors}
              />
              <FeatureItem
                icon="users"
                text={`Aumenta el límite de tropas`}
                colors={colors}
              />
            </View>
          </>
        ) : (
          <DesbloqueosTab
            heroes={demoData.heroes}
            tropas={demoData.tropas}
            hechizos={demoData.hechizos}
            colors={colors}
          />
        )}
      </ScrollView>
    </View>
  );
}

interface TabButtonProps {
  label: string;
  icon: string;
  isActive: boolean;
  onPress: () => void;
  colors: any;
  badge?: number;
}

const TabButton: React.FC<TabButtonProps> = ({ label, icon, isActive, onPress, colors, badge }) => (
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

interface DesbloqueosTabProps {
  heroes: Array<{ id: number; nombre: string; nivel: number }>;
  tropas: Array<{ id: number; nombre: string; nivel: number }>;
  hechizos: Array<{ id: number; nombre: string; nivel: number }>;
  colors: any;
}

const DesbloqueosTab: React.FC<DesbloqueosTabProps> = ({ heroes, tropas, hechizos, colors }) => {
  const [activeSubTab, setActiveSubTab] = useState<'heroes' | 'tropas' | 'hechizos'>('heroes');

  return (
    <>
      {/* Sub-tabs para desbloqueos */}
      <View style={[styles.subTabsContainer, { backgroundColor: colors.card }]}>
        <SubTabButton
          label="Héroes"
          icon="user-circle"
          count={heroes.length}
          isActive={activeSubTab === 'heroes'}
          onPress={() => setActiveSubTab('heroes')}
          color="#FF6B35"
          colors={colors}
        />
        <SubTabButton
          label="Tropas"
          icon="users"
          count={tropas.length}
          isActive={activeSubTab === 'tropas'}
          onPress={() => setActiveSubTab('tropas')}
          color="#4A90E2"
          colors={colors}
        />
        <SubTabButton
          label="Hechizos"
          icon="magic"
          count={hechizos.length}
          isActive={activeSubTab === 'hechizos'}
          onPress={() => setActiveSubTab('hechizos')}
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
  items: Array<{ id: number; nombre: string; nivel: number }>;
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

interface StatCardProps {
  icon: string;
  label: string;
  value: string;
  color: string;
  colors: any;
}

const StatCard: React.FC<StatCardProps> = ({ icon, label, value, color, colors }) => (
  <View style={[styles.statCard, { backgroundColor: colors.background, borderColor: colors.cardBorder }]}>
    <View style={[styles.statIconContainer, { backgroundColor: color + '20' }]}>
      <FontAwesome name={icon as any} size={24} color={color} />
    </View>
    <Text style={[styles.statValue, { color: colors.text }]}>{value}</Text>
    <Text style={[styles.statLabel, { color: colors.text + '99' }]}>{label}</Text>
  </View>
);

interface InfoRowProps {
  icon: string;
  label: string;
  value: string;
  colors: any;
}

const InfoRow: React.FC<InfoRowProps> = ({ icon, label, value, colors }) => (
  <View style={[styles.infoRow, { borderBottomColor: colors.cardBorder }]}>
    <View style={styles.infoRowLeft}>
      <FontAwesome name={icon as any} size={16} color={colors.tint} />
      <Text style={[styles.infoLabel, { color: colors.text + 'CC' }]}>{label}</Text>
    </View>
    <Text style={[styles.infoValue, { color: colors.text }]}>{value}</Text>
  </View>
);

interface FeatureItemProps {
  icon: string;
  text: string;
  colors: any;
}

const FeatureItem: React.FC<FeatureItemProps> = ({ icon, text, colors }) => (
  <View style={styles.featureItem}>
    <FontAwesome name={icon as any} size={16} color={colors.tint} />
    <Text style={[styles.featureText, { color: colors.text + 'CC' }]}>{text}</Text>
  </View>
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
  container: {
    flex: 1,
  },
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  heroSection: {
    marginHorizontal: 20,
    marginTop: 16,
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  imageWrapper: {
    width: '100%',
    height: 180,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  levelBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    borderRadius: 20,
    padding: 4,
  },
  levelBadgeInner: {
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  levelBadgeText: {
    color: '#FFFFFF',
    fontSize: 14,
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
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'space-between',
  },
  statCard: {
    flex: 1,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
  },
  statIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    fontWeight: '500',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  infoRowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  infoLabel: {
    fontSize: 15,
    fontWeight: '500',
  },
  infoValue: {
    fontSize: 15,
    fontWeight: '700',
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 10,
  },
  featureText: {
    fontSize: 15,
    flex: 1,
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
