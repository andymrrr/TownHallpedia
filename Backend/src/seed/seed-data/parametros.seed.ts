// ============================================================================
// DATOS DE SEED: PARÁMETROS
// ============================================================================

import { ParametroSeed } from './interfaces';

export const PARAMETROS_SEED: ParametroSeed[] = [
  // Tipo de entidades
  { tipo: 'tipo_entidad', clave: 'Edificio', valor: 'Edificio', descripcion: 'Tipo de entidad: Edificio' },
  { tipo: 'tipo_entidad', clave: 'Tropa', valor: 'Tropa', descripcion: 'Tipo de entidad: Tropa' },
  { tipo: 'tipo_entidad', clave: 'Heroe', valor: 'Héroe', descripcion: 'Tipo de entidad: Héroe' },
  { tipo: 'tipo_entidad', clave: 'Hechizo', valor: 'Hechizo', descripcion: 'Tipo de entidad: Hechizo' },
  { tipo: 'tipo_entidad', clave: 'Animal', valor: 'Animal', descripcion: 'Tipo de entidad: Animal' },
  
  // Tipo de recursos
  { tipo: 'tipo_recurso', clave: 'Oro', valor: 'Oro', descripcion: 'Recurso: Oro' },
  { tipo: 'tipo_recurso', clave: 'Elixir', valor: 'Elixir', descripcion: 'Recurso: Elixir' },
  { tipo: 'tipo_recurso', clave: 'Elixir Oscuro', valor: 'Elixir Oscuro', descripcion: 'Recurso: Elixir Oscuro' },
  
  // Tipo de tropas/hechizos
  { tipo: 'tipo_tropa', clave: 'Normal', valor: 'Normal', descripcion: 'Tipo de tropa: Normal (Elixir)' },
  { tipo: 'tipo_tropa', clave: 'Oscuro', valor: 'Oscuro', descripcion: 'Tipo de tropa: Oscuro (Elixir Oscuro)' },
  
  // Tipo de hechizos
  { tipo: 'tipo_hechizo', clave: 'Normal', valor: 'Normal', descripcion: 'Tipo de hechizo: Normal (Elixir)' },
  { tipo: 'tipo_hechizo', clave: 'Oscuro', valor: 'Oscuro', descripcion: 'Tipo de hechizo: Oscuro (Elixir Oscuro)' },
  
  // Tipo de edificios
  { tipo: 'tipo_edificio', clave: 'Ejército', valor: 'Ejército', descripcion: 'Tipo de edificio: Ejército' },
  { tipo: 'tipo_edificio', clave: 'Recurso', valor: 'Recurso', descripcion: 'Tipo de edificio: Recurso' },
];


