export interface Recurso {
  id: number;
  nombre: string;
  descripcion?: string;
}

export interface Habilidad {
  id: number;
  nombre: string;
  descripcion?: string;
  heroeId: number;
  portada?: string;
}

export interface Heroe {
  id: number;
  nombre: string;
  descripcion?: string;
  tipoRecursoId?: number;
  tipoRecurso?: Recurso;
  portada?: string;
  nivelMaximo?: number;
  nivelAyuntamientoDesbloqueo?: number;
  vida?: number;
  habilidades?: Habilidad[];
}

