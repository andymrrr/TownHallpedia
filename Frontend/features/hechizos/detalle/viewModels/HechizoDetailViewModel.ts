import { useMemo } from 'react';
import { useHechizoWithDesbloqueos } from '@/hooks/hechizo';
import { UseHechizoDetailVMResult } from '../interfaces';
import { mapToDetailData } from '../mappers';

export function useHechizoDetailViewModel(id: number): UseHechizoDetailVMResult {
  const query = useHechizoWithDesbloqueos(id);

  const data = useMemo(() => {
    if (!query.data) {
      return undefined;
    }

    if (query.data.completado && query.data.datos) {
      return mapToDetailData(query.data.datos);
    }

    if (query.data.datos) {
      return mapToDetailData(query.data.datos);
    }

    return undefined;
  }, [query.data]);

  const errorMessage = query.error
    ? String(query.error.message)
    : (query.data && !query.data.completado ? query.data.mensaje : undefined);

  return {
    data,
    isLoading: query.isLoading || query.isPending,
    errorMessage,
    refetch: query.refetch,
  };
}

