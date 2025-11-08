import { DesbloqueoAyuntamiento } from './DesbloqueoAyuntamiento';

export interface HeroeDetailData {
  id: number;
  nombre: string;
  descripcion?: string;
  imagenUrl?: string;
  nivelMaximo?: number;
  nivelAyuntamientoDesbloqueo?: number;
  vida?: number;
  danoPorSegundo?: number;
  habilidad?: string;
  rol?: string;
  tipoRecursoId?: number;
  tipoRecursoNombre?: string;
  desbloqueos: DesbloqueoAyuntamiento[];
}

