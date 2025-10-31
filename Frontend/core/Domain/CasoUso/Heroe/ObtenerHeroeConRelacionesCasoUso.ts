import { IHeroeService } from '../../../api/Interfaz/IHeroeService';
import { Heroe } from '../../Model/Heroe/Heroe';
import { Respuesta } from '../../Model/Comun/Respuesta';

/**
 * Caso de uso para obtener un héroe con sus relaciones
 */
export class ObtenerHeroeConRelacionesCasoUso {
  private readonly _heroeService: IHeroeService;

  constructor(heroeService: IHeroeService) {
    this._heroeService = heroeService;
  }

  async ejecutar(id: number): Promise<Respuesta<Heroe>> {
    try {
      const resultado = await this._heroeService.findWithRelations(id);

      if (!resultado.completado) {
        throw new Error(`Error al obtener héroe con relaciones: ${resultado.mensaje}`);
      }

      return resultado;
    } catch (error) {
      console.error('Error en ObtenerHeroeConRelacionesCasoUso:', error);
      const errorResponse: Respuesta<Heroe> = {
        completado: false,
        mensaje: error instanceof Error ? error.message : 'Error desconocido al obtener héroe con relaciones',
        errorTecnico: error instanceof Error ? error.message : 'Error desconocido',
        errores: null,
        tipoError: 'HEROE'
      };

      return errorResponse;
    }
  }
}

