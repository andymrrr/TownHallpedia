import { IHeroeService } from '../../../api/Interfaz/IHeroeService';
import { Heroe } from '../../Model/Heroe/Heroe';
import { Respuesta } from '../../Model/Comun/Respuesta';

/**
 * Caso de uso para obtener todos los héroes
 */
export class ObtenerHeroesCasoUso {
  private readonly _heroeService: IHeroeService;

  constructor(heroeService: IHeroeService) {
    this._heroeService = heroeService;
  }

  async ejecutar(): Promise<Respuesta<Heroe[]>> {
    try {
      const resultado = await this._heroeService.findAll();

      if (!resultado.completado) {
        throw new Error(`Error al obtener héroes: ${resultado.mensaje}`);
      }

      return resultado;
    } catch (error) {
      console.error('Error en ObtenerHeroesCasoUso:', error);
      const errorResponse: Respuesta<Heroe[]> = {
        completado: false,
        mensaje: error instanceof Error ? error.message : 'Error desconocido al obtener héroes',
        errorTecnico: error instanceof Error ? error.message : 'Error desconocido',
        errores: null,
        tipoError: 'HEROE'
      };

      return errorResponse;
    }
  }
}

