import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { AyuntamientoService } from '@/core/api/Implementacion/AyuntamientoService';
import { ObtenerAyuntamientosPaginadosCasoUso } from '@/core/Domain/CasoUso/Ayuntamiento';
import { Ayuntamiento } from '@/core/Domain/Model/Ayuntamiento/Ayuntamiento';
import { PageDto, PaginationQueryDto } from '@/core/Domain/Model/Comun/Pagination';
import { Respuesta } from '@/core/Domain/Model/Comun/Respuesta';

const servicio = new AyuntamientoService();
const casoUso = new ObtenerAyuntamientosPaginadosCasoUso(servicio);

/**
 * Hook para obtener ayuntamientos paginados
 */
export const useAyuntamientosPaginados = (
  query: PaginationQueryDto
): UseQueryResult<Respuesta<PageDto<Ayuntamiento>>, Error> => {
  return useQuery({
    queryKey: ['ayuntamientos', 'paginados', query],
    queryFn: () => casoUso.ejecutar(query),
  });
};

