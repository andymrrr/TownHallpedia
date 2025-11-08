import { useMemo } from 'react';
import { useHeroes } from '@/hooks/heroe';
import { Heroe } from '@/core/Domain/Model/Heroe/Heroe';
import { HeroListItem, UseHeroesListVMResult } from '../interfaces';

/**
 * Obtiene características adicionales del héroe basadas en su nombre
 * (Solo se usan como fallback si no vienen del backend)
 */
function getHeroFallbackCharacteristics(nombre: string): {
  danoPorSegundo?: number;
  vida?: number;
  habilidad?: string;
  rol?: 'Tanque' | 'Ofensivo' | 'Soporte';
} {
  const nombreLower = nombre.toLowerCase();
  
  // Rey Bárbaro
  if (nombreLower.includes('rey') && nombreLower.includes('bárbaro')) {
    return {
      danoPorSegundo: 250,
      vida: 5000,
      habilidad: 'Furia del Rey',
      rol: 'Tanque',
    };
  }
  
  // Reina Arquera
  if (nombreLower.includes('reina') && nombreLower.includes('arquera')) {
    return {
      danoPorSegundo: 300,
      vida: 3000,
      habilidad: 'Manto Real',
      rol: 'Ofensivo',
    };
  }
  
  // Gran Centinela
  if (nombreLower.includes('gran') && nombreLower.includes('centinela')) {
    return {
      danoPorSegundo: 200,
      vida: 4000,
      habilidad: 'Aura Eterna',
      rol: 'Soporte',
    };
  }
  
  // Campeona Real
  if (nombreLower.includes('campeona') && nombreLower.includes('real')) {
    return {
      danoPorSegundo: 350,
      vida: 4500,
      habilidad: 'Escudo Real',
      rol: 'Ofensivo',
    };
  }
  
  // Valores por defecto (solo si es necesario)
  return {
    rol: 'Soporte',
  };
}

function mapToListItem(heroe: Heroe): HeroListItem | null {
  // Validar que el héroe tenga los campos mínimos requeridos
  if (!heroe || !heroe.id || !heroe.nombre) {
    console.warn('Héroe inválido:', heroe);
    return null;
  }

  // Extraer el nombre del recurso si existe
  let tipoRecursoNombre: string | undefined = undefined;
  
  if (heroe.tipoRecurso) {
    // Verificar si es un objeto Recurso con la propiedad nombre
    const recurso = heroe.tipoRecurso as any;
    if (recurso && typeof recurso === 'object' && 'nombre' in recurso && typeof recurso.nombre === 'string') {
      tipoRecursoNombre = recurso.nombre;
    }
  }

  // Obtener características de fallback solo si no vienen del backend
  const fallbackCharacteristics = getHeroFallbackCharacteristics(heroe.nombre);

  // Obtener la primera habilidad del backend si existe, sino usar fallback
  const primeraHabilidad = heroe.habilidades && heroe.habilidades.length > 0 
    ? heroe.habilidades[0].nombre 
    : fallbackCharacteristics.habilidad;

  // Intentar obtener datos adicionales del backend si están disponibles
  // (pueden venir como propiedades adicionales en el objeto heroe)
  const heroeAny = heroe as any;
  const danoPorSegundo = heroeAny.danoPorSegundo ?? heroeAny.dano ?? heroeAny.damage ?? fallbackCharacteristics.danoPorSegundo;
  const rol = heroeAny.rol ?? heroeAny.role ?? fallbackCharacteristics.rol;

  return {
    id: heroe.id,
    nombre: heroe.nombre,
    descripcion: heroe.descripcion,
    tipoRecursoNombre,
    imagenUrl: heroe.portada,
    nivelMaximo: heroe.nivelMaximo,
    nivelAyuntamientoDesbloqueo: heroe.nivelAyuntamientoDesbloqueo,
    // Usar datos del backend cuando estén disponibles, sino usar fallback
    vida: heroe.vida ?? fallbackCharacteristics.vida,
    danoPorSegundo,
    habilidad: primeraHabilidad,
    rol,
  };
}

export function useHeroesListViewModel(): UseHeroesListVMResult {
  const query = useHeroes();

  const items = useMemo<HeroListItem[]>(() => {
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
    let datosHeroes: any[] = [];
    
    if (Array.isArray(respuesta.datos)) {
      // Caso normal: respuesta.datos es un array
      datosHeroes = respuesta.datos;
    } else if (respuesta.datos && typeof respuesta.datos === 'object' && 'datos' in respuesta.datos) {
      // Caso anidado: respuesta.datos.datos es el array
      if (Array.isArray(respuesta.datos.datos)) {
        datosHeroes = respuesta.datos.datos;
      }
    } else if (Array.isArray(respuesta)) {
      // Caso especial: la respuesta misma es un array
      datosHeroes = respuesta;
    }

    // Si no encontramos datos válidos, retornar array vacío
    if (!Array.isArray(datosHeroes) || datosHeroes.length === 0) {
      return [];
    }

    // Mapear los datos
    try {
      const mappedItems = datosHeroes.map(mapToListItem).filter((item: HeroListItem | null) => item !== null) as HeroListItem[];
      return mappedItems;
    } catch (error) {
      console.error('[HeroesListViewModel] Error al mapear héroes:', error);
      return [];
    }
  }, [query.data]);

  const errorMessage = query.error 
    ? String(query.error.message) 
    : (query.data && typeof query.data === 'object' && 'completado' in query.data && !(query.data as any).completado 
        ? (query.data as any).mensaje || 'Error al cargar héroes'
        : undefined);

  return {
    items,
    isLoading: query.isLoading || query.isPending,
    errorMessage,
    refetch: query.refetch,
  };
}
