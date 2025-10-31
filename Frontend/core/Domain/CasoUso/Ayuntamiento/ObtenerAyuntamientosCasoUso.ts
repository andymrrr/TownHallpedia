import { IAyuntamientoService } from '../../../api/Interfaz/IAyuntamientoService';
import { Ayuntamiento } from '../../Model/Ayuntamiento/Ayuntamiento';
import { Respuesta } from '../../Model/Comun/Respuesta';

/**
 * Caso de uso para obtener todos los ayuntamientos
 */
export class ObtenerAyuntamientosCasoUso {
  private readonly _ayuntamientoService: IAyuntamientoService;

  constructor(ayuntamientoService: IAyuntamientoService) {
    this._ayuntamientoService = ayuntamientoService;
  }

  async ejecutar(): Promise<Respuesta<Ayuntamiento[]>> {
    try {
      const resultado = await this._ayuntamientoService.findAll();

      if (!resultado.completado) {
        throw new Error(`Error al obtener ayuntamientos: ${resultado.mensaje}`);
      }

      return resultado;
    } catch (error) {
      console.error('Error en ObtenerAyuntamientosCasoUso:', error);
      const errorResponse: Respuesta<Ayuntamiento[]> = {
        completado: false,
        mensaje: error instanceof Error ? error.message : 'Error desconocido al obtener ayuntamientos',
        errorTecnico: error instanceof Error ? error.message : 'Error desconocido',
        errores: null,
        tipoError: 'AYUNTAMIENTO'
      };

      return errorResponse;
    }
  }
}

