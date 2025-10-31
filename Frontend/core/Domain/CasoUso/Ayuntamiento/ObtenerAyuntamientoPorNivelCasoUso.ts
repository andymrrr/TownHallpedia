import { IAyuntamientoService } from '../../../api/Interfaz/IAyuntamientoService';
import { Ayuntamiento } from '../../Model/Ayuntamiento/Ayuntamiento';
import { Respuesta } from '../../Model/Comun/Respuesta';

/**
 * Caso de uso para obtener un ayuntamiento por nivel
 */
export class ObtenerAyuntamientoPorNivelCasoUso {
  private readonly _ayuntamientoService: IAyuntamientoService;

  constructor(ayuntamientoService: IAyuntamientoService) {
    this._ayuntamientoService = ayuntamientoService;
  }

  async ejecutar(nivel: number): Promise<Respuesta<Ayuntamiento>> {
    try {
      const resultado = await this._ayuntamientoService.findByNivel(nivel);

      if (!resultado.completado) {
        throw new Error(`Error al obtener ayuntamiento por nivel: ${resultado.mensaje}`);
      }

      return resultado;
    } catch (error) {
      console.error('Error en ObtenerAyuntamientoPorNivelCasoUso:', error);
      const errorResponse: Respuesta<Ayuntamiento> = {
        completado: false,
        mensaje: error instanceof Error ? error.message : 'Error desconocido al obtener ayuntamiento por nivel',
        errorTecnico: error instanceof Error ? error.message : 'Error desconocido',
        errores: null,
        tipoError: 'AYUNTAMIENTO'
      };

      return errorResponse;
    }
  }
}

