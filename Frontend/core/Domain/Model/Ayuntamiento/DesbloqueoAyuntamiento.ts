export interface DesbloqueoAyuntamiento {
  id: number;
  entidadId: number;
  tipoEntidadParametroId?: number;
  tipoEntidadParametro?: {
    id: number;
    valor?: string;
    nombre?: string;
  };
  nivel?: number;
  entidadNombre?: string; // Nombre de la entidad (héroe, tropa, hechizo)
}

