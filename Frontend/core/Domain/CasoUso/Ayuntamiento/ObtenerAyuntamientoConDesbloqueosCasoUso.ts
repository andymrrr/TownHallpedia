import { IAyuntamientoService } from '../../../api/Interfaz/IAyuntamientoService';
import { Ayuntamiento } from '../../Model/Ayuntamiento/Ayuntamiento';
import { Respuesta } from '../../Model/Comun/Respuesta';

/**
 * Caso de uso para obtener un ayuntamiento con sus desbloqueos
 */
export class ObtenerAyuntamientoConDesbloqueosCasoUso {
  private readonly _ayuntamientoService: IAyuntamientoService;

  constructor(ayuntamientoService: IAyuntamientoService) {
    this._ayuntamientoService = ayuntamientoService;
  }

  async ejecutar(id: number): Promise<Respuesta<Ayuntamiento>> {
    try {
      const resultado = await this._ayuntamientoService.findWithDesbloqueos(id);

      if (!resultado.completado) {
        throw new Error(`Error al obtener ayuntamiento con desbloqueos: ${resultado.mensaje}`);
      }

      return resultado;
    } catch (error) {
      console.error('Error en ObtenerAyuntamientoConDesbloqueosCasoUso:', error);
      const errorResponse: Respuesta<Ayuntamiento> = {
        completado: false,
        mensaje: error instanceof Error ? error.message : 'Error desconocido al obtener ayuntamiento con desbloqueos',
        errorTecnico: error instanceof Error ? error.message : 'Error desconocido',
        errores: null,
        tipoError: 'AYUNTAMIENTO'
      };

      return errorResponse;
    }
  }
}

