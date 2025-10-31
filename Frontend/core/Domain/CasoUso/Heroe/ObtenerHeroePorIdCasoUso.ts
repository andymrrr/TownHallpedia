import { IHeroeService } from '../../../api/Interfaz/IHeroeService';
import { Heroe } from '../../Model/Heroe/Heroe';
import { Respuesta } from '../../Model/Comun/Respuesta';

/**
 * Caso de uso para obtener un héroe por ID
 */
export class ObtenerHeroePorIdCasoUso {
  private readonly _heroeService: IHeroeService;

  constructor(heroeService: IHeroeService) {
    this._heroeService = heroeService;
  }

  async ejecutar(id: number): Promise<Respuesta<Heroe>> {
    try {
      const resultado = await this._heroeService.findOne(id);

      if (!resultado.completado) {
        throw new Error(`Error al obtener héroe: ${resultado.mensaje}`);
      }

      return resultado;
    } catch (error) {
      console.error('Error en ObtenerHeroePorIdCasoUso:', error);
      const errorResponse: Respuesta<Heroe> = {
        completado: false,
        mensaje: error instanceof Error ? error.message : 'Error desconocido al obtener héroe',
        errorTecnico: error instanceof Error ? error.message : 'Error desconocido',
        errores: null,
        tipoError: 'HEROE'
      };

      return errorResponse;
    }
  }
}

