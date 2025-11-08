/**
 * Representa un desbloqueo de una entidad (héroe, tropa, hechizo, etc.) 
 * en un nivel específico de ayuntamiento
 */
export interface Desbloqueo {
  id: number;
  heroeId?: number;
  tropaId?: number;
  hechizoId?: number;
  edificioId?: number;
  animalId?: number;
  heroe?: {
    id: number;
    nombre: string;
    descripcion?: string;
    portada?: string;
  };
  tropa?: {
    id: number;
    nombre: string;
    descripcion?: string;
    portada?: string;
  };
  hechizo?: {
    id: number;
    nombre: string;
    descripcion?: string;
    portada?: string;
  };
  edificio?: {
    id: number;
    nombre: string;
    descripcion?: string;
    portada?: string;
  };
  animal?: {
    id: number;
    nombre: string;
    descripcion?: string;
    portada?: string;
  };
  nivelMinimo?: number; // Nivel mínimo disponible de la entidad (calculado acumulativo)
  nivelMaximo?: number; // Nivel máximo disponible de la entidad hasta este ayuntamiento (calculado acumulativo)
  nivelMinimoDisponible?: number; // Nivel mínimo disponible guardado en la entidad para este desbloqueo específico
  nivelMaximoDisponible?: number; // Nivel máximo disponible guardado en la entidad para este desbloqueo específico
  esNuevoDesbloqueo?: boolean; // Si es una nueva entidad desbloqueada en este nivel
  esNuevo?: boolean; // Alias para compatibilidad
}

