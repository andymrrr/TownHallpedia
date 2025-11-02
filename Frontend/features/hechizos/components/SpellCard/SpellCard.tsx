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

  const typeColor = tipo === 'Oscuro' ? '#8E44AD' : tipo === 'Super' ? '#E67E22' : '#3498DB';

  const formatNumber = (num?: number) => {
    if (!num) return '—';
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return String(num);
  };

  const formatTime = (hours?: number) => {
    if (!hours) return '—';
    if (hours >= 24) {
      const d = Math.floor(hours / 24);
      const h = hours % 24;
      return h ? `${d}d ${h}h` : `${d}d`;
    }
    return `${hours}h`;
  };

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        {
          backgroundColor: colors.card,
          borderColor: colors.cardBorder,
          opacity: pressed ? 0.9 : 1,
          transform: [{ scale: pressed ? 0.99 : 1 }],
        },
        style,
      ]}
    >
      <RNView style={styles.row}>
        <RNView style={[styles.thumb, { borderColor: colors.cardBorder }]}> 
          {imagenUrl ? (
            <Image source={{ uri: imagenUrl }} style={styles.image} resizeMode="contain" />
          ) : (
            <FontAwesome name="magic" size={28} color={typeColor} />
          )}
        </RNView>

        <RNView style={styles.content}>
          <RNView style={styles.header}>
            <RNView style={[styles.typeBadge, { backgroundColor: typeColor + '22' }]}> 
              <Text style={[styles.typeText, { color: typeColor }]}>{tipo}</Text>
            </RNView>
            <Text style={[styles.title, { color: colors.text }]} numberOfLines={1}>{nombre}</Text>
          </RNView>

          {descripcion ? (
            <Text style={[styles.description, { color: colors.text + 'B3' }]} numberOfLines={2}>
              {descripcion}
            </Text>
          ) : null}

          <RNView style={styles.metaRow}>
            {nivelRequerido != null && (
              <RNView style={styles.metaItem}>
                <FontAwesome name="level-up" size={12} color={colors.tint} />
                <Text style={[styles.metaText, { color: colors.text }]}>TH {nivelRequerido}</Text>
              </RNView>
            )}
            {costoMejora != null && (
              <RNView style={styles.metaItem}>
                <FontAwesome name="coins" size={12} color={colors.tint} />
                <Text style={[styles.metaText, { color: colors.text }]}>{formatNumber(costoMejora)}</Text>
              </RNView>
            )}
            {tiempoMejoraHoras != null && (
              <RNView style={styles.metaItem}>
                <FontAwesome name="clock-o" size={12} color={colors.tint} />
                <Text style={[styles.metaText, { color: colors.text }]}>{formatTime(tiempoMejoraHoras)}</Text>
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
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 2,
    elevation: 2,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  thumb: {
    width: 56,
    height: 56,
    borderRadius: 10,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  content: {
    flex: 1,
    gap: 8,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  typeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  typeText: {
    fontSize: 11,
    fontWeight: '600',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
  },
  description: {
    fontSize: 12,
    lineHeight: 18,
  },
  metaRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: 12,
    fontWeight: '500',
  },
});


