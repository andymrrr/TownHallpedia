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
}

export interface EntidadBaseSeed {
  nombre: string;
  tipo?: string | null;
  portada?: string | null;
}

export interface HeroeSeed extends EntidadBaseSeed {
  tipoRecurso: string | null;
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
}

export interface AnimalSeed extends EntidadBaseSeed {
  descripcion?: string | null;
}

export interface ParametroSeed {
  tipo: string;
  clave: string;
  valor?: string | null;
  descripcion?: string | null;
}


