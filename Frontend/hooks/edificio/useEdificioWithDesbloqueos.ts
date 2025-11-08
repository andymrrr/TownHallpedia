import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { EdificioService } from '@/core/api/Implementacion/EdificioService';
import { Edificio } from '@/core/Domain/Model/Edificio/Edificio';
import { Respuesta } from '@/core/Domain/Model/Comun/Respuesta';

const servicio = new EdificioService();

/**
 * Hook para obtener un edificio con sus desbloqueos
 */
export const useEdificioWithDesbloqueos = (id: number): UseQueryResult<Respuesta<Edificio>, Error> => {
  return useQuery({
    queryKey: ['edificio', id, 'desbloqueos'],
    queryFn: () => servicio.findWithDesbloqueos(id),
    enabled: !!id,
  });
};

