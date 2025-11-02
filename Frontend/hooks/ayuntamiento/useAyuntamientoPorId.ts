import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { AyuntamientoService } from '@/core/api/Implementacion/AyuntamientoService';
import { ObtenerAyuntamientoPorIdCasoUso } from '@/core/Domain/CasoUso/Ayuntamiento';
import { Ayuntamiento } from '@/core/Domain/Model/Ayuntamiento/Ayuntamiento';
import { Respuesta } from '@/core/Domain/Model/Comun/Respuesta';

const servicio = new AyuntamientoService();
const casoUso = new ObtenerAyuntamientoPorIdCasoUso(servicio);

/**
 * Hook para obtener un ayuntamiento por ID
 */
export const useAyuntamientoPorId = (id: number | null): UseQueryResult<Respuesta<Ayuntamiento>, Error> => {
  return useQuery({
    queryKey: ['ayuntamiento', id],
    queryFn: () => casoUso.ejecutar(id!),
    enabled: id !== null,
  });
};

