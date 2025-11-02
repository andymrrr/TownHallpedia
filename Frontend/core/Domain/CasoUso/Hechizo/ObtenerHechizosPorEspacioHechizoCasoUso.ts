import { IHechizoService } from '../../../api/Interfaz/IHechizoService';
import { Hechizo } from '../../Model/Hechizo/Hechizo';
import { Respuesta } from '../../Model/Comun/Respuesta';

/**
 * Caso de uso para obtener hechizos por espacio de hechizo
 */
export class ObtenerHechizosPorEspacioHechizoCasoUso {
  private readonly _hechizoService: IHechizoService;

  constructor(hechizoService: IHechizoService) {
    this._hechizoService = hechizoService;
  }

  async ejecutar(espacioHechizo: number): Promise<Respuesta<Hechizo[]>> {
    try {
      const resultado = await this._hechizoService.findByEspacioHechizo(espacioHechizo);
      // Retorno directo
      return resultado;
    } catch (error) {
      console.error('Error en ObtenerHechizosPorEspacioHechizoCasoUso:', error);
      const errorResponse: Respuesta<Hechizo[]> = {
        completado: false,
        mensaje: error instanceof Error ? error.message : 'Error desconocido al obtener hechizos por espacio de hechizo',
        errorTecnico: error instanceof Error ? error.message : 'Error desconocido',
        errores: null,
        tipoError: 'HECHIZO'
      };

      return errorResponse;
    }
  }
}

