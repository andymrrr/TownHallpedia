import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { HechizoService } from '@/core/api/Implementacion/HechizoService';
import { Hechizo } from '@/core/Domain/Model/Hechizo/Hechizo';
import { Respuesta } from '@/core/Domain/Model/Comun/Respuesta';

const servicio = new HechizoService();

/**
 * Hook para obtener un hechizo con sus desbloqueos
 */
export const useHechizoWithDesbloqueos = (id: number): UseQueryResult<Respuesta<Hechizo>, Error> => {
  return useQuery({
    queryKey: ['hechizo', id, 'desbloqueos'],
    queryFn: () => servicio.findWithDesbloqueos(id),
    enabled: !!id,
  });
};

