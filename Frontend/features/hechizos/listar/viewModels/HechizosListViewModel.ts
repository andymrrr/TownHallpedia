import { useMemo } from 'react';
import { useHechizos } from '@/hooks/hechizo';
import { Hechizo } from '@/core/Domain/Model/Hechizo/Hechizo';
import { HechizoListItem, UseHechizosListVMResult } from '../interfaces';

function mapToListItem(hechizo: Hechizo): HechizoListItem | null {
  // Validar que el hechizo tenga los campos mínimos requeridos
  if (!hechizo || !hechizo.id || !hechizo.nombre) {
    console.warn('Hechizo inválido:', hechizo);
    return null;
  }

  // Mapear el tipo del hechizo
  let tipo: 'Elixir' | 'Oscuro' | 'Super' | undefined = undefined;
  if (hechizo.tipo) {
    const tipoLower = hechizo.tipo.toLowerCase();
    if (tipoLower.includes('elixir') || tipoLower === 'elixir') {
      tipo = 'Elixir';
    } else if (tipoLower.includes('oscuro') || tipoLower.includes('dark') || tipoLower === 'oscuro') {
      tipo = 'Oscuro';
    } else if (tipoLower.includes('super') || tipoLower === 'super') {
      tipo = 'Super';
    }
  }

  // Intentar obtener datos adicionales del backend si están disponibles
  const hechizoAny = hechizo as any;
  const nivelRequeridoTH = hechizoAny.nivelAyuntamientoDesbloqueo ?? hechizoAny.nivelRequeridoTH ?? hechizoAny.nivelRequerido;
  const nivelMaximo = hechizoAny.nivelMaximo;
  const costoMejora = hechizoAny.costoMejora ?? hechizoAny.costo;
  const tiempoMejoraHoras = hechizoAny.tiempoMejoraHoras ?? hechizoAny.tiempoMejora ?? hechizoAny.tiempoConstruccionHoras;

  return {
    id: hechizo.id,
    nombre: hechizo.nombre,
    descripcion: hechizo.descripcion,
    tipo,
    imagenUrl: hechizo.portada,
    nivelRequeridoTH,
    nivelMaximo,
    costoMejora,
    tiempoMejoraHoras,
    espacioHechizo: hechizo.espacioHechizo,
  };
}

export function useHechizosListViewModel(): UseHechizosListVMResult {
  const query = useHechizos();

  const items = useMemo<HechizoListItem[]>(() => {
    // Verificar que query.data existe y tiene la estructura Respuesta
    if (!query.data) {
      return [];
    }

    // TypeScript puede no reconocer el tipo correctamente, verificamos la estructura
    const respuesta = query.data as any;
    
    // Si la respuesta no está completada, retornar array vacío
    if (!respuesta.completado) {
      return [];
    }

    // Obtener los datos - puede estar directamente en respuesta.datos o anidado
    let datosHechizos: any[] = [];
    
    if (Array.isArray(respuesta.datos)) {
      // Caso normal: respuesta.datos es un array
      datosHechizos = respuesta.datos;
    } else if (respuesta.datos && typeof respuesta.datos === 'object' && 'datos' in respuesta.datos) {
      // Caso anidado: respuesta.datos.datos es el array
      if (Array.isArray(respuesta.datos.datos)) {
        datosHechizos = respuesta.datos.datos;
      }
    } else if (Array.isArray(respuesta)) {
      // Caso especial: la respuesta misma es un array
      datosHechizos = respuesta;
    }

    // Si no encontramos datos válidos, retornar array vacío
    if (!Array.isArray(datosHechizos) || datosHechizos.length === 0) {
      return [];
    }

    // Mapear los datos
    try {
      const mappedItems = datosHechizos.map(mapToListItem).filter((item: HechizoListItem | null) => item !== null) as HechizoListItem[];
      return mappedItems;
    } catch (error) {
      console.error('[HechizosListViewModel] Error al mapear hechizos:', error);
      return [];
    }
  }, [query.data]);

  const errorMessage = query.error 
    ? String(query.error.message) 
    : (query.data && typeof query.data === 'object' && 'completado' in query.data && !(query.data as any).completado 
        ? (query.data as any).mensaje || 'Error al cargar hechizos'
        : undefined);

  return {
    items,
    isLoading: query.isLoading || query.isPending,
    errorMessage,
    refetch: query.refetch,
  };
}

