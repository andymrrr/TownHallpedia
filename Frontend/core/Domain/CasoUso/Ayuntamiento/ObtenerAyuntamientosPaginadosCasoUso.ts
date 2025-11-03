import { IAyuntamientoService } from '../../../api/Interfaz/IAyuntamientoService';
import { AyuntamientoService } from '../../../api/Implementacion/AyuntamientoService';
import { Ayuntamiento } from '../../Model/Ayuntamiento/Ayuntamiento';
import { PaginationQueryDto } from '../../Model/Comun/Pagination';
import { PaginationVm } from '../../Model/Comun/PaginationVm';

/**
 * Caso de uso para obtener ayuntamientos paginados
 */
export class ObtenerAyuntamientosPaginadosCasoUso {
  private readonly _ayuntamientoService: AyuntamientoService;

  constructor(ayuntamientoService: AyuntamientoService) {
    this._ayuntamientoService = ayuntamientoService;
  }

  async ejecutar(query: PaginationQueryDto): Promise<PaginationVm<Ayuntamiento>> {
    const resultado = await this._ayuntamientoService.paginate(query);
    return resultado;
  }
}

