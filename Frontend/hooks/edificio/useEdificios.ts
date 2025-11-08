import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { EdificioService } from '@/core/api/Implementacion/EdificioService';
import { ObtenerEdificiosCasoUso } from '@/core/Domain/CasoUso/Edificio';
import { Edificio } from '@/core/Domain/Model/Edificio/Edificio';
import { Respuesta } from '@/core/Domain/Model/Comun/Respuesta';

const servicio = new EdificioService();
const casoUso = new ObtenerEdificiosCasoUso(servicio);

/**
 * Hook para obtener todos los edificios
 */
export const useEdificios = (): UseQueryResult<Respuesta<Edificio[]>, Error> => {
  return useQuery({
    queryKey: ['edificios'],
    queryFn: () => casoUso.ejecutar(),
  });
};

