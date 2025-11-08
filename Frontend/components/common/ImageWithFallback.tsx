import React from 'react';
import { View, Image, ImageSourcePropType, ImageStyle, ViewStyle, StyleSheet } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { EntityType, getImageSource } from '@/utils/images';

type FontAwesomeIconName = 
  | 'user-circle'
  | 'magic'
  | 'building'
  | 'home'
  | 'users'
  | 'paw'
  | string;

interface ImageWithFallbackProps {
  imageUrl?: string | null;
  entityType: EntityType;
  style?: ImageStyle;
  containerStyle?: ViewStyle;
  placeholderIcon?: FontAwesomeIconName;
  placeholderIconSize?: number;
  placeholderIconColor?: string;
  placeholderBackgroundColor?: string;
  resizeMode?: 'contain' | 'cover' | 'stretch' | 'center' | 'repeat';
}

/**
 * Componente que muestra una imagen con fallback a imagen por defecto o icono
 */
export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  imageUrl,
  entityType,
  style,
  containerStyle,
  placeholderIcon,
  placeholderIconSize = 80,
  placeholderIconColor = '#666',
  placeholderBackgroundColor = '#f0f0f0',
  resizeMode = 'contain',
}) => {
  const imageSource = getImageSource(imageUrl, entityType);

  // Si hay una imagen (URL o local), mostrarla
  if (imageSource) {
    return (
      <Image
        source={imageSource}
        style={style}
        resizeMode={resizeMode}
      />
    );
  }

  // Si no hay imagen, mostrar placeholder con icono
  const defaultIcons: Record<EntityType, FontAwesomeIconName> = {
    [EntityType.HEROE]: 'user-circle',
    [EntityType.HECHIZO]: 'magic',
    [EntityType.EDIFICIO]: 'building',
    [EntityType.AYUNTAMIENTO]: 'home',
    [EntityType.TROPA]: 'users',
    [EntityType.ANIMAL]: 'paw',
  };

  const icon = placeholderIcon || defaultIcons[entityType];

  return (
    <View style={[styles.placeholderContainer, { backgroundColor: placeholderBackgroundColor }, containerStyle]}>
      <FontAwesome 
        name={icon} 
        size={placeholderIconSize} 
        color={placeholderIconColor} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  placeholderContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
  },
});

