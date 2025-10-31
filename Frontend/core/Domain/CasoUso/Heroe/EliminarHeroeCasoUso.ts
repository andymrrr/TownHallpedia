import { IHeroeService } from '../../../api/Interfaz/IHeroeService';
import { Respuesta } from '../../Model/Comun/Respuesta';

/**
 * Caso de uso para eliminar un héroe
 */
export class EliminarHeroeCasoUso {
  private readonly _heroeService: IHeroeService;

  constructor(heroeService: IHeroeService) {
    this._heroeService = heroeService;
  }

  async ejecutar(id: number): Promise<Respuesta<void>> {
    try {
      const resultado = await this._heroeService.delete(id);

      if (!resultado.completado) {
        throw new Error(`Error al eliminar héroe: ${resultado.mensaje}`);
      }

      return resultado;
    } catch (error) {
      console.error('Error en EliminarHeroeCasoUso:', error);
      const errorResponse: Respuesta<void> = {
        completado: false,
        mensaje: error instanceof Error ? error.message : 'Error desconocido al eliminar héroe',
        errorTecnico: error instanceof Error ? error.message : 'Error desconocido',
        errores: null,
        tipoError: 'HEROE'
      };

      return errorResponse;
    }
  }
}

