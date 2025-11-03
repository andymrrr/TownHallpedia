// ============================================================================
// DATOS DE SEED: NIVELES DE DETALLE
// ============================================================================

import {
  NivelDetalleTropaSeed,
  NivelDetalleHechizoSeed,
  NivelDetalleHeroeSeed,
  NivelDetalleEdificioSeed,
} from './interfaces';

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


