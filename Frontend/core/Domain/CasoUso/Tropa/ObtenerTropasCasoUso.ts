import { ITropaService } from '../../../api/Interfaz/ITropaService';
import { Tropa } from '../../Model/Tropa/Tropa';
import { Respuesta } from '../../Model/Comun/Respuesta';

/**
 * Caso de uso para obtener todas las tropas
 */
export class ObtenerTropasCasoUso {
  private readonly _tropaService: ITropaService;

  constructor(tropaService: ITropaService) {
    this._tropaService = tropaService;
  }

  async ejecutar(): Promise<Respuesta<Tropa[]>> {
    try {
      const resultado = await this._tropaService.findAll();

      if (!resultado.completado) {
        throw new Error(`Error al obtener tropas: ${resultado.mensaje}`);
      }

      return resultado;
    } catch (error) {
      console.error('Error en ObtenerTropasCasoUso:', error);
      const errorResponse: Respuesta<Tropa[]> = {
        completado: false,
        mensaje: error instanceof Error ? error.message : 'Error desconocido al obtener tropas',
        errorTecnico: error instanceof Error ? error.message : 'Error desconocido',
        errores: null,
        tipoError: 'TROPA'
      };

      return errorResponse;
    }
  }
}

