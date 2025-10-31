import { IEdificioService } from '../../../api/Interfaz/IEdificioService';
import { Edificio } from '../../Model/Edificio/Edificio';
import { UpdateEdificio } from '../../Model/Edificio/UpdateEdificio';
import { Respuesta } from '../../Model/Comun/Respuesta';

/**
 * Caso de uso para actualizar un edificio existente
 */
export class ActualizarEdificioCasoUso {
  private readonly _edificioService: IEdificioService;

  constructor(edificioService: IEdificioService) {
    this._edificioService = edificioService;
  }

  async ejecutar(id: number, updateDto: UpdateEdificio): Promise<Respuesta<Edificio>> {
    try {
      const resultado = await this._edificioService.update(id, updateDto);

      if (!resultado.completado) {
        throw new Error(`Error al actualizar edificio: ${resultado.mensaje}`);
      }

      return resultado;
    } catch (error) {
      console.error('Error en ActualizarEdificioCasoUso:', error);
      const errorResponse: Respuesta<Edificio> = {
        completado: false,
        mensaje: error instanceof Error ? error.message : 'Error desconocido al actualizar edificio',
        errorTecnico: error instanceof Error ? error.message : 'Error desconocido',
        errores: null,
        tipoError: 'EDIFICIO'
      };

      return errorResponse;
    }
  }
}

