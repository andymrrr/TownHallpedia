export interface TownHallData {
  nivel: number;
  capacidadAlmacenOro?: number;
  capacidadAlmacenElixir?: number;
  capacidadAlmacenOscuro?: number;
  tiempoConstruccionHoras?: number;
  costoMejora?: number;
  tipoRecursoId?: number;
  tipoRecursoNombre?: string; // Nombre del recurso (extraído de tipoRecurso.nombre si existe)
  portada?: string;
}
