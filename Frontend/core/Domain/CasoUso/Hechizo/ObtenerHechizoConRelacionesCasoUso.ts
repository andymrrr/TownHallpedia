import { IHechizoService } from '../../../api/Interfaz/IHechizoService';
import { Hechizo } from '../../Model/Hechizo/Hechizo';
import { Respuesta } from '../../Model/Comun/Respuesta';

/**
 * Caso de uso para obtener un hechizo con sus relaciones
 */
export class ObtenerHechizoConRelacionesCasoUso {
  private readonly _hechizoService: IHechizoService;

  constructor(hechizoService: IHechizoService) {
    this._hechizoService = hechizoService;
  }

  async ejecutar(id: number): Promise<Respuesta<Hechizo>> {
    try {
      const resultado = await this._hechizoService.findWithRelations(id);
      // Retorno directo
      return resultado;
    } catch (error) {
      console.error('Error en ObtenerHechizoConRelacionesCasoUso:', error);
      const errorResponse: Respuesta<Hechizo> = {
        completado: false,
        mensaje: error instanceof Error ? error.message : 'Error desconocido al obtener hechizo con relaciones',
        errorTecnico: error instanceof Error ? error.message : 'Error desconocido',
        errores: null,
        tipoError: 'HECHIZO'
      };

      return errorResponse;
    }
  }
}

