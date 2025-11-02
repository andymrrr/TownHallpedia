import { IAyuntamientoService } from '../../../api/Interfaz/IAyuntamientoService';
import { Ayuntamiento } from '../../Model/Ayuntamiento/Ayuntamiento';
import { PageDto, PaginationQueryDto } from '../../Model/Comun/Pagination';
import { Respuesta } from '../../Model/Comun/Respuesta';

/**
 * Caso de uso para obtener ayuntamientos paginados
 */
export class ObtenerAyuntamientosPaginadosCasoUso {
  private readonly _ayuntamientoService: IAyuntamientoService;

  constructor(ayuntamientoService: IAyuntamientoService) {
    this._ayuntamientoService = ayuntamientoService;
  }

  async ejecutar(query: PaginationQueryDto): Promise<Respuesta<PageDto<Ayuntamiento>>> {
    try {
      const resultado = await this._ayuntamientoService.paginate(query);

      if (!resultado.completado) {
        throw new Error(`Error al obtener ayuntamientos paginados: ${resultado.mensaje}`);
      }

      return resultado;
    } catch (error) {
      console.error('Error en ObtenerAyuntamientosPaginadosCasoUso:', error);
      const errorResponse: Respuesta<PageDto<Ayuntamiento>> = {
        completado: false,
        mensaje: error instanceof Error ? error.message : 'Error desconocido al obtener ayuntamientos paginados',
        errorTecnico: error instanceof Error ? error.message : 'Error desconocido',
        errores: null,
        tipoError: 'AYUNTAMIENTO'
      };

      return errorResponse;
    }
  }
}

