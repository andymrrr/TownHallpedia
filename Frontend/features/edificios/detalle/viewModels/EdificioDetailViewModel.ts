import { useMemo } from 'react';
import { useEdificioWithDesbloqueos } from '@/hooks/edificio';
import { UseEdificioDetailVMResult } from '../interfaces';
import { mapToDetailData } from '../mappers';

export function useEdificioDetailViewModel(id: number): UseEdificioDetailVMResult {
  const query = useEdificioWithDesbloqueos(id);

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

