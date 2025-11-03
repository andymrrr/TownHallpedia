import { ImageSourcePropType, ImageURISource } from 'react-native';

export function getTownHallImage(
  nivel: number,
  imagenUrl?: string
): ImageSourcePropType | ImageURISource | null {
  if (imagenUrl) {
    return { uri: imagenUrl };
  }

  // En el futuro, aquí podríamos requerir imágenes locales por nivel.
  // try {
  //   return require(`@/assets/images/townhalls/th${nivel}.png`);
  // } catch {
  //   return null;
  // }

  return null;
}

export function getPlaceholderImageUrl(nivel: number): string {
  return `https://via.placeholder.com/150?text=TH${nivel}`;
}

export const townHallImageUrls: Record<number, string> = {
  // 1: 'https://example.com/images/townhall/th1.png',
};
