import { ApiError } from '@/core/api/configuracion';
import { Respuesta } from '@/core/Domain/Model/Comun/Respuesta';

export function mapErrorARespuesta<T>(error: ApiError | any, accion: string, tipoError?: string): Respuesta<T> {
  const respuesta: Respuesta<T> = {
    completado: false,
    mensaje: `Error al ${accion}`,
    datos: undefined,
    errores: [],
    tipoError: tipoError
  };

  if (error?.status) {
    switch (error.status) {
      case 400:
        respuesta.mensaje = error.data?.mensaje || error.message || `Datos inválidos al ${accion}`;
        respuesta.errores = error.data?.errores || error.data?.errors || [];
        break;
      case 401:
        respuesta.mensaje = 'No autorizado. Por favor, inicia sesión nuevamente.';
        break;
      case 403:
        respuesta.mensaje = 'No tienes permiso para realizar esta acción.';
        break;
      case 404:
        respuesta.mensaje = error.data?.mensaje || error.message || `No se encontró el recurso al ${accion}`;
        break;
      case 500:
        respuesta.mensaje = 'Error interno del servidor. Por favor, intenta más tarde.';
        break;
      default:
        respuesta.mensaje = error.data?.mensaje || error.message || `Error al ${accion}`;
    }
  } else {
    respuesta.mensaje = error?.message || `Error de conexión al ${accion}`;
    respuesta.errores = ['Verifica tu conexión a internet'];
  }

  return respuesta;
}

