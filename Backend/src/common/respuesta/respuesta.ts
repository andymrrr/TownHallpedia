export interface Respuesta<T> {
  completado: boolean;
  mensaje?: string;
  datos?: T;
  errorTecnico?: string;
  errores?: string[] | null;
  tipoError?: string;
}

export function ok<T>(datos?: T, mensaje?: string): Respuesta<T> {
  return { completado: true, mensaje, datos };
}

export function fail<T>(
  mensaje: string,
  opciones?: { errores?: string[] | null; tipoError?: string; errorTecnico?: string }
): Respuesta<T> {
  return {
    completado: false,
    mensaje,
    errores: opciones?.errores ?? null,
    tipoError: opciones?.tipoError,
    errorTecnico: opciones?.errorTecnico,
  };
}


