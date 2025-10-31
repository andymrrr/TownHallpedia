export interface Respuesta<T> {
  completado: boolean;
  mensaje?: string;
  datos?: T;
  errorTecnico?: string;
  errores?: string[] | null;
  tipoError?: string;
}

