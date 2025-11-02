import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { AyuntamientoService } from '@/core/api/Implementacion/AyuntamientoService';
import { CrearAyuntamientoCasoUso } from '@/core/Domain/CasoUso/Ayuntamiento';
import { Ayuntamiento, CreateAyuntamiento } from '@/core/Domain/Model/Ayuntamiento';
import { Respuesta } from '@/core/Domain/Model/Comun/Respuesta';

const servicio = new AyuntamientoService();
const casoUso = new CrearAyuntamientoCasoUso(servicio);

/**
 * Hook para crear un ayuntamiento
 */
export const useCrearAyuntamiento = (): UseMutationResult<
  Respuesta<Ayuntamiento>,
  Error,
  CreateAyuntamiento
> => {
  return useMutation({
    mutationFn: (request: CreateAyuntamiento) => casoUso.ejecutar(request),
  });
};

