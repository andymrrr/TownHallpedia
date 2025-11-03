import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { AyuntamientoService } from '@/core/api/Implementacion/AyuntamientoService';
import { Ayuntamiento } from '@/core/Domain/Model/Ayuntamiento/Ayuntamiento';
import { PageMetaDto, PaginationQueryDto } from '@/core/Domain/Model/Comun/Pagination';
import { PaginationVm } from '@/core/Domain/Model/Comun/PaginationVm';

const servicio = new AyuntamientoService();

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

  const query = useQuery<PaginationVm<Ayuntamiento>, Error>({
    queryKey: [
      'ayuntamientos-paginado',
      page,
      limit,
      search,
      sort ?? 'default',
      withCount ? 'count' : 'no-count',
    ],
    queryFn: async (): Promise<PaginationVm<Ayuntamiento>> => {
      const req: PaginationQueryDto = {
        page,
        limit,
        search: search || undefined,
        sort,
        withCount,
      };
      const resp: any = await servicio.paginate(req as PaginationQueryDto);
      if (resp && resp.Datos && (resp.PaginaActual !== undefined)) {
        return resp as PaginationVm<Ayuntamiento>;
      }
      if (resp && resp.completado && resp.datos) {
        return resp.datos as PaginationVm<Ayuntamiento>;
      }
      return resp as PaginationVm<Ayuntamiento>;
    },
    placeholderData: keepPreviousData,
    staleTime: options?.staleTimeMs ?? 1000 * 60 * 2,
    gcTime: options?.gcTimeMs ?? 1000 * 60 * 5,
    enabled: options?.enabled ?? true,
    retry: 2,
    retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 30000),
  });

  const vm = query.data;
  const datos: Ayuntamiento[] = vm?.Datos ?? [];
  const paginaActual = vm?.PaginaActual ?? (parametros.page ?? 1);
  const limitNorm = vm?.CantidadRegistroPorPagina ?? (parametros.limit ?? 20);
  const totalItems = vm?.TotalRegistros ?? datos.length;
  const meta: PageMetaDto | undefined = vm
    ? {
        page: paginaActual,
        limit: limitNorm,
        totalItems,
        totalPages: Math.max(1, Math.ceil(totalItems / (limitNorm || 1))),
        hasNextPage: paginaActual * (limitNorm || 1) < totalItems,
        hasPrevPage: paginaActual > 1,
      }
    : undefined;

  const totalRegistros = meta?.totalItems ?? 0;
  const totalPaginas = meta?.totalPages ?? Math.max(1, Math.ceil(totalRegistros / (limitNorm || 1)));
  const paginaActualRef = meta?.page ?? page;

  return {
    datos,
    meta,
    totalRegistros,
    totalPaginas,
    paginaActual: paginaActualRef,
    respuestaCompleta: query.data,

    isLoading: query.isLoading,
    isFetching: query.isFetching,
    isSuccess: query.isSuccess,
    isError: query.isError,
    isPending: query.isPending,
    error: query.error,
    refetch: query.refetch,

    hayPaginaAnterior: paginaActualRef > 1,
    hayPaginaSiguiente: paginaActualRef < totalPaginas,
    esPrimeraPagina: paginaActualRef === 1,
    esUltimaPagina: paginaActualRef === totalPaginas,
    hayDatos: datos.length > 0,
  } as const;
};

