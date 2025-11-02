import { ImageSourcePropType, ImageURISource } from 'react-native';

/**
 * Obtiene la imagen del ayuntamiento según el nivel
 * Si se proporciona una URL, la usa; si no, intenta usar una imagen local
 * @param nivel - Nivel del ayuntamiento (1-15)
 * @param imagenUrl - URL opcional de la imagen del ayuntamiento
 * @returns Source de imagen para React Native Image component
 */
export function getTownHallImage(
  nivel: number,
  imagenUrl?: string
): ImageSourcePropType | ImageURISource | null {
  // Si hay una URL proporcionada, usarla
  if (imagenUrl) {
    return { uri: imagenUrl };
  }

  // Intentar usar imagen local si existe
  // Por ahora retornamos null y se puede agregar imágenes locales después
  // Ejemplo de cómo se haría:
  // try {
  //   return require(`@/assets/images/townhalls/th${nivel}.png`);
  // } catch {
  //   return null;
  // }

  // Placeholder temporal - se puede reemplazar con imágenes reales
  return null;
}

/**
 * Genera una URL de placeholder para imágenes de ayuntamiento
 * Útil para desarrollo o cuando no hay imágenes disponibles
 */
export function getPlaceholderImageUrl(nivel: number): string {
  // Puedes usar un servicio de placeholder o una URL base
  return `https://via.placeholder.com/150?text=TH${nivel}`;
}

/**
 * Mapa de URLs de imágenes de ayuntamientos (ejemplo)
 * En producción, esto vendría del backend o de un servicio de imágenes
 */
export const townHallImageUrls: Record<number, string> = {
  // Ejemplo de estructura:
  // 1: 'https://example.com/images/townhall/th1.png',
  // 2: 'https://example.com/images/townhall/th2.png',
  // ... etc
};

