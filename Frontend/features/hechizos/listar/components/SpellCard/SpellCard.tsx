import React from 'react';
import { Pressable, StyleSheet, View as RNView, ViewStyle } from 'react-native';
import { Text } from '@/components/Themed';
import { useColorScheme } from '@/components/useColorScheme';
import Colors from '@/constants/Colors';
import { FontAwesome } from '@expo/vector-icons';
import { ImageWithFallback } from '@/components/common';
import { EntityType } from '@/utils/images';

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
  const baseColor = color;
  
  // Gradientes estilo PlayStation Store - más sutiles y oscuros
  if (baseColor === '#8E44AD') {
    // Oscuro - gradiente morado
    return [baseColor + '25', baseColor + '10'];
  } else if (baseColor === '#E67E22') {
    // Super - gradiente naranja
    return [baseColor + '25', baseColor + '10'];
  } else {
    // Elixir - gradiente azul (usar azul PS)
    return ['#0070F325', '#0070F310'];
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
            <ImageWithFallback
              imageUrl={imagenUrl}
              entityType={EntityType.HECHIZO}
              style={styles.spellImage}
              placeholderIconColor={typeColor}
              placeholderBackgroundColor={gradientColors[0] + '30'}
              placeholderIconSize={80}
            />
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
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 12,
  },
  cardInner: {
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#2a2a2a',
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
    borderWidth: 1,
    borderColor: '#2a2a2a',
  },
  statText: {
    fontSize: 13,
    fontWeight: '600',
  },
});


