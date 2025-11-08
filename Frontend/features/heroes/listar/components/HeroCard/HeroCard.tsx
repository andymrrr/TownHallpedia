import React from 'react';
import { Pressable, View as RNView, Image, ViewStyle } from 'react-native';
import { Text } from '@/components/Themed';
import { useColorScheme } from '@/components/useColorScheme';
import Colors from '@/constants/Colors';
import { FontAwesome } from '@expo/vector-icons';
import { HeroCardProps } from './types';
import { formatNumber, getRoleColor, getHeroGradient } from './utils';
import { styles } from './styles/styles';

export function HeroCard({
  id,
  nombre,
  rol,
  nivelRequeridoTH,
  nivelMaximo,
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

  const defaultRol = rol || 'Soporte';
  const roleColor = getRoleColor(defaultRol);
  const gradientColors = getHeroGradient(roleColor, colorScheme);

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
        <RNView style={[styles.heroHeader, { backgroundColor: gradientColors[0] + '15' }]}>
          <RNView style={styles.imageContainer}>
            {iconoUrl ? (
              <Image 
                source={{ uri: iconoUrl }} 
                style={styles.heroImage} 
                resizeMode="contain" 
              />
            ) : (
              <RNView style={[styles.placeholderImage, { backgroundColor: gradientColors[0] + '30' }]}>
                <FontAwesome name="user-circle" size={80} color={roleColor} />
              </RNView>
            )}
          </RNView>
          
          {/* Badge de rol */}
          <RNView style={[styles.roleBadge, { backgroundColor: roleColor }]}>
            <Text style={styles.roleText}>{defaultRol}</Text>
          </RNView>
        </RNView>

        {/* Contenido */}
        <RNView style={styles.content}>
          <Text style={[styles.heroName, { color: colors.text }]} numberOfLines={2}>
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
                <FontAwesome name="home" size={14} color={roleColor} />
                <Text style={[styles.statText, { color: colors.text }]}>TH {nivelRequeridoTH}</Text>
              </RNView>
            )}
            {nivelMaximo != null && (
              <RNView style={[styles.statItem, { backgroundColor: colors.background }]}>
                <FontAwesome name="level-up" size={14} color={roleColor} />
                <Text style={[styles.statText, { color: colors.text }]}>Nv. Max {nivelMaximo}</Text>
              </RNView>
            )}
            {danoPorSegundo != null && (
              <RNView style={[styles.statItem, { backgroundColor: colors.background }]}>
                <FontAwesome name="bolt" size={14} color={roleColor} />
                <Text style={[styles.statText, { color: colors.text }]}>{formatNumber(danoPorSegundo)}</Text>
              </RNView>
            )}
            {vida != null && (
              <RNView style={[styles.statItem, { backgroundColor: colors.background }]}>
                <FontAwesome name="heart" size={14} color={roleColor} />
                <Text style={[styles.statText, { color: colors.text }]}>{formatNumber(vida)}</Text>
              </RNView>
            )}
          </RNView>

          {habilidad && (
            <RNView style={[styles.abilityContainer, { backgroundColor: roleColor + '15', borderColor: roleColor + '40' }]}>
              <FontAwesome name="star" size={14} color={roleColor} />
              <Text style={[styles.abilityText, { color: roleColor }]} numberOfLines={1}>
                {habilidad}
              </Text>
            </RNView>
          )}
        </RNView>
      </RNView>
    </Pressable>
  );
}
