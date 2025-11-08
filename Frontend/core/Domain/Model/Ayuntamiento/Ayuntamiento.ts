import { DesbloqueosAyuntamiento } from "./DesbloqueosAyuntamiento";

export interface Recurso {
  id: number;
  nombre: string;
  descripcion?: string;
}

export interface Ayuntamiento {
  id: number;
  nivel: number;
  capacidadAlmacenOro?: number;
  capacidadAlmacenElixir?: number;
  capacidadAlmacenOscuro?: number;
  tiempoConstruccionHoras?: number;
  costoMejora?: number;
  tipoRecursoId?: number;
  tipoRecurso?: Recurso;
  portada?: string;
  desbloqueos?: DesbloqueosAyuntamiento;
}

