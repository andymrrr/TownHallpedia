import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { AyuntamientoService } from '@/core/api/Implementacion/AyuntamientoService';
import { ObtenerAyuntamientoConDesbloqueosCasoUso } from '@/core/Domain/CasoUso/Ayuntamiento';
import { Ayuntamiento } from '@/core/Domain/Model/Ayuntamiento/Ayuntamiento';
import { Respuesta } from '@/core/Domain/Model/Comun/Respuesta';

const servicio = new AyuntamientoService();
const casoUso = new ObtenerAyuntamientoConDesbloqueosCasoUso(servicio);

/**
 * Hook para obtener un ayuntamiento con sus desbloqueos
 */
export const useAyuntamientoConDesbloqueos = (id: number | null): UseQueryResult<Respuesta<Ayuntamiento>, Error> => {
  return useQuery({
    queryKey: ['ayuntamiento', id, 'desbloqueos'],
    queryFn: () => casoUso.ejecutar(id!),
    enabled: id !== null,
  });
};

