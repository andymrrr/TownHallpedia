import { IHechizoService } from '../../../api/Interfaz/IHechizoService';
import { Hechizo } from '../../Model/Hechizo/Hechizo';
import { Respuesta } from '../../Model/Comun/Respuesta';

/**
 * Caso de uso para obtener hechizos por tipo
 */
export class ObtenerHechizosPorTipoCasoUso {
  private readonly _hechizoService: IHechizoService;

  constructor(hechizoService: IHechizoService) {
    this._hechizoService = hechizoService;
  }

  async ejecutar(tipo: string): Promise<Respuesta<Hechizo[]>> {
    try {
      const resultado = await this._hechizoService.findByTipo(tipo);

      if (!resultado.completado) {
        throw new Error(`Error al obtener hechizos por tipo: ${resultado.mensaje}`);
      }

      return resultado;
    } catch (error) {
      console.error('Error en ObtenerHechizosPorTipoCasoUso:', error);
      const errorResponse: Respuesta<Hechizo[]> = {
        completado: false,
        mensaje: error instanceof Error ? error.message : 'Error desconocido al obtener hechizos por tipo',
        errorTecnico: error instanceof Error ? error.message : 'Error desconocido',
        errores: null,
        tipoError: 'HECHIZO'
      };

      return errorResponse;
    }
  }
}

