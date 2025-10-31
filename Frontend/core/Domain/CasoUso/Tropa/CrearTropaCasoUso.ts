import { ITropaService } from '../../../api/Interfaz/ITropaService';
import { Tropa } from '../../Model/Tropa/Tropa';
import { CreateTropa } from '../../Model/Tropa/CreateTropa';
import { Respuesta } from '../../Model/Comun/Respuesta';

/**
 * Caso de uso para crear una nueva tropa
 */
export class CrearTropaCasoUso {
  private readonly _tropaService: ITropaService;

  constructor(tropaService: ITropaService) {
    this._tropaService = tropaService;
  }

  async ejecutar(createDto: CreateTropa): Promise<Respuesta<Tropa>> {
    try {
      const resultado = await this._tropaService.create(createDto);

      if (!resultado.completado) {
        throw new Error(`Error al crear tropa: ${resultado.mensaje}`);
      }

      return resultado;
    } catch (error) {
      console.error('Error en CrearTropaCasoUso:', error);
      const errorResponse: Respuesta<Tropa> = {
        completado: false,
        mensaje: error instanceof Error ? error.message : 'Error desconocido al crear tropa',
        errorTecnico: error instanceof Error ? error.message : 'Error desconocido',
        errores: null,
        tipoError: 'TROPA'
      };

      return errorResponse;
    }
  }
}

