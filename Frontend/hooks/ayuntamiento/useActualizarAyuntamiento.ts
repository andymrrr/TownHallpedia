import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { AyuntamientoService } from '@/core/api/Implementacion/AyuntamientoService';
import { ActualizarAyuntamientoCasoUso } from '@/core/Domain/CasoUso/Ayuntamiento';
import { Ayuntamiento, UpdateAyuntamiento } from '@/core/Domain/Model/Ayuntamiento';
import { Respuesta } from '@/core/Domain/Model/Comun/Respuesta';

const servicio = new AyuntamientoService();
const casoUso = new ActualizarAyuntamientoCasoUso(servicio);

/**
 * Hook para actualizar un ayuntamiento
 */
export const useActualizarAyuntamiento = (): UseMutationResult<
  Respuesta<Ayuntamiento>,
  Error,
  { id: number; request: UpdateAyuntamiento }
> => {
  return useMutation({
    mutationFn: ({ id, request }: { id: number; request: UpdateAyuntamiento }) => 
      casoUso.ejecutar(id, request),
  });
};

