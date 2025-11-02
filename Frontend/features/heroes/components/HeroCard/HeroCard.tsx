import React from 'react';
import { Pressable, StyleSheet, View as RNView, Image, ViewStyle } from 'react-native';
import { Text } from '@/components/Themed';
import { useColorScheme } from '@/components/useColorScheme';
import Colors from '@/constants/Colors';
import { FontAwesome } from '@expo/vector-icons';

export type HeroRole = 'Tanque' | 'Ofensivo' | 'Soporte';

export interface HeroCardProps {
  nombre: string;
  rol: HeroRole;
  nivelRequeridoTH?: number;
  danoPorSegundo?: number;
  vida?: number;
  habilidad?: string;
  descripcion?: string;
  iconoUrl?: string;
  onPress?: () => void;
  style?: ViewStyle;
}

export function HeroCard({
  nombre,
  rol,
  nivelRequeridoTH,
  danoPorSegundo,
  vida,
  habilidad,
  descripcion,
  iconoUrl,
  onPress,
  style,
}: HeroCardProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const roleColor = rol === 'Tanque' ? '#2ECC71' : rol === 'Ofensivo' ? '#E74C3C' : '#3498DB';

  const formatNumber = (num?: number) => {
    if (!num) return '—';
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return String(num);
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
          {iconoUrl ? (
            <Image source={{ uri: iconoUrl }} style={styles.image} resizeMode="contain" />
          ) : (
            <FontAwesome name="user" size={28} color={roleColor} />
          )}
        </RNView>

        <RNView style={styles.content}>
          <RNView style={styles.header}>
            <RNView style={[styles.roleBadge, { backgroundColor: roleColor + '22' }]}> 
              <Text style={[styles.roleText, { color: roleColor }]}>{rol}</Text>
            </RNView>
            <Text style={[styles.title, { color: colors.text }]} numberOfLines={1}>{nombre}</Text>
          </RNView>

          {descripcion ? (
            <Text style={[styles.description, { color: colors.text + 'B3' }]} numberOfLines={2}>
              {descripcion}
            </Text>
          ) : null}

          <RNView style={styles.metaRow}>
            {nivelRequeridoTH != null && (
              <RNView style={styles.metaItem}>
                <FontAwesome name="home" size={12} color={colors.tint} />
                <Text style={[styles.metaText, { color: colors.text }]}>TH {nivelRequeridoTH}</Text>
              </RNView>
            )}
            {danoPorSegundo != null && (
              <RNView style={styles.metaItem}>
                <FontAwesome name="bolt" size={12} color={colors.tint} />
                <Text style={[styles.metaText, { color: colors.text }]}>{formatNumber(danoPorSegundo)} dps</Text>
              </RNView>
            )}
            {vida != null && (
              <RNView style={styles.metaItem}>
                <FontAwesome name="heart" size={12} color={colors.tint} />
                <Text style={[styles.metaText, { color: colors.text }]}>{formatNumber(vida)}</Text>
              </RNView>
            )}
            {habilidad && (
              <RNView style={styles.metaItem}>
                <FontAwesome name="star" size={12} color={colors.tint} />
                <Text style={[styles.metaText, { color: colors.text }]} numberOfLines={1}>{habilidad}</Text>
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
  roleBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  roleText: {
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


