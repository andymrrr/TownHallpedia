import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { AyuntamientoService } from '@/core/api/Implementacion/AyuntamientoService';
import { ObtenerAyuntamientoPorNivelCasoUso } from '@/core/Domain/CasoUso/Ayuntamiento';
import { Ayuntamiento } from '@/core/Domain/Model/Ayuntamiento/Ayuntamiento';
import { Respuesta } from '@/core/Domain/Model/Comun/Respuesta';

const servicio = new AyuntamientoService();
const casoUso = new ObtenerAyuntamientoPorNivelCasoUso(servicio);

/**
 * Hook para obtener un ayuntamiento por nivel
 */
export const useAyuntamientoPorNivel = (nivel: number | null): UseQueryResult<Respuesta<Ayuntamiento>, Error> => {
  return useQuery({
    queryKey: ['ayuntamiento', 'nivel', nivel],
    queryFn: () => casoUso.ejecutar(nivel!),
    enabled: nivel !== null,
  });
};

