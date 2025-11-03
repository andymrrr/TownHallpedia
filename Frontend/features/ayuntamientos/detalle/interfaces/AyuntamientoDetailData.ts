export interface DesbloqueoItem {
  id: number;
  nombre: string;
  nivel: number;
}

export interface AyuntamientoDetailData {
  nivel: number;
  capacidadOro?: number;
  capacidadElixir?: number;
  capacidadOscuro?: number;
  tiempoConstruccion?: number;
  costoMejora?: number;
  tipoRecurso?: string;
  imagenUrl?: string;
  heroes: DesbloqueoItem[];
  tropas: DesbloqueoItem[];
  hechizos: DesbloqueoItem[];
}

