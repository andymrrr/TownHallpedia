import { IHechizoService } from '../../../api/Interfaz/IHechizoService';
import { Hechizo } from '../../Model/Hechizo/Hechizo';
import { Respuesta } from '../../Model/Comun/Respuesta';

/**
 * Caso de uso para obtener un hechizo por ID
 */
export class ObtenerHechizoPorIdCasoUso {
  private readonly _hechizoService: IHechizoService;

  constructor(hechizoService: IHechizoService) {
    this._hechizoService = hechizoService;
  }

  async ejecutar(id: number): Promise<Respuesta<Hechizo>> {
    try {
      const resultado = await this._hechizoService.findOne(id);

      if (!resultado.completado) {
        throw new Error(`Error al obtener hechizo: ${resultado.mensaje}`);
      }

      return resultado;
    } catch (error) {
      console.error('Error en ObtenerHechizoPorIdCasoUso:', error);
      const errorResponse: Respuesta<Hechizo> = {
        completado: false,
        mensaje: error instanceof Error ? error.message : 'Error desconocido al obtener hechizo',
        errorTecnico: error instanceof Error ? error.message : 'Error desconocido',
        errores: null,
        tipoError: 'HECHIZO'
      };

      return errorResponse;
    }
  }
}

