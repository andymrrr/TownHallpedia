import React from 'react';
import { StyleSheet, Pressable, ViewStyle, View as RNView, Image, ImageSourcePropType } from 'react-native';
import { Text } from '../Themed';
import { useColorScheme } from '../useColorScheme';
import Colors from '@/constants/Colors';
import { FontAwesome } from '@expo/vector-icons';
import { getTownHallImage, getPlaceholderImageUrl } from './townHallImages';

export interface TownHallData {
  nivel: number;
  capacidadAlmacenOro?: number;
  capacidadAlmacenElixir?: number;
  capacidadAlmacenOscuro?: number;
  tiempoConstruccionHoras?: number;
  costoMejora?: number;
  tipoRecurso?: string;
  portada?: string;
}

interface TownHallCardProps {
  nivel: number;
  capacidadOro?: number;
  capacidadElixir?: number;
  capacidadOscuro?: number;
  tiempoConstruccion?: number;
  costoMejora?: number;
  tipoRecurso?: string;
  imagenUrl?: string;
  onPress?: () => void;
  style?: ViewStyle;
}

export default function TownHallCard({
  nivel,
  capacidadOro,
  capacidadElixir,
  capacidadOscuro,
  tiempoConstruccion,
  costoMejora,
  tipoRecurso,
  imagenUrl,
  onPress,
  style,
}: TownHallCardProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const formatNumber = (num?: number) => {
    if (!num) return 'N/A';
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const formatTime = (hours?: number) => {
    if (!hours) return 'N/A';
    if (hours >= 24) {
      const days = Math.floor(hours / 24);
      const remainingHours = hours % 24;
      if (remainingHours === 0) return `${days}d`;
      return `${days}d ${remainingHours}h`;
    }
    return `${hours}h`;
  };

  // Color del badge según el nivel (gradiente de colores)
  const getLevelColor = (nivel: number) => {
    if (nivel <= 5) return '#4A90E2'; // Azul para niveles bajos
    if (nivel <= 10) return '#FF6B35'; // Naranja para niveles medios
    return '#FFD700'; // Dorado para niveles altos
  };

  const levelColor = getLevelColor(nivel);
  const imageSource = imagenUrl 
    ? { uri: imagenUrl }
    : getTownHallImage(nivel, imagenUrl) || { uri: getPlaceholderImageUrl(nivel) };

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        {
          backgroundColor: colors.card,
          borderColor: colors.cardBorder,
          borderLeftWidth: 4,
          borderLeftColor: levelColor,
          opacity: pressed ? 0.8 : 1,
          transform: [{ scale: pressed ? 0.98 : 1 }],
        },
        style,
      ]}
    >
      <RNView style={styles.contentContainer}>
        {/* Imagen del Ayuntamiento */}
        <RNView style={[styles.imageContainer, { backgroundColor: colors.background }]}>
          <Image
            source={imageSource}
            style={styles.townHallImage}
            resizeMode="contain"
          />
        </RNView>

        <RNView style={styles.infoContainer}>
          {/* Header con badge y título */}
          <RNView style={styles.header}>
            <RNView style={[styles.levelBadge, { backgroundColor: levelColor + '20' }]}>
              <Text style={[styles.levelText, { color: levelColor }]}>TH{nivel}</Text>
            </RNView>
            <Text style={[styles.title, { color: colors.text }]} numberOfLines={1}>
              Ayuntamiento Nivel {nivel}
            </Text>
          </RNView>

          {/* Información de capacidades */}
          {(capacidadOro || capacidadElixir || capacidadOscuro) && (
            <RNView style={styles.section}>
              <Text style={[styles.sectionTitle, { color: colors.text + 'CC' }]}>
                Capacidad de Almacenamiento
              </Text>
              <RNView style={styles.statsRow}>
                {capacidadOro && (
                  <RNView style={styles.statItem}>
                    <FontAwesome name="dollar" size={14} color="#FFD700" />
                    <Text style={[styles.statText, { color: colors.text }]}>
                      {formatNumber(capacidadOro)}
                    </Text>
                  </RNView>
                )}
                {capacidadElixir && (
                  <RNView style={styles.statItem}>
                    <FontAwesome name="tint" size={14} color="#9B59B6" />
                    <Text style={[styles.statText, { color: colors.text }]}>
                      {formatNumber(capacidadElixir)}
                    </Text>
                  </RNView>
                )}
                {capacidadOscuro && (
                  <RNView style={styles.statItem}>
                    <FontAwesome name="circle" size={14} color="#34495E" />
                    <Text style={[styles.statText, { color: colors.text }]}>
                      {formatNumber(capacidadOscuro)}
                    </Text>
                  </RNView>
                )}
              </RNView>
            </RNView>
          )}

          {/* Información de mejora */}
          {(costoMejora || tiempoConstruccion) && (
            <RNView style={styles.section}>
              <Text style={[styles.sectionTitle, { color: colors.text + 'CC' }]}>
                Información de Mejora
              </Text>
              <RNView style={styles.infoRow}>
                {costoMejora && (
                  <RNView style={styles.infoItem}>
                    <FontAwesome name="coins" size={12} color={colors.tint} />
                    <Text style={[styles.infoText, { color: colors.text }]} numberOfLines={1}>
                      {formatNumber(costoMejora)} {tipoRecurso || 'Oro'}
                    </Text>
                  </RNView>
                )}
                {tiempoConstruccion && (
                  <RNView style={styles.infoItem}>
                    <FontAwesome name="clock-o" size={12} color={colors.tint} />
                    <Text style={[styles.infoText, { color: colors.text }]}>
                      {formatTime(tiempoConstruccion)}
                    </Text>
                  </RNView>
                )}
              </RNView>
            </RNView>
          )}
        </RNView>
      </RNView>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  contentContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  imageContainer: {
    width: 90,
    height: 90,
    borderRadius: 8,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  townHallImage: {
    width: '100%',
    height: '100%',
  },
  infoContainer: {
    flex: 1,
    gap: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  levelBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  levelText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
  },
  section: {
    gap: 6,
  },
  sectionTitle: {
    fontSize: 10,
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  statsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statText: {
    fontSize: 12,
    fontWeight: '500',
  },
  infoRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  infoText: {
    fontSize: 11,
  },
});

