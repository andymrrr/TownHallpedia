// ============================================================================
// DATOS DE SEED: RECURSOS
// ============================================================================

export interface RecursoSeed {
  nombre: string;
  descripcion?: string | null;
}

export const RECURSOS_SEED: RecursoSeed[] = [
  { nombre: 'ORO', descripcion: 'Recurso: Oro' },
  { nombre: 'ELIXIR', descripcion: 'Recurso: Elixir' },
  { nombre: 'ELIXIR_OSCURO', descripcion: 'Recurso: Elixir Oscuro' },
  { nombre: 'GEMA', descripcion: 'Recurso: Gema' },
];

