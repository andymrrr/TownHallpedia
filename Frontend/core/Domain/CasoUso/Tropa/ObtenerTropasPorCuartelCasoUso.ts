import { ITropaService } from '../../../api/Interfaz/ITropaService';
import { Tropa } from '../../Model/Tropa/Tropa';
import { Respuesta } from '../../Model/Comun/Respuesta';

/**
 * Caso de uso para obtener tropas por cuartel
 */
export class ObtenerTropasPorCuartelCasoUso {
  private readonly _tropaService: ITropaService;

  constructor(tropaService: ITropaService) {
    this._tropaService = tropaService;
  }

  async ejecutar(cuartelId: number): Promise<Respuesta<Tropa[]>> {
    try {
      const resultado = await this._tropaService.findByCuartel(cuartelId);

      if (!resultado.completado) {
        throw new Error(`Error al obtener tropas por cuartel: ${resultado.mensaje}`);
      }

      return resultado;
    } catch (error) {
      console.error('Error en ObtenerTropasPorCuartelCasoUso:', error);
      const errorResponse: Respuesta<Tropa[]> = {
        completado: false,
        mensaje: error instanceof Error ? error.message : 'Error desconocido al obtener tropas por cuartel',
        errorTecnico: error instanceof Error ? error.message : 'Error desconocido',
        errores: null,
        tipoError: 'TROPA'
      };

      return errorResponse;
    }
  }
}

