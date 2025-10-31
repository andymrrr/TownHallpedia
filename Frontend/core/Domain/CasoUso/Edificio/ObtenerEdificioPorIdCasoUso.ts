import { IEdificioService } from '../../../api/Interfaz/IEdificioService';
import { Edificio } from '../../Model/Edificio/Edificio';
import { Respuesta } from '../../Model/Comun/Respuesta';

/**
 * Caso de uso para obtener un edificio por ID
 */
export class ObtenerEdificioPorIdCasoUso {
  private readonly _edificioService: IEdificioService;

  constructor(edificioService: IEdificioService) {
    this._edificioService = edificioService;
  }

  async ejecutar(id: number): Promise<Respuesta<Edificio>> {
    try {
      const resultado = await this._edificioService.findOne(id);

      if (!resultado.completado) {
        throw new Error(`Error al obtener edificio: ${resultado.mensaje}`);
      }

      return resultado;
    } catch (error) {
      console.error('Error en ObtenerEdificioPorIdCasoUso:', error);
      const errorResponse: Respuesta<Edificio> = {
        completado: false,
        mensaje: error instanceof Error ? error.message : 'Error desconocido al obtener edificio',
        errorTecnico: error instanceof Error ? error.message : 'Error desconocido',
        errores: null,
        tipoError: 'EDIFICIO'
      };

      return errorResponse;
    }
  }
}

