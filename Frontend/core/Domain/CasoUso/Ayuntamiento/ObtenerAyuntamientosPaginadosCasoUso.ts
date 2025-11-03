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
   
      const resultado = await this._ayuntamientoService.paginate(query);

     console.log(resultado);

      return resultado;
    
  }
}

