import { IEdificioService } from '../../../api/Interfaz/IEdificioService';
import { Edificio } from '../../Model/Edificio/Edificio';
import { Respuesta } from '../../Model/Comun/Respuesta';

/**
 * Caso de uso para obtener todos los edificios
 */
export class ObtenerEdificiosCasoUso {
  private readonly _edificioService: IEdificioService;

  constructor(edificioService: IEdificioService) {
    this._edificioService = edificioService;
  }

  async ejecutar(): Promise<Respuesta<Edificio[]>> {
    try {
      const resultado = await this._edificioService.findAll();

      if (!resultado.completado) {
        throw new Error(`Error al obtener edificios: ${resultado.mensaje}`);
      }

      return resultado;
    } catch (error) {
      console.error('Error en ObtenerEdificiosCasoUso:', error);
      const errorResponse: Respuesta<Edificio[]> = {
        completado: false,
        mensaje: error instanceof Error ? error.message : 'Error desconocido al obtener edificios',
        errorTecnico: error instanceof Error ? error.message : 'Error desconocido',
        errores: null,
        tipoError: 'EDIFICIO'
      };

      return errorResponse;
    }
  }
}

