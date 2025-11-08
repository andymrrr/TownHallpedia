import React from 'react';
import { Pressable, StyleSheet, View as RNView, Image, ViewStyle } from 'react-native';
import { Text } from '@/components/Themed';
import { useColorScheme } from '@/components/useColorScheme';
import Colors from '@/constants/Colors';
import { FontAwesome } from '@expo/vector-icons';

export type SpellType = 'Elixir' | 'Oscuro' | 'Super';

export interface SpellCardProps {
  nombre: string;
  tipo: SpellType;
  nivelRequerido?: number;
  costoMejora?: number;
  tiempoMejoraHoras?: number;
  descripcion?: string;
  imagenUrl?: string;
  onPress?: () => void;
  style?: ViewStyle;
}

function getSpellColor(tipo: SpellType): string {
  switch (tipo) {
    case 'Oscuro':
      return '#8E44AD';
    case 'Super':
      return '#E67E22';
    case 'Elixir':
    default:
      return '#3498DB';
  }
}

function getSpellGradient(color: string, colorScheme: 'light' | 'dark' | null | undefined): string[] {
  const isDark = colorScheme === 'dark';
  const baseColor = color;
  
  if (baseColor === '#8E44AD') {
    // Oscuro - gradiente morado
    return isDark ? ['#6A1B9A', '#8E44AD'] : ['#9B59B6', '#8E44AD'];
  } else if (baseColor === '#E67E22') {
    // Super - gradiente naranja
    return isDark ? ['#D35400', '#E67E22'] : ['#F39C12', '#E67E22'];
  } else {
    // Elixir - gradiente azul
    return isDark ? ['#2980B9', '#3498DB'] : ['#5DADE2', '#3498DB'];
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

export function SpellCard({
  nombre,
  tipo,
  nivelRequerido,
  costoMejora,
  tiempoMejoraHoras,
  descripcion,
  imagenUrl,
  onPress,
  style,
}: SpellCardProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const typeColor = getSpellColor(tipo);
  const gradientColors = getSpellGradient(typeColor, colorScheme);

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
        <RNView style={[styles.spellHeader, { backgroundColor: gradientColors[0] + '15' }]}>
          <RNView style={styles.imageContainer}>
            {imagenUrl ? (
              <Image 
                source={{ uri: imagenUrl }} 
                style={styles.spellImage} 
                resizeMode="contain" 
              />
            ) : (
              <RNView style={[styles.placeholderImage, { backgroundColor: gradientColors[0] + '30' }]}>
                <FontAwesome name="magic" size={80} color={typeColor} />
              </RNView>
            )}
          </RNView>
          
          {/* Badge de tipo */}
          <RNView style={[styles.typeBadge, { backgroundColor: typeColor }]}>
            <Text style={styles.typeText}>{tipo}</Text>
          </RNView>
        </RNView>

        {/* Contenido */}
        <RNView style={styles.content}>
          <Text style={[styles.spellName, { color: colors.text }]} numberOfLines={2}>
            {nombre}
          </Text>

          {descripcion && (
            <Text style={[styles.description, { color: colors.text + 'CC' }]} numberOfLines={3}>
              {descripcion}
            </Text>
          )}

          {/* Stats */}
          <RNView style={styles.statsContainer}>
            {nivelRequerido != null && (
              <RNView style={[styles.statItem, { backgroundColor: colors.background }]}>
                <FontAwesome name="home" size={14} color={typeColor} />
                <Text style={[styles.statText, { color: colors.text }]}>TH {nivelRequerido}</Text>
              </RNView>
            )}
            {costoMejora != null && (
              <RNView style={[styles.statItem, { backgroundColor: colors.background }]}>
                <FontAwesome name="dollar" size={14} color={typeColor} />
                <Text style={[styles.statText, { color: colors.text }]}>{formatNumber(costoMejora)}</Text>
              </RNView>
            )}
            {tiempoMejoraHoras != null && (
              <RNView style={[styles.statItem, { backgroundColor: colors.background }]}>
                <FontAwesome name="clock-o" size={14} color={typeColor} />
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
  spellHeader: {
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
  spellImage: {
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
  spellName: {
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


