import React from 'react';
import { Pressable, StyleSheet, View as RNView, Image, ViewStyle } from 'react-native';
import { Text } from '@/components/Themed';
import { useColorScheme } from '@/components/useColorScheme';
import Colors from '@/constants/Colors';
import { FontAwesome } from '@expo/vector-icons';

export interface BuildingCardProps {
  id?: number;
  nombre: string;
  tipo?: string;
  nivelRequeridoTH?: number;
  nivelMaximo?: number;
  costoMejora?: number;
  tiempoMejoraHoras?: number;
  descripcion?: string;
  imagenUrl?: string;
  onPress?: () => void;
  style?: ViewStyle;
}

function getBuildingColor(tipo?: string): string {
  if (!tipo) return '#8B4513';
  const tipoLower = tipo.toLowerCase();
  if (tipoLower.includes('defensa') || tipoLower.includes('defense')) return '#E74C3C';
  if (tipoLower.includes('recurso') || tipoLower.includes('resource')) return '#F39C12';
  if (tipoLower.includes('tropa') || tipoLower.includes('troop')) return '#3498DB';
  return '#8B4513'; // Marrón por defecto
}

function getBuildingGradient(color: string, colorScheme: 'light' | 'dark' | null | undefined): string[] {
  const isDark = colorScheme === 'dark';
  
  if (color === '#E74C3C') {
    // Defensa - gradiente rojo
    return isDark ? ['#C0392B', '#E74C3C'] : ['#EC7063', '#E74C3C'];
  } else if (color === '#F39C12') {
    // Recurso - gradiente naranja/amarillo
    return isDark ? ['#D68910', '#F39C12'] : ['#F7DC6F', '#F39C12'];
  } else if (color === '#3498DB') {
    // Tropa - gradiente azul
    return isDark ? ['#2980B9', '#3498DB'] : ['#5DADE2', '#3498DB'];
  } else {
    // Por defecto - gradiente marrón
    return isDark ? ['#6E2C00', '#8B4513'] : ['#A0522D', '#8B4513'];
  }
}

function formatNumber(num?: number): string {
  if (!num) return '—';
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
  return String(num);
}

function formatTime(hours?: number): string {
  if (!hours) return '—';
  if (hours >= 24) {
    const d = Math.floor(hours / 24);
    const h = hours % 24;
    return h ? `${d}d ${h}h` : `${d}d`;
  }
  return `${hours}h`;
}

export function BuildingCard({
  nombre,
  tipo,
  nivelRequeridoTH,
  nivelMaximo,
  costoMejora,
  tiempoMejoraHoras,
  descripcion,
  imagenUrl,
  onPress,
  style,
}: BuildingCardProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const buildingColor = getBuildingColor(tipo);
  const gradientColors = getBuildingGradient(buildingColor, colorScheme);

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        {
          opacity: pressed ? 0.95 : 1,
          transform: [{ scale: pressed ? 0.98 : 1 }],
        },
        style,
      ]}
    >
      <RNView style={[styles.cardInner, { backgroundColor: colors.card }]}>
        {/* Header con imagen grande */}
        <RNView style={[styles.buildingHeader, { backgroundColor: gradientColors[0] + '15' }]}>
          <RNView style={styles.imageContainer}>
            {imagenUrl ? (
              <Image 
                source={{ uri: imagenUrl }} 
                style={styles.buildingImage} 
                resizeMode="contain" 
              />
            ) : (
              <RNView style={[styles.placeholderImage, { backgroundColor: gradientColors[0] + '30' }]}>
                <FontAwesome name="building" size={80} color={buildingColor} />
              </RNView>
            )}
          </RNView>
          
          {/* Badge de tipo */}
          {tipo && (
            <RNView style={[styles.typeBadge, { backgroundColor: buildingColor }]}>
              <Text style={styles.typeText}>{tipo}</Text>
            </RNView>
          )}
        </RNView>

        {/* Contenido */}
        <RNView style={styles.content}>
          <Text style={[styles.buildingName, { color: colors.text }]} numberOfLines={2}>
            {nombre}
          </Text>

          {descripcion && (
            <Text style={[styles.description, { color: colors.text + 'CC' }]} numberOfLines={3}>
              {descripcion}
            </Text>
          )}

          {/* Stats */}
          <RNView style={styles.statsContainer}>
            {nivelRequeridoTH != null && (
              <RNView style={[styles.statItem, { backgroundColor: colors.background }]}>
                <FontAwesome name="home" size={14} color={buildingColor} />
                <Text style={[styles.statText, { color: colors.text }]}>TH {nivelRequeridoTH}</Text>
              </RNView>
            )}
            {nivelMaximo != null && (
              <RNView style={[styles.statItem, { backgroundColor: colors.background }]}>
                <FontAwesome name="level-up" size={14} color={buildingColor} />
                <Text style={[styles.statText, { color: colors.text }]}>Nv. Max {nivelMaximo}</Text>
              </RNView>
            )}
            {costoMejora != null && (
              <RNView style={[styles.statItem, { backgroundColor: colors.background }]}>
                <FontAwesome name="dollar" size={14} color={buildingColor} />
                <Text style={[styles.statText, { color: colors.text }]}>{formatNumber(costoMejora)}</Text>
              </RNView>
            )}
            {tiempoMejoraHoras != null && (
              <RNView style={[styles.statItem, { backgroundColor: colors.background }]}>
                <FontAwesome name="clock-o" size={14} color={buildingColor} />
                <Text style={[styles.statText, { color: colors.text }]}>{formatTime(tiempoMejoraHoras)}</Text>
              </RNView>
            )}
          </RNView>
        </RNView>
      </RNView>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  cardInner: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  buildingHeader: {
    width: '100%',
    height: 180,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    padding: 20,
  },
  imageContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  buildingImage: {
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
  typeBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3,
  },
  typeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  content: {
    padding: 16,
    gap: 12,
  },
  buildingName: {
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 24,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    gap: 6,
  },
  statText: {
    fontSize: 13,
    fontWeight: '600',
  },
});

