import { useCallback, useEffect, useMemo, useState } from 'react';
import { router } from 'expo-router';
import { useAyuntamientosPaginados } from '@/hooks/ayuntamiento/useAyuntamientosPaginados';
import { Ayuntamiento } from '@/core/Domain/Model/Ayuntamiento/Ayuntamiento';
import { PaginationQueryDto } from '@/core/Domain/Model/Comun/Pagination';

export interface AyuntamientoListItem {
  nivel: number;
  capacidadOro?: number;
  capacidadElixir?: number;
  capacidadOscuro?: number;
  tiempoConstruccion?: number;
  costoMejora?: number;
  tipoRecursoId?: number;
  tipoRecursoNombre?: string;
  imagenUrl?: string;
}

export interface UseAyuntamientosListVMResult {
  items: AyuntamientoListItem[];
  paginaActual: number;
  totalPaginas: number;
  totalRegistros: number;
  isLoading: boolean;
  errorMessage?: string;
  page: number;
  limit: number;
  search: string;
  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
  setSearch: (query: string) => void;
  navigateToDetail: (nivel: number) => void;
  refetch: () => void;
}

function mapToListItem(a: Ayuntamiento): AyuntamientoListItem {
  return {
    nivel: a.nivel,
    capacidadOro: a.capacidadAlmacenOro,
    capacidadElixir: a.capacidadAlmacenElixir,
    capacidadOscuro: a.capacidadAlmacenOscuro,
    tiempoConstruccion: a.tiempoConstruccionHoras,
    costoMejora: a.costoMejora,
    tipoRecursoId: a.tipoRecursoId,
    tipoRecursoNombre: a.tipoRecurso?.nombre || undefined,
    imagenUrl: a.portada,
  };
}

export function useAyuntamientosListViewModel(
  initialQuery: PaginationQueryDto = { page: 1, limit: 20, withCount: true }
): UseAyuntamientosListVMResult {
  const [page, setPage] = useState<number>(initialQuery.page ?? 1);
  const [limit, setLimit] = useState<number>(initialQuery.limit ?? 20);
  const [search, setSearch] = useState<string>(initialQuery.search ?? '');
  const [sort] = useState<string | undefined>(initialQuery.sort);

  const query = useMemo<PaginationQueryDto>(() => ({
    page,
    limit,
    search: search && search.trim().length > 0 ? search.trim() : undefined,
    sort,
    withCount: true,
  }), [page, limit, search, sort]);

  const {
    datos,
    paginaActual,
    totalPaginas,
    totalRegistros,
    isLoading,
    error,
    refetch,
  } = useAyuntamientosPaginados(query);

  const items = useMemo<AyuntamientoListItem[]>(() => datos.map(mapToListItem), [datos]);

  const errorMessage = error ? String(error.message) : undefined;

  // Sincronizar page con la página efectiva que devuelve el backend
  useEffect(() => {
    if (paginaActual !== undefined && paginaActual !== page) {
      setPage(paginaActual);
    }
  }, [paginaActual]);

  const navigateToDetail = useCallback((nivel: number) => {
    router.push(`/ayuntamientos/${nivel}`);
  }, []);

  return {
    items,
    paginaActual,
    totalPaginas,
    totalRegistros,
    isLoading,
    errorMessage,
    page,
    limit,
    search,
    setPage,
    setLimit,
    setSearch,
    navigateToDetail,
    refetch,
  };
}
