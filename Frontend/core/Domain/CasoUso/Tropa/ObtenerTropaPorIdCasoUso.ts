import { ITropaService } from '../../../api/Interfaz/ITropaService';
import { Tropa } from '../../Model/Tropa/Tropa';
import { Respuesta } from '../../Model/Comun/Respuesta';

/**
 * Caso de uso para obtener una tropa por ID
 */
export class ObtenerTropaPorIdCasoUso {
  private readonly _tropaService: ITropaService;

  constructor(tropaService: ITropaService) {
    this._tropaService = tropaService;
  }

  async ejecutar(id: number): Promise<Respuesta<Tropa>> {
    try {
      const resultado = await this._tropaService.findOne(id);

      if (!resultado.completado) {
        throw new Error(`Error al obtener tropa: ${resultado.mensaje}`);
      }

      return resultado;
    } catch (error) {
      console.error('Error en ObtenerTropaPorIdCasoUso:', error);
      const errorResponse: Respuesta<Tropa> = {
        completado: false,
        mensaje: error instanceof Error ? error.message : 'Error desconocido al obtener tropa',
        errorTecnico: error instanceof Error ? error.message : 'Error desconocido',
        errores: null,
        tipoError: 'TROPA'
      };

      return errorResponse;
    }
  }
}

