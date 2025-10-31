import { IEdificioService } from '../../../api/Interfaz/IEdificioService';
import { Edificio } from '../../Model/Edificio/Edificio';
import { Respuesta } from '../../Model/Comun/Respuesta';

/**
 * Caso de uso para obtener edificios por tipo
 */
export class ObtenerEdificiosPorTipoCasoUso {
  private readonly _edificioService: IEdificioService;

  constructor(edificioService: IEdificioService) {
    this._edificioService = edificioService;
  }

  async ejecutar(tipo: string): Promise<Respuesta<Edificio[]>> {
    try {
      const resultado = await this._edificioService.findByTipo(tipo);

      if (!resultado.completado) {
        throw new Error(`Error al obtener edificios por tipo: ${resultado.mensaje}`);
      }

      return resultado;
    } catch (error) {
      console.error('Error en ObtenerEdificiosPorTipoCasoUso:', error);
      const errorResponse: Respuesta<Edificio[]> = {
        completado: false,
        mensaje: error instanceof Error ? error.message : 'Error desconocido al obtener edificios por tipo',
        errorTecnico: error instanceof Error ? error.message : 'Error desconocido',
        errores: null,
        tipoError: 'EDIFICIO'
      };

      return errorResponse;
    }
  }
}

