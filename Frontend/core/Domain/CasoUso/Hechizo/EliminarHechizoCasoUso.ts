import { IHechizoService } from '../../../api/Interfaz/IHechizoService';
import { Respuesta } from '../../Model/Comun/Respuesta';

/**
 * Caso de uso para eliminar un hechizo
 */
export class EliminarHechizoCasoUso {
  private readonly _hechizoService: IHechizoService;

  constructor(hechizoService: IHechizoService) {
    this._hechizoService = hechizoService;
  }

  async ejecutar(id: number): Promise<Respuesta<void>> {
    try {
      const resultado = await this._hechizoService.delete(id);

      if (!resultado.completado) {
        throw new Error(`Error al eliminar hechizo: ${resultado.mensaje}`);
      }

      return resultado;
    } catch (error) {
      console.error('Error en EliminarHechizoCasoUso:', error);
      const errorResponse: Respuesta<void> = {
        completado: false,
        mensaje: error instanceof Error ? error.message : 'Error desconocido al eliminar hechizo',
        errorTecnico: error instanceof Error ? error.message : 'Error desconocido',
        errores: null,
        tipoError: 'HECHIZO'
      };

      return errorResponse;
    }
  }
}

