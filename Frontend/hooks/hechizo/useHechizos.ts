import { useQuery } from '@tanstack/react-query';
import { ObtenerHechizosCasoUso } from '@/core/Domain/CasoUso/Hechizo';
import { Hechizo } from '@/core/Domain/Model/Hechizo/Hechizo';
import { IHechizoService } from '@/core/api/Interfaz/IHechizoService';

/**
 * Hook para obtener todos los hechizos
 * Nota: Requiere que HechizoService esté implementado
 */
export function useHechizos(hechizoService?: IHechizoService) {
  return useQuery<Hechizo[], Error>({
    queryKey: ['hechizos'],
    queryFn: async () => {
      if (!hechizoService) {
        throw new Error('HechizoService no está disponible aún');
      }

      const casoUso = new ObtenerHechizosCasoUso(hechizoService);
      const resultado = await casoUso.ejecutar();
      
      if (!resultado.completado || !resultado.datos) {
        throw new Error(resultado.mensaje || 'Error al obtener hechizos');
      }
      
      return resultado.datos;
    },
    enabled: hechizoService !== undefined,
  });
}

