import { IAyuntamientoService } from '../../../api/Interfaz/IAyuntamientoService';
import { Respuesta } from '../../Model/Comun/Respuesta';

/**
 * Caso de uso para eliminar un ayuntamiento
 */
export class EliminarAyuntamientoCasoUso {
  private readonly _ayuntamientoService: IAyuntamientoService;

  constructor(ayuntamientoService: IAyuntamientoService) {
    this._ayuntamientoService = ayuntamientoService;
  }

  async ejecutar(id: number): Promise<Respuesta<void>> {
    try {
      const resultado = await this._ayuntamientoService.delete(id);

      if (!resultado.completado) {
        throw new Error(`Error al eliminar ayuntamiento: ${resultado.mensaje}`);
      }

      return resultado;
    } catch (error) {
      console.error('Error en EliminarAyuntamientoCasoUso:', error);
      const errorResponse: Respuesta<void> = {
        completado: false,
        mensaje: error instanceof Error ? error.message : 'Error desconocido al eliminar ayuntamiento',
        errorTecnico: error instanceof Error ? error.message : 'Error desconocido',
        errores: null,
        tipoError: 'AYUNTAMIENTO'
      };

      return errorResponse;
    }
  }
}

