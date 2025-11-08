import React from 'react';
import { View, StyleSheet, Pressable, Image, ImageSourcePropType } from 'react-native';
import { Text } from '@/components/Themed';
import { FontAwesome } from '@expo/vector-icons';
import { useColorScheme } from '@/components/useColorScheme';
import Colors from '@/constants/Colors';
import { DesbloqueoItem } from '../interfaces';

interface AyuntamientoDetailDesbloqueosProps {
  heroes: DesbloqueoItem[];
  tropas: DesbloqueoItem[];
  hechizos: DesbloqueoItem[];
  animales: DesbloqueoItem[];
  activeSubTab: 'heroes' | 'tropas' | 'hechizos' | 'animales';
  onSubTabChange: (tab: 'heroes' | 'tropas' | 'hechizos' | 'animales') => void;
}

export const AyuntamientoDetailDesbloqueos: React.FC<AyuntamientoDetailDesbloqueosProps> = ({
  heroes,
  tropas,
  hechizos,
  animales,
  activeSubTab,
  onSubTabChange,
}) => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  // Colores mejorados para cada categoría
  const categoryColors = {
    heroes: '#FF6B35', // Naranja (sin cambios)
    tropas: '#4A90E2', // Azul (sin cambios)
    hechizos: '#00B4D8', // Azul claro/ciano (cambió del morado)
    animales: '#10B981', // Verde esmeralda
  };

  const getCurrentItems = () => {
    switch (activeSubTab) {
      case 'heroes':
        return heroes;
      case 'tropas':
        return tropas;
      case 'hechizos':
        return hechizos;
      case 'animales':
        return animales;
      default:
        return [];
    }
  };

  const getCurrentCount = () => {
    switch (activeSubTab) {
      case 'heroes':
        return heroes.length;
      case 'tropas':
        return tropas.length;
      case 'hechizos':
        return hechizos.length;
      case 'animales':
        return animales.length;
      default:
        return 0;
    }
  };

  const currentItems = getCurrentItems();
  const currentColor = categoryColors[activeSubTab];

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
          color={categoryColors.heroes}
          colors={colors}
        />
        <SubTabButton
          label="Tropas"
          icon="users"
          count={tropas.length}
          isActive={activeSubTab === 'tropas'}
          onPress={() => onSubTabChange('tropas')}
          color={categoryColors.tropas}
          colors={colors}
        />
        <SubTabButton
          label="Hechizos"
          icon="magic"
          count={hechizos.length}
          isActive={activeSubTab === 'hechizos'}
          onPress={() => onSubTabChange('hechizos')}
          color={categoryColors.hechizos}
          colors={colors}
        />
        <SubTabButton
          label="Animales"
          icon="paw"
          count={animales.length}
          isActive={activeSubTab === 'animales'}
          onPress={() => onSubTabChange('animales')}
          color={categoryColors.animales}
          colors={colors}
        />
      </View>

      {/* Contenido según sub-tab activo */}
      {currentItems.length > 0 ? (
        <View style={styles.gridContainer}>
          {currentItems.map((item) => (
            <UnlockCard
              key={item.id}
              item={item}
              color={currentColor}
              colors={colors}
            />
          ))}
        </View>
      ) : (
        <View style={[styles.emptyState, { backgroundColor: colors.card }]}>
          <FontAwesome name="inbox" size={48} color={colors.text + '40'} />
          <Text style={[styles.emptyText, { color: colors.text + '99' }]}>
            No hay elementos desbloqueados en este nivel
          </Text>
        </View>
      )}
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

interface UnlockCardProps {
  item: DesbloqueoItem;
  color: string;
  colors: any;
}

const UnlockCard: React.FC<UnlockCardProps> = ({ item, color, colors }) => {
  const nivelMinimo = item.nivelMinimo ?? item.nivel ?? 1;
  const nivelMaximo = item.nivelMaximo ?? item.nivel ?? 1;
  const esNuevoDesbloqueo = item.esNuevoDesbloqueo ?? false;
  const tieneRango = nivelMinimo !== nivelMaximo;
  
  // Texto para mostrar el rango de niveles
  const textoNiveles = tieneRango 
    ? `Niv. ${nivelMinimo}-${nivelMaximo}` 
    : `Niv. ${nivelMinimo}`;

  // Preparar la imagen
  const imageSource: ImageSourcePropType | null = item.imagenUrl 
    ? { uri: item.imagenUrl }
    : null;

  return (
    <View style={[styles.card, { backgroundColor: colors.card }]}>
      {/* Imagen de la entidad */}
      <View style={[styles.imageContainer, { backgroundColor: color + '15' }]}>
        {imageSource ? (
          <Image
            source={imageSource}
            style={styles.entityImage}
            resizeMode="contain"
          />
        ) : (
          <View style={[styles.placeholderImage, { backgroundColor: color + '30' }]}>
            <FontAwesome name="image" size={32} color={color + '80'} />
          </View>
        )}
        {esNuevoDesbloqueo && (
          <View style={[styles.newBadge, { backgroundColor: '#4CAF50' }]}>
            <FontAwesome name="star" size={10} color="#FFFFFF" />
          </View>
        )}
      </View>

      {/* Información de la entidad */}
      <View style={styles.cardInfo}>
        <View style={styles.cardHeader}>
          <Text style={[styles.cardNombre, { color: colors.text }]} numberOfLines={2}>
            {item.nombre}
          </Text>
          {esNuevoDesbloqueo && (
            <View style={[styles.newLabel, { backgroundColor: '#4CAF50' }]}>
              <Text style={styles.newLabelText}>NUEVO</Text>
            </View>
          )}
        </View>
        
        <View style={[styles.levelBadge, { backgroundColor: color + '20' }]}>
          <Text style={[styles.levelBadgeText, { color: color }]}>
            {textoNiveles}
          </Text>
        </View>
      </View>
    </View>
  );
};

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
    fontSize: 12,
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
    fontSize: 10,
    fontWeight: '700',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: 20,
    marginTop: 16,
    gap: 12,
    paddingBottom: 20,
  },
  card: {
    width: '47%', // 2 columnas con gap
    borderRadius: 16,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    overflow: 'hidden',
  },
  imageContainer: {
    width: '100%',
    height: 120,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    position: 'relative',
    overflow: 'hidden',
  },
  entityImage: {
    width: '100%',
    height: '100%',
  },
  placeholderImage: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
  },
  newBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3,
  },
  cardInfo: {
    gap: 8,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 6,
  },
  cardNombre: {
    fontSize: 14,
    fontWeight: '600',
    flex: 1,
    lineHeight: 18,
  },
  newLabel: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  newLabelText: {
    color: '#FFFFFF',
    fontSize: 8,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  levelBadge: {
    alignSelf: 'flex-start',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  levelBadgeText: {
    fontSize: 12,
    fontWeight: '700',
  },
  emptyState: {
    marginHorizontal: 20,
    marginTop: 16,
    borderRadius: 16,
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    marginTop: 16,
    fontSize: 15,
    textAlign: 'center',
  },
});
