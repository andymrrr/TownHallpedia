import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { AyuntamientoService } from '@/core/api/Implementacion/AyuntamientoService';
import { ObtenerAyuntamientosPaginadosCasoUso } from '@/core/Domain/CasoUso/Ayuntamiento';
import { Ayuntamiento } from '@/core/Domain/Model/Ayuntamiento/Ayuntamiento';
import { PageDto, PageMetaDto, PaginationQueryDto } from '@/core/Domain/Model/Comun/Pagination';
import { Respuesta } from '@/core/Domain/Model/Comun/Respuesta';

const servicio = new AyuntamientoService();
const casoUso = new ObtenerAyuntamientosPaginadosCasoUso(servicio);

export interface UseAyuntamientosPaginadoOptions {
  enabled?: boolean;
  staleTimeMs?: number;
  gcTimeMs?: number;
}

export const useAyuntamientosPaginados = (
  parametros: Partial<PaginationQueryDto>,
  options?: UseAyuntamientosPaginadoOptions
) => {
  const page = parametros.page ?? 1;
  const limit = parametros.limit ?? 20;
  const search = parametros.search ?? '';
  const sort = parametros.sort;
  const withCount = parametros.withCount ?? true;

  const query = useQuery<Respuesta<PageDto<Ayuntamiento>>, Error>({
    queryKey: [
      'ayuntamientos-paginado',
      page,
      limit,
      search,
      sort ?? 'default',
      withCount ? 'count' : 'no-count',
    ],
    queryFn: async () => {
      const req: PaginationQueryDto = {
        page,
        limit,
        search: search || undefined,
        sort,
        withCount,
      };
      return await casoUso.ejecutar(req);
    },
    placeholderData: keepPreviousData,
    staleTime: options?.staleTimeMs ?? 1000 * 60 * 2,
    gcTime: options?.gcTimeMs ?? 1000 * 60 * 5,
    enabled: options?.enabled ?? true,
    retry: 2,
    retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 30000),
  });

  const pageDto = query.data?.datos as PageDto<Ayuntamiento> | undefined;
  const meta = pageDto?.meta as PageMetaDto | undefined;
  const datos = pageDto?.data ?? [];

  const totalRegistros = meta?.totalItems ?? 0;
  const totalPaginas = meta?.totalPages ?? Math.max(1, Math.ceil(totalRegistros / limit));
  const paginaActual = meta?.page ?? page;

  return {
    datos,
    meta,
    totalRegistros,
    totalPaginas,
    paginaActual,
    respuestaCompleta: query.data,

    isLoading: query.isLoading,
    isFetching: query.isFetching,
    isSuccess: query.isSuccess,
    isError: query.isError,
    isPending: query.isPending,
    error: query.error,
    refetch: query.refetch,

    hayPaginaAnterior: paginaActual > 1,
    hayPaginaSiguiente: paginaActual < totalPaginas,
    esPrimeraPagina: paginaActual === 1,
    esUltimaPagina: paginaActual === totalPaginas,
    hayDatos: datos.length > 0,

    registroInicio: datos.length > 0 ? (paginaActual - 1) * limit + 1 : 0,
    registroFin: datos.length > 0 ? Math.min(paginaActual * limit, totalRegistros) : 0,
  } as const;
};

