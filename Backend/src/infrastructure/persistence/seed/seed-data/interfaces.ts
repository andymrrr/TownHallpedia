// ============================================================================
// INTERFACES PARA DATOS DE SEED
// ============================================================================

export interface AyuntamientoDetalle {
  nivel: number;
  capacidadOro: number;
  capacidadElixir: number;
  capacidadOscuro: number;
  tiempoConstruccionHoras: number;
  costoMejora: number;
  tipoRecurso: string | null;
  portada?: string | null; // URL de la imagen de portada del Town Hall
}

export interface EntidadBaseSeed {
  nombre: string;
  tipo?: string | null;
  portada?: string | null;
}

export interface HabilidadSeed {
  nombre: string;
  descripcion?: string;
  portada?: string;
}

export interface HeroeSeed extends EntidadBaseSeed {
  tipoRecurso: string | null;
  nivelMaximo?: number;
  nivelAyuntamientoDesbloqueo?: number;
  vida?: number;
  habilidades?: HabilidadSeed[];
}

export interface NivelDetalleTropaSeed {
  nivel: number;
  costo: number;
  recurso: string;
  tiempo: number;
  dano: number;
  vida: number;
}

export interface NivelDetalleHechizoSeed {
  nivel: number;
  costo: number;
  recurso: string;
  tiempo: number;
  dano: number;
  capacidad: number | null;
}

export interface NivelDetalleHeroeSeed {
  nivel: number;
  costo: number;
  recurso: string;
  tiempo: number;
  vida: number;
}

export interface NivelDetalleEdificioSeed {
  nivel: number;
  costo: number;
  recurso: string;
  tiempo: number;
  vida: number;
}

export interface DesbloqueoConfig {
  nivelAyuntamiento: number;
  tipoEntidad: 'Edificio' | 'Tropa' | 'Hechizo' | 'Heroe' | 'Animal';
  nombres: string[];
  nivelMinimo?: number; // Nivel mínimo disponible en este Town Hall para todas las entidades (opcional, se calcula automáticamente si no se especifica)
  nivelesMinimos?: Record<string, number>; // Nivel mínimo específico por nombre de entidad (opcional, tiene prioridad sobre nivelMinimo)
  nivelMaximo?: number; // Nivel máximo disponible en este Town Hall para todas las entidades (opcional)
  nivelesMaximos?: Record<string, number>; // Nivel máximo específico por nombre de entidad (opcional, tiene prioridad sobre nivelMaximo)
}

/**
 * Configuración de desbloqueo con nivel máximo específico por entidad
 * Útil cuando diferentes entidades tienen diferentes niveles máximos en el mismo Town Hall
 */
export interface DesbloqueoConfigConNiveles {
  nivelAyuntamiento: number;
  tipoEntidad: 'Edificio' | 'Tropa' | 'Hechizo' | 'Heroe' | 'Animal';
  desbloqueos: Array<{
    nombre: string;
    nivelMaximo: number; // Nivel máximo disponible en este Town Hall
  }>;
}

export interface AnimalSeed extends EntidadBaseSeed {
  descripcion?: string | null;
}

// Nota: ParametroSeed ya no se usa, se reemplazó por RecursoSeed


