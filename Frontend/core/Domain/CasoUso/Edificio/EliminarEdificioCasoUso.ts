import { IEdificioService } from '../../../api/Interfaz/IEdificioService';
import { Respuesta } from '../../Model/Comun/Respuesta';

/**
 * Caso de uso para eliminar un edificio
 */
export class EliminarEdificioCasoUso {
  private readonly _edificioService: IEdificioService;

  constructor(edificioService: IEdificioService) {
    this._edificioService = edificioService;
  }

  async ejecutar(id: number): Promise<Respuesta<void>> {
    try {
      const resultado = await this._edificioService.delete(id);

      if (!resultado.completado) {
        throw new Error(`Error al eliminar edificio: ${resultado.mensaje}`);
      }

      return resultado;
    } catch (error) {
      console.error('Error en EliminarEdificioCasoUso:', error);
      const errorResponse: Respuesta<void> = {
        completado: false,
        mensaje: error instanceof Error ? error.message : 'Error desconocido al eliminar edificio',
        errorTecnico: error instanceof Error ? error.message : 'Error desconocido',
        errores: null,
        tipoError: 'EDIFICIO'
      };

      return errorResponse;
    }
  }
}

