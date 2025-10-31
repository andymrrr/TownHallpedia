import { ITropaService } from '../../../api/Interfaz/ITropaService';
import { Tropa } from '../../Model/Tropa/Tropa';
import { UpdateTropa } from '../../Model/Tropa/UpdateTropa';
import { Respuesta } from '../../Model/Comun/Respuesta';

/**
 * Caso de uso para actualizar una tropa existente
 */
export class ActualizarTropaCasoUso {
  private readonly _tropaService: ITropaService;

  constructor(tropaService: ITropaService) {
    this._tropaService = tropaService;
  }

  async ejecutar(id: number, updateDto: UpdateTropa): Promise<Respuesta<Tropa>> {
    try {
      const resultado = await this._tropaService.update(id, updateDto);

      if (!resultado.completado) {
        throw new Error(`Error al actualizar tropa: ${resultado.mensaje}`);
      }

      return resultado;
    } catch (error) {
      console.error('Error en ActualizarTropaCasoUso:', error);
      const errorResponse: Respuesta<Tropa> = {
        completado: false,
        mensaje: error instanceof Error ? error.message : 'Error desconocido al actualizar tropa',
        errorTecnico: error instanceof Error ? error.message : 'Error desconocido',
        errores: null,
        tipoError: 'TROPA'
      };

      return errorResponse;
    }
  }
}

