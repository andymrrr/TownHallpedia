import { useQuery } from '@tanstack/react-query';
import { ObtenerHeroesCasoUso } from '@/core/Domain/CasoUso/Heroe';
import { Heroe } from '@/core/Domain/Model/Heroe/Heroe';
import { IHeroeService } from '@/core/api/Interfaz/IHeroeService';

/**
 * Hook para obtener todos los héroes
 * Nota: Requiere que HeroeService esté implementado
 */
export function useHeroes(heroeService?: IHeroeService) {
  return useQuery<Heroe[], Error>({
    queryKey: ['heroes'],
    queryFn: async () => {
      if (!heroeService) {
        throw new Error('HeroeService no está disponible aún');
      }

      const casoUso = new ObtenerHeroesCasoUso(heroeService);
      const resultado = await casoUso.ejecutar();
      
      if (!resultado.completado || !resultado.datos) {
        throw new Error(resultado.mensaje || 'Error al obtener héroes');
      }
      
      return resultado.datos;
    },
    enabled: heroeService !== undefined,
  });
}

