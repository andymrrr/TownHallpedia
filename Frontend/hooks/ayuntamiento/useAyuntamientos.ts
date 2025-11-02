import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { AyuntamientoService } from '@/core/api/Implementacion/AyuntamientoService';
import { ObtenerAyuntamientosCasoUso } from '@/core/Domain/CasoUso/Ayuntamiento';
import { Ayuntamiento } from '@/core/Domain/Model/Ayuntamiento/Ayuntamiento';
import { Respuesta } from '@/core/Domain/Model/Comun/Respuesta';

const servicio = new AyuntamientoService();
const casoUso = new ObtenerAyuntamientosCasoUso(servicio);

/**
 * Hook para obtener todos los ayuntamientos
 */
export const useAyuntamientos = (): UseQueryResult<Respuesta<Ayuntamiento[]>, Error> => {
  return useQuery({
    queryKey: ['ayuntamientos'],
    queryFn: () => casoUso.ejecutar(),
  });
};

