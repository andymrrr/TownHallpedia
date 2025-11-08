export interface Hechizo {
  id: number;
  nombre: string;
  tipo?: string;
  espacioHechizo?: number;
  descripcion?: string;
  portada?: string;
  // Campos adicionales que pueden venir del backend
  nivelAyuntamientoDesbloqueo?: number;
  nivelRequeridoTH?: number;
  nivelRequerido?: number;
  nivelMaximo?: number;
  costoMejora?: number;
  costo?: number;
  tiempoMejoraHoras?: number;
  tiempoMejora?: number;
  tiempoConstruccionHoras?: number;
}

