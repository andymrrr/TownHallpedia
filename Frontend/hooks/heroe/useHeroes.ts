import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { HeroeService } from '@/core/api/Implementacion/HeroeService';
import { ObtenerHeroesCasoUso } from '@/core/Domain/CasoUso/Heroe';
import { Heroe } from '@/core/Domain/Model/Heroe/Heroe';
import { Respuesta } from '@/core/Domain/Model/Comun/Respuesta';

const servicio = new HeroeService();
const casoUso = new ObtenerHeroesCasoUso(servicio);

/**
 * Hook para obtener todos los héroes
 */
export const useHeroes = (): UseQueryResult<Respuesta<Heroe[]>, Error> => {
  return useQuery({
    queryKey: ['heroes'],
    queryFn: () => casoUso.ejecutar(),
  });
};
