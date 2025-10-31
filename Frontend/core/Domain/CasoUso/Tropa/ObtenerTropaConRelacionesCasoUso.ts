import { ITropaService } from '../../../api/Interfaz/ITropaService';
import { Tropa } from '../../Model/Tropa/Tropa';
import { Respuesta } from '../../Model/Comun/Respuesta';

/**
 * Caso de uso para obtener una tropa con sus relaciones
 */
export class ObtenerTropaConRelacionesCasoUso {
  private readonly _tropaService: ITropaService;

  constructor(tropaService: ITropaService) {
    this._tropaService = tropaService;
  }

  async ejecutar(id: number): Promise<Respuesta<Tropa>> {
    try {
      const resultado = await this._tropaService.findWithRelations(id);

      if (!resultado.completado) {
        throw new Error(`Error al obtener tropa con relaciones: ${resultado.mensaje}`);
      }

      return resultado;
    } catch (error) {
      console.error('Error en ObtenerTropaConRelacionesCasoUso:', error);
      const errorResponse: Respuesta<Tropa> = {
        completado: false,
        mensaje: error instanceof Error ? error.message : 'Error desconocido al obtener tropa con relaciones',
        errorTecnico: error instanceof Error ? error.message : 'Error desconocido',
        errores: null,
        tipoError: 'TROPA'
      };

      return errorResponse;
    }
  }
}

