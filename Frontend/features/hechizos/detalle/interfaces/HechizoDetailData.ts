import { DesbloqueoAyuntamiento } from './DesbloqueoAyuntamiento';

export interface HechizoDetailData {
  id: number;
  nombre: string;
  descripcion?: string;
  imagenUrl?: string;
  tipo?: string;
  espacioHechizo?: number;
  desbloqueos: DesbloqueoAyuntamiento[];
}

