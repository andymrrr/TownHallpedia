/**
 * Representa un item de desbloqueo (héroe, tropa, hechizo, etc.)
 * que se puede desbloquear en un nivel de ayuntamiento específico.
 */
export interface DesbloqueoItem {
  id: number;
  nombre: string;
  nivel: number; // Nivel mínimo (para compatibilidad)
  nivelMinimo?: number; // Nivel mínimo disponible
  nivelMaximo?: number; // Nivel máximo disponible hasta este ayuntamiento
  esNuevoDesbloqueo?: boolean; // Si es una nueva entidad desbloqueada en este nivel
  imagenUrl?: string; // URL de la imagen/portada de la entidad
}
