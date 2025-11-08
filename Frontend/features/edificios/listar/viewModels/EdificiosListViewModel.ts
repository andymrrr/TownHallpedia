import { useMemo } from 'react';
import { useEdificios } from '@/hooks/edificio';
import { Edificio } from '@/core/Domain/Model/Edificio/Edificio';
import { EdificioListItem, UseEdificiosListVMResult } from '../interfaces';

function mapToListItem(edificio: Edificio): EdificioListItem | null {
  // Validar que el edificio tenga los campos mínimos requeridos
  if (!edificio || !edificio.id || !edificio.nombre) {
    console.warn('Edificio inválido:', edificio);
    return null;
  }

  // Intentar obtener datos adicionales del backend si están disponibles
  const edificioAny = edificio as any;
  const nivelRequeridoTH = edificioAny.nivelAyuntamientoDesbloqueo ?? edificioAny.nivelRequeridoTH ?? edificioAny.nivelRequerido;
  const nivelMaximo = edificioAny.nivelMaximo;
  const costoMejora = edificioAny.costoMejora ?? edificioAny.costo;
  const tiempoMejoraHoras = edificioAny.tiempoMejoraHoras ?? edificioAny.tiempoMejora ?? edificioAny.tiempoConstruccionHoras;

  return {
    id: edificio.id,
    nombre: edificio.nombre,
    descripcion: edificio.descripcion,
    tipo: edificio.tipo,
    imagenUrl: edificio.portada,
    nivelRequeridoTH,
    nivelMaximo,
    costoMejora,
    tiempoMejoraHoras,
  };
}

export function useEdificiosListViewModel(): UseEdificiosListVMResult {
  const query = useEdificios();

  const items = useMemo<EdificioListItem[]>(() => {
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
    let datosEdificios: any[] = [];
    
    if (Array.isArray(respuesta.datos)) {
      // Caso normal: respuesta.datos es un array
      datosEdificios = respuesta.datos;
    } else if (respuesta.datos && typeof respuesta.datos === 'object' && 'datos' in respuesta.datos) {
      // Caso anidado: respuesta.datos.datos es el array
      if (Array.isArray(respuesta.datos.datos)) {
        datosEdificios = respuesta.datos.datos;
      }
    } else if (Array.isArray(respuesta)) {
      // Caso especial: la respuesta misma es un array
      datosEdificios = respuesta;
    }

    // Si no encontramos datos válidos, retornar array vacío
    if (!Array.isArray(datosEdificios) || datosEdificios.length === 0) {
      return [];
    }

    // Mapear los datos
    try {
      const mappedItems = datosEdificios.map(mapToListItem).filter((item: EdificioListItem | null) => item !== null) as EdificioListItem[];
      return mappedItems;
    } catch (error) {
      console.error('[EdificiosListViewModel] Error al mapear edificios:', error);
      return [];
    }
  }, [query.data]);

  const errorMessage = query.error 
    ? String(query.error.message) 
    : (query.data && typeof query.data === 'object' && 'completado' in query.data && !(query.data as any).completado 
        ? (query.data as any).mensaje || 'Error al cargar edificios'
        : undefined);

  return {
    items,
    isLoading: query.isLoading || query.isPending,
    errorMessage,
    refetch: query.refetch,
  };
}

