import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { AyuntamientoService } from '@/core/api/Implementacion/AyuntamientoService';
import { EliminarAyuntamientoCasoUso } from '@/core/Domain/CasoUso/Ayuntamiento';
import { Respuesta } from '@/core/Domain/Model/Comun/Respuesta';

const servicio = new AyuntamientoService();
const casoUso = new EliminarAyuntamientoCasoUso(servicio);

/**
 * Hook para eliminar un ayuntamiento
 */
export const useEliminarAyuntamiento = (): UseMutationResult<
  Respuesta<void>,
  Error,
  number
> => {
  return useMutation({
    mutationFn: (id: number) => casoUso.ejecutar(id),
  });
};

