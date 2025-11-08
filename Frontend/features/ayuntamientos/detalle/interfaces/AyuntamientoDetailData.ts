import { DesbloqueoItem } from "./DesbloqueoItem";

export interface AyuntamientoDetailData {
  nivel: number;
  capacidadOro?: number;
  capacidadElixir?: number;
  capacidadOscuro?: number;
  tiempoConstruccion?: number;
  costoMejora?: number;
  tipoRecursoId?: number;
  tipoRecursoNombre?: string;
  imagenUrl?: string;
  heroes: DesbloqueoItem[];
  tropas: DesbloqueoItem[];
  hechizos: DesbloqueoItem[];
  edificios: DesbloqueoItem[];
  animales: DesbloqueoItem[];
}
