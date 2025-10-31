import { IHechizoService } from '../../../api/Interfaz/IHechizoService';
import { Hechizo } from '../../Model/Hechizo/Hechizo';
import { Respuesta } from '../../Model/Comun/Respuesta';

/**
 * Caso de uso para obtener todos los hechizos
 */
export class ObtenerHechizosCasoUso {
  private readonly _hechizoService: IHechizoService;

  constructor(hechizoService: IHechizoService) {
    this._hechizoService = hechizoService;
  }

  async ejecutar(): Promise<Respuesta<Hechizo[]>> {
    try {
      const resultado = await this._hechizoService.findAll();

      if (!resultado.completado) {
        throw new Error(`Error al obtener hechizos: ${resultado.mensaje}`);
      }

      return resultado;
    } catch (error) {
      console.error('Error en ObtenerHechizosCasoUso:', error);
      const errorResponse: Respuesta<Hechizo[]> = {
        completado: false,
        mensaje: error instanceof Error ? error.message : 'Error desconocido al obtener hechizos',
        errorTecnico: error instanceof Error ? error.message : 'Error desconocido',
        errores: null,
        tipoError: 'HECHIZO'
      };

      return errorResponse;
    }
  }
}

