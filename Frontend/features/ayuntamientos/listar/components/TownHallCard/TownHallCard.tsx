import React from 'react';
import { Pressable, ViewStyle, View as RNView, Image, ImageSourcePropType } from 'react-native';
import { Text } from '@/components/Themed';
import { useColorScheme } from '@/components/useColorScheme';
import Colors from '@/constants/Colors';
import { getTownHallImage, getPlaceholderImageUrl } from './utils/townHallImages';
import { LevelBadge } from './components/LevelBadge';
import { StorageStats } from './components/StorageStats';
import { UpgradeInfo } from './components/UpgradeInfo';
import { getLevelColor } from './utils/townHallUtils';
import { styles } from './styles/styles';

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

export function TownHallCard({
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

  const levelColor = getLevelColor(nivel);
  const imageSource = imagenUrl 
    ? { uri: imagenUrl }
    : (getTownHallImage(nivel, imagenUrl) as ImageSourcePropType) || { uri: getPlaceholderImageUrl(nivel) };

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
        <RNView style={[styles.imageContainer, { backgroundColor: colors.background }]}>
          <Image
            source={imageSource}
            style={styles.townHallImage}
            resizeMode="contain"
          />
        </RNView>
        <RNView style={styles.infoContainer}>
          <RNView style={styles.header}>
            <RNView style={[styles.levelBadge, { backgroundColor: levelColor + '20' }]}> 
              <LevelBadge nivel={nivel} color={levelColor} />
            </RNView>
            <Text style={[styles.title, { color: colors.text, marginLeft: 8 }]} numberOfLines={1}>
              Ayuntamiento Nivel {nivel}
            </Text>
          </RNView>

          <StorageStats
            capacidadOro={capacidadOro}
            capacidadElixir={capacidadElixir}
            capacidadOscuro={capacidadOscuro}
            textColor={colors.text}
          />

          <UpgradeInfo
            costoMejora={costoMejora}
            tipoRecurso={tipoRecurso}
            tiempoConstruccion={tiempoConstruccion}
            tintColor={colors.tint}
            textColor={colors.text}
          />
        </RNView>
      </RNView>
    </Pressable>
  );
}


