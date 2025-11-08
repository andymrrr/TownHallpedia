import { Desbloqueo } from './Desbloqueo';

/**
 * Estructura de desbloqueos agrupados por tipo
 */
export interface DesbloqueosAyuntamiento {
  heroes: Desbloqueo[];
  tropas: Desbloqueo[];
  hechizos: Desbloqueo[];
  edificios?: Desbloqueo[];
  animales?: Desbloqueo[];
  todos?: Desbloqueo[]; // Array plano para compatibilidad
}

