import { TipoEntidad } from '../NivelDetalle/TipoEntidad';

export interface DesbloqueosAyuntamiento {
  id: number;
  ayuntamientoId: number;
  tipoEntidad: TipoEntidad;
  entidadId: number;
}

