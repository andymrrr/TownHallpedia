// ============================================================================
// DATOS DE SEED PARA LA BASE DE DATOS
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
  tipoEntidad: 'Edificio' | 'Tropa' | 'Hechizo';
  nombres: string[];
}

// ============================================================================
// CONSTANTES
// ============================================================================

export const AYUNTAMIENTOS_NIVEL_MAXIMO = 15;

export const AYUNTAMIENTOS_DETALLES: AyuntamientoDetalle[] = [
  { nivel: 1, capacidadOro: 1000, capacidadElixir: 1000, capacidadOscuro: 0, tiempoConstruccionHoras: 0, costoMejora: 0, tipoRecurso: null },
  { nivel: 2, capacidadOro: 1500, capacidadElixir: 1500, capacidadOscuro: 0, tiempoConstruccionHoras: 1, costoMejora: 1000, tipoRecurso: 'Oro' },
  { nivel: 3, capacidadOro: 3000, capacidadElixir: 3000, capacidadOscuro: 0, tiempoConstruccionHoras: 3, costoMejora: 4000, tipoRecurso: 'Oro' },
  { nivel: 4, capacidadOro: 6000, capacidadElixir: 6000, capacidadOscuro: 0, tiempoConstruccionHoras: 6, costoMejora: 25000, tipoRecurso: 'Oro' },
  { nivel: 5, capacidadOro: 12000, capacidadElixir: 12000, capacidadOscuro: 0, tiempoConstruccionHoras: 12, costoMejora: 150000, tipoRecurso: 'Oro' },
  { nivel: 6, capacidadOro: 25000, capacidadElixir: 25000, capacidadOscuro: 0, tiempoConstruccionHoras: 24, costoMejora: 750000, tipoRecurso: 'Oro' },
  { nivel: 7, capacidadOro: 50000, capacidadElixir: 50000, capacidadOscuro: 1000, tiempoConstruccionHoras: 48, costoMejora: 1200000, tipoRecurso: 'Oro' },
  { nivel: 8, capacidadOro: 100000, capacidadElixir: 100000, capacidadOscuro: 2000, tiempoConstruccionHoras: 72, costoMejora: 2000000, tipoRecurso: 'Oro' },
  { nivel: 9, capacidadOro: 250000, capacidadElixir: 250000, capacidadOscuro: 5000, tiempoConstruccionHoras: 96, costoMejora: 3000000, tipoRecurso: 'Oro' },
  { nivel: 10, capacidadOro: 500000, capacidadElixir: 500000, capacidadOscuro: 10000, tiempoConstruccionHoras: 120, costoMejora: 5000000, tipoRecurso: 'Oro' },
  { nivel: 11, capacidadOro: 1000000, capacidadElixir: 1000000, capacidadOscuro: 20000, tiempoConstruccionHoras: 144, costoMejora: 7000000, tipoRecurso: 'Oro' },
  { nivel: 12, capacidadOro: 1500000, capacidadElixir: 1500000, capacidadOscuro: 25000, tiempoConstruccionHoras: 168, costoMejora: 9000000, tipoRecurso: 'Oro' },
  { nivel: 13, capacidadOro: 2000000, capacidadElixir: 2000000, capacidadOscuro: 30000, tiempoConstruccionHoras: 192, costoMejora: 11000000, tipoRecurso: 'Oro' },
  { nivel: 14, capacidadOro: 2500000, capacidadElixir: 2500000, capacidadOscuro: 35000, tiempoConstruccionHoras: 216, costoMejora: 13000000, tipoRecurso: 'Oro' },
  { nivel: 15, capacidadOro: 3000000, capacidadElixir: 3000000, capacidadOscuro: 40000, tiempoConstruccionHoras: 240, costoMejora: 15000000, tipoRecurso: 'Oro' },
];

export const EDIFICIOS_SEED: EntidadBaseSeed[] = [
  { nombre: 'Cuartel', tipo: 'Ejército', portada: 'https://clashofclans.fandom.com/wiki/Barracks' },
  { nombre: 'Cuartel Oscuro', tipo: 'Ejército', portada: 'https://clashofclans.fandom.com/wiki/Dark_Barracks' },
  { nombre: 'Laboratorio', tipo: 'Ejército', portada: 'https://clashofclans.fandom.com/wiki/Laboratory' },
  { nombre: 'Fábrica de Hechizos', tipo: 'Ejército', portada: 'https://clashofclans.fandom.com/wiki/Spell_Factory' },
  { nombre: 'Fábrica de Hechizos Oscuros', tipo: 'Ejército', portada: 'https://clashofclans.fandom.com/wiki/Dark_Spell_Factory' },
  { nombre: 'Campamento de Ejército', tipo: 'Ejército', portada: 'https://clashofclans.fandom.com/wiki/Army_Camp' },
  { nombre: 'Almacén de Oro', tipo: 'Recurso', portada: 'https://clashofclans.fandom.com/wiki/Gold_Storage' },
  { nombre: 'Almacén de Elixir', tipo: 'Recurso', portada: 'https://clashofclans.fandom.com/wiki/Elixir_Storage' },
  { nombre: 'Almacén de Elixir Oscuro', tipo: 'Recurso', portada: 'https://clashofclans.fandom.com/wiki/Dark_Elixir_Storage' },
];

export const HEROES_SEED: HeroeSeed[] = [
  { nombre: 'Rey Bárbaro', tipoRecurso: 'Elixir Oscuro', portada: 'https://clashofclans.fandom.com/wiki/Barbarian_King' },
  { nombre: 'Reina Arquera', tipoRecurso: 'Elixir Oscuro', portada: 'https://clashofclans.fandom.com/wiki/Archer_Queen' },
  { nombre: 'Gran Centinela', tipoRecurso: 'Elixir', portada: 'https://clashofclans.fandom.com/wiki/Grand_Warden' },
  { nombre: 'Campeona Real', tipoRecurso: 'Elixir Oscuro', portada: 'https://clashofclans.fandom.com/wiki/Royal_Champion' },
];

export const HECHIZOS_SEED: EntidadBaseSeed[] = [
  { nombre: 'Rayo', tipo: 'Normal', portada: 'https://clashofclans.fandom.com/wiki/Lightning_Spell' },
  { nombre: 'Curación', tipo: 'Normal', portada: 'https://clashofclans.fandom.com/wiki/Healing_Spell' },
  { nombre: 'Furia', tipo: 'Normal', portada: 'https://clashofclans.fandom.com/wiki/Rage_Spell' },
  { nombre: 'Salto', tipo: 'Normal', portada: 'https://clashofclans.fandom.com/wiki/Jump_Spell' },
  { nombre: 'Hielo', tipo: 'Normal', portada: 'https://clashofclans.fandom.com/wiki/Freeze_Spell' },
  { nombre: 'Clon', tipo: 'Normal', portada: 'https://clashofclans.fandom.com/wiki/Clone_Spell' },
  { nombre: 'Invisibilidad', tipo: 'Normal', portada: 'https://clashofclans.fandom.com/wiki/Invisibility_Spell' },
  { nombre: 'Veneno', tipo: 'Oscuro', portada: 'https://clashofclans.fandom.com/wiki/Poison_Spell' },
  { nombre: 'Terremoto', tipo: 'Oscuro', portada: 'https://clashofclans.fandom.com/wiki/Earthquake_Spell' },
  { nombre: 'Aceleración', tipo: 'Oscuro', portada: 'https://clashofclans.fandom.com/wiki/Haste_Spell' },
  { nombre: 'Esqueleto', tipo: 'Oscuro', portada: 'https://clashofclans.fandom.com/wiki/Skeleton_Spell' },
  { nombre: 'Murciélago', tipo: 'Oscuro', portada: 'https://clashofclans.fandom.com/wiki/Bat_Spell' },
];

export const TROPAS_SEED: EntidadBaseSeed[] = [
  { nombre: 'Bárbaro', tipo: 'Normal', portada: 'https://clashofclans.fandom.com/wiki/Barbarian' },
  { nombre: 'Arquera', tipo: 'Normal', portada: 'https://clashofclans.fandom.com/wiki/Archer' },
  { nombre: 'Gigante', tipo: 'Normal', portada: 'https://clashofclans.fandom.com/wiki/Giant' },
  { nombre: 'Duende', tipo: 'Normal', portada: 'https://clashofclans.fandom.com/wiki/Goblin' },
  { nombre: 'Rompemuros', tipo: 'Normal', portada: 'https://clashofclans.fandom.com/wiki/Wall_Breaker' },
  { nombre: 'Globo', tipo: 'Normal', portada: 'https://clashofclans.fandom.com/wiki/Balloon' },
  { nombre: 'Mago', tipo: 'Normal', portada: 'https://clashofclans.fandom.com/wiki/Wizard' },
  { nombre: 'Sanadora', tipo: 'Normal', portada: 'https://clashofclans.fandom.com/wiki/Healer' },
  { nombre: 'Dragón', tipo: 'Normal', portada: 'https://clashofclans.fandom.com/wiki/Dragon' },
  { nombre: 'P.E.K.K.A', tipo: 'Normal', portada: 'https://clashofclans.fandom.com/wiki/P.E.K.K.A' },
  { nombre: 'Baby Dragón', tipo: 'Normal', portada: 'https://clashofclans.fandom.com/wiki/Baby_Dragon' },
  { nombre: 'Minero', tipo: 'Normal', portada: 'https://clashofclans.fandom.com/wiki/Miner' },
  { nombre: 'Dragón Eléctrico', tipo: 'Normal', portada: 'https://clashofclans.fandom.com/wiki/Electro_Dragon' },
  { nombre: 'Yeti', tipo: 'Normal', portada: 'https://clashofclans.fandom.com/wiki/Yeti' },
  { nombre: 'Jinete de Dragón', tipo: 'Normal', portada: 'https://clashofclans.fandom.com/wiki/Dragon_Rider' },
  { nombre: 'Esbirro', tipo: 'Oscuro', portada: 'https://clashofclans.fandom.com/wiki/Minion' },
  { nombre: 'Montapuercos', tipo: 'Oscuro', portada: 'https://clashofclans.fandom.com/wiki/Hog_Rider' },
  { nombre: 'Valquiria', tipo: 'Oscuro', portada: 'https://clashofclans.fandom.com/wiki/Valkyrie' },
  { nombre: 'Gólem', tipo: 'Oscuro', portada: 'https://clashofclans.fandom.com/wiki/Golem' },
  { nombre: 'Bruja', tipo: 'Oscuro', portada: 'https://clashofclans.fandom.com/wiki/Witch' },
  { nombre: 'Sabueso de Lava', tipo: 'Oscuro', portada: 'https://clashofclans.fandom.com/wiki/Lava_Hound' },
  { nombre: 'Lanzarrocas', tipo: 'Oscuro', portada: 'https://clashofclans.fandom.com/wiki/Bowler' },
  { nombre: 'Cazadora de Héroes', tipo: 'Oscuro', portada: 'https://clashofclans.fandom.com/wiki/Headhunter' },
];

export const DESBLOQUEOS_SEED: DesbloqueoConfig[] = [
  { nivelAyuntamiento: 1, tipoEntidad: 'Edificio', nombres: ['Cuartel', 'Campamento de Ejército'] },
  { nivelAyuntamiento: 1, tipoEntidad: 'Tropa', nombres: ['Bárbaro'] },
  { nivelAyuntamiento: 5, tipoEntidad: 'Edificio', nombres: ['Fábrica de Hechizos'] },
  { nivelAyuntamiento: 5, tipoEntidad: 'Hechizo', nombres: ['Rayo'] },
];

export const NIVELES_BARBARO_SEED: NivelDetalleTropaSeed[] = [
  { nivel: 1, costo: 25, recurso: 'Elixir', tiempo: 0, dano: 8, vida: 45 },
  { nivel: 2, costo: 40, recurso: 'Elixir', tiempo: 0, dano: 11, vida: 54 },
  { nivel: 3, costo: 60, recurso: 'Elixir', tiempo: 0, dano: 14, vida: 65 },
];

export const NIVELES_RAYO_SEED: NivelDetalleHechizoSeed[] = [
  { nivel: 1, costo: 15000, recurso: 'Elixir', tiempo: 0, dano: 240, capacidad: null },
  { nivel: 2, costo: 16000, recurso: 'Elixir', tiempo: 0, dano: 280, capacidad: null },
  { nivel: 3, costo: 17000, recurso: 'Elixir', tiempo: 0, dano: 320, capacidad: null },
];

export const NIVELES_REY_BARBARO_SEED: NivelDetalleHeroeSeed[] = [
  { nivel: 1, costo: 10000, recurso: 'Elixir Oscuro', tiempo: 12, vida: 1700 },
  { nivel: 2, costo: 12000, recurso: 'Elixir Oscuro', tiempo: 12, vida: 1746 },
  { nivel: 3, costo: 14000, recurso: 'Elixir Oscuro', tiempo: 12, vida: 1792 },
];

export const NIVELES_CUARTEL_SEED: NivelDetalleEdificioSeed[] = [
  { nivel: 1, costo: 150, recurso: 'Oro', tiempo: 0, vida: 250 },
  { nivel: 2, costo: 250, recurso: 'Oro', tiempo: 0, vida: 290 },
  { nivel: 3, costo: 450, recurso: 'Oro', tiempo: 0, vida: 330 },
];

