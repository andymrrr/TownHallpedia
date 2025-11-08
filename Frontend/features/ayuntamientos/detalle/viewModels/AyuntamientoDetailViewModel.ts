import { useMemo, useState } from 'react';
import { useAyuntamientoPorNivelConDesbloqueos } from '@/hooks/ayuntamiento';
import { UseAyuntamientoDetailVMResult } from '../interfaces';
import { mapToDetailData } from '../mappers';

export function useAyuntamientoDetailViewModel(nivel: number): UseAyuntamientoDetailVMResult {
  const [activeTab, setActiveTab] = useState<'info' | 'desbloqueos'>('info');
  const [activeSubTab, setActiveSubTab] = useState<'heroes' | 'tropas' | 'hechizos' | 'edificios' | 'animales'>('heroes');

  const query = useAyuntamientoPorNivelConDesbloqueos(nivel);

  const data = useMemo(() => {
    if (!query.data) {
      return undefined;
    }

    // Si la respuesta tiene completado y datos, mapear
    if (query.data.completado && query.data.datos) {
      return mapToDetailData(query.data.datos);
    }

    // Si no está completado pero tiene datos (puede ser un error parcial)
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
    activeTab,
    setActiveTab,
    activeSubTab,
    setActiveSubTab,
  };
}

