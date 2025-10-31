import { IAyuntamientoService } from '../../../api/Interfaz/IAyuntamientoService';
import { Ayuntamiento } from '../../Model/Ayuntamiento/Ayuntamiento';
import { CreateAyuntamiento } from '../../Model/Ayuntamiento/CreateAyuntamiento';
import { Respuesta } from '../../Model/Comun/Respuesta';

/**
 * Caso de uso para crear un nuevo ayuntamiento
 */
export class CrearAyuntamientoCasoUso {
  private readonly _ayuntamientoService: IAyuntamientoService;

  constructor(ayuntamientoService: IAyuntamientoService) {
    this._ayuntamientoService = ayuntamientoService;
  }

  async ejecutar(createDto: CreateAyuntamiento): Promise<Respuesta<Ayuntamiento>> {
    try {
      const resultado = await this._ayuntamientoService.create(createDto);

      if (!resultado.completado) {
        throw new Error(`Error al crear ayuntamiento: ${resultado.mensaje}`);
      }

      return resultado;
    } catch (error) {
      console.error('Error en CrearAyuntamientoCasoUso:', error);
      const errorResponse: Respuesta<Ayuntamiento> = {
        completado: false,
        mensaje: error instanceof Error ? error.message : 'Error desconocido al crear ayuntamiento',
        errorTecnico: error instanceof Error ? error.message : 'Error desconocido',
        errores: null,
        tipoError: 'AYUNTAMIENTO'
      };

      return errorResponse;
    }
  }
}

