import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { AyuntamientoService } from '@/core/api/Implementacion/AyuntamientoService';
import { ObtenerAyuntamientoPorNivelConDesbloqueosCasoUso } from '@/core/Domain/CasoUso/Ayuntamiento';
import { Ayuntamiento } from '@/core/Domain/Model/Ayuntamiento/Ayuntamiento';
import { Respuesta } from '@/core/Domain/Model/Comun/Respuesta';

const servicio = new AyuntamientoService();
const casoUso = new ObtenerAyuntamientoPorNivelConDesbloqueosCasoUso(servicio);

/**
 * Hook para obtener un ayuntamiento por nivel con sus desbloqueos
 * Usa cache de larga duración ya que estos datos no varían frecuentemente
 */
export const useAyuntamientoPorNivelConDesbloqueos = (
  nivel: number | null
): UseQueryResult<Respuesta<Ayuntamiento>, Error> => {
  return useQuery({
    queryKey: ['ayuntamiento', 'nivel', nivel, 'desbloqueos'],
    queryFn: () => casoUso.ejecutar(nivel!),
    enabled: nivel !== null && nivel > 0,
    // Cache de larga duración: datos se consideran frescos por 24 horas
    staleTime: 1000 * 60 * 60 * 24, // 24 horas
    // Los datos se mantienen en cache por 7 días después de que no hay componentes usándolos
    gcTime: 1000 * 60 * 60 * 24 * 7, // 7 días
    retry: 2,
    retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 30000),
  });
};

