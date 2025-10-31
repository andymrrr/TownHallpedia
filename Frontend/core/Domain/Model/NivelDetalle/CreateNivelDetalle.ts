import { TipoEntidad } from './TipoEntidad';

export interface CreateNivelDetalle {
  tipoEntidad: TipoEntidad;
  entidadId: number;
  nivel: number;
  costoMejora?: number;
  tipoRecurso?: string;
  tiempoHoras?: number;
  danoPorSegundo?: number;
  vida?: number;
  capacidad?: number;
  desbloqueaEnAyuntamientoId?: number;
}

