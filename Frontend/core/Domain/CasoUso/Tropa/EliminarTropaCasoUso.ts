import { ITropaService } from '../../../api/Interfaz/ITropaService';
import { Respuesta } from '../../Model/Comun/Respuesta';

/**
 * Caso de uso para eliminar una tropa
 */
export class EliminarTropaCasoUso {
  private readonly _tropaService: ITropaService;

  constructor(tropaService: ITropaService) {
    this._tropaService = tropaService;
  }

  async ejecutar(id: number): Promise<Respuesta<void>> {
    try {
      const resultado = await this._tropaService.delete(id);

      if (!resultado.completado) {
        throw new Error(`Error al eliminar tropa: ${resultado.mensaje}`);
      }

      return resultado;
    } catch (error) {
      console.error('Error en EliminarTropaCasoUso:', error);
      const errorResponse: Respuesta<void> = {
        completado: false,
        mensaje: error instanceof Error ? error.message : 'Error desconocido al eliminar tropa',
        errorTecnico: error instanceof Error ? error.message : 'Error desconocido',
        errores: null,
        tipoError: 'TROPA'
      };

      return errorResponse;
    }
  }
}

