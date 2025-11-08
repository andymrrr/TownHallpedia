import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { HeroeService } from '@/core/api/Implementacion/HeroeService';
import { Heroe } from '@/core/Domain/Model/Heroe/Heroe';
import { Respuesta } from '@/core/Domain/Model/Comun/Respuesta';

const servicio = new HeroeService();

/**
 * Hook para obtener un héroe con sus desbloqueos
 */
export const useHeroeWithDesbloqueos = (id: number): UseQueryResult<Respuesta<Heroe>, Error> => {
  return useQuery({
    queryKey: ['heroe', id, 'desbloqueos'],
    queryFn: () => servicio.findWithDesbloqueos(id),
    enabled: !!id,
  });
};

