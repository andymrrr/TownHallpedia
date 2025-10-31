import { IHeroeService } from '../../../api/Interfaz/IHeroeService';
import { Heroe } from '../../Model/Heroe/Heroe';
import { Respuesta } from '../../Model/Comun/Respuesta';

/**
 * Caso de uso para obtener héroes por tipo de recurso
 */
export class ObtenerHeroesPorTipoRecursoCasoUso {
  private readonly _heroeService: IHeroeService;

  constructor(heroeService: IHeroeService) {
    this._heroeService = heroeService;
  }

  async ejecutar(tipoRecurso: string): Promise<Respuesta<Heroe[]>> {
    try {
      const resultado = await this._heroeService.findByTipoRecurso(tipoRecurso);

      if (!resultado.completado) {
        throw new Error(`Error al obtener héroes por tipo de recurso: ${resultado.mensaje}`);
      }

      return resultado;
    } catch (error) {
      console.error('Error en ObtenerHeroesPorTipoRecursoCasoUso:', error);
      const errorResponse: Respuesta<Heroe[]> = {
        completado: false,
        mensaje: error instanceof Error ? error.message : 'Error desconocido al obtener héroes por tipo de recurso',
        errorTecnico: error instanceof Error ? error.message : 'Error desconocido',
        errores: null,
        tipoError: 'HEROE'
      };

      return errorResponse;
    }
  }
}

