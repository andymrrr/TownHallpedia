/**
 * Utilidades para obtener imágenes por defecto según el tipo de entidad
 */

export enum EntityType {
  HEROE = 'heroe',
  HECHIZO = 'hechizo',
  EDIFICIO = 'edificio',
  AYUNTAMIENTO = 'ayuntamiento',
  TROPA = 'tropa',
  ANIMAL = 'animal',
}

/**
 * Obtiene la imagen por defecto según el tipo de entidad
 */
export function getDefaultImage(entityType: EntityType): any {
  switch (entityType) {
    case EntityType.HEROE:
      return require('@/assets/images/defaults/heroe-default.png');
    case EntityType.HECHIZO:
      return require('@/assets/images/defaults/hechizo-default.png');
    case EntityType.EDIFICIO:
      return require('@/assets/images/defaults/edificio-default.png');
    case EntityType.AYUNTAMIENTO:
      return require('@/assets/images/defaults/ayuntamiento-default.png');
    case EntityType.TROPA:
      return require('@/assets/images/defaults/tropa-default.png');
    case EntityType.ANIMAL:
      return require('@/assets/images/defaults/animal-default.png');
    default:
      return null;
  }
}

/**
 * Obtiene la fuente de imagen (URI o require) según si hay URL o no
 */
export function getImageSource(
  imageUrl: string | null | undefined,
  entityType: EntityType
): { uri: string } | any {
  if (imageUrl) {
    return { uri: imageUrl };
  }
  
  const defaultImage = getDefaultImage(entityType);
  if (defaultImage) {
    return defaultImage;
  }
  
  return null;
}

/**
 * Verifica si una imagen es válida (tiene URL o imagen por defecto)
 */
export function hasValidImage(
  imageUrl: string | null | undefined,
  entityType: EntityType
): boolean {
  return !!imageUrl || !!getDefaultImage(entityType);
}

