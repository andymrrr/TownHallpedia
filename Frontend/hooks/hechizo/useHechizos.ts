import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { HechizoService } from '@/core/api/Implementacion/HechizoService';
import { ObtenerHechizosCasoUso } from '@/core/Domain/CasoUso/Hechizo';
import { Hechizo } from '@/core/Domain/Model/Hechizo/Hechizo';
import { Respuesta } from '@/core/Domain/Model/Comun/Respuesta';

const servicio = new HechizoService();
const casoUso = new ObtenerHechizosCasoUso(servicio);

/**
 * Hook para obtener todos los hechizos
 */
export const useHechizos = (): UseQueryResult<Respuesta<Hechizo[]>, Error> => {
  return useQuery({
    queryKey: ['hechizos'],
    queryFn: () => casoUso.ejecutar(),
  });
};

