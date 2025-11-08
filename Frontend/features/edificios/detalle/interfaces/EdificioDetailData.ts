import { DesbloqueoAyuntamiento } from './DesbloqueoAyuntamiento';

export interface EdificioDetailData {
  id: number;
  nombre: string;
  descripcion?: string;
  imagenUrl?: string;
  tipo?: string;
  nivelRequeridoTH?: number;
  nivelMaximo?: number;
  costoMejora?: number;
  tiempoMejoraHoras?: number;
  desbloqueos: DesbloqueoAyuntamiento[];
}

