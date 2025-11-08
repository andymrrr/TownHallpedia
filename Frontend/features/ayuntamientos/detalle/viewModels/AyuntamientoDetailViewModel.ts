import { useMemo, useState } from 'react';
import { useAyuntamientoPorNivelConDesbloqueos } from '@/hooks/ayuntamiento';
import { Ayuntamiento, Desbloqueo } from '@/core/Domain/Model/Ayuntamiento';
import { AyuntamientoDetailData, UseAyuntamientoDetailVMResult } from '../interfaces';
import { DesbloqueoItem } from '../interfaces/DesbloqueoItem';

/**
 * Mapea un desbloqueo a DesbloqueoItem
 */
function mapDesbloqueoToItem(desbloqueo: Desbloqueo): DesbloqueoItem | null {
  // Determinar el ID, nombre e imagen de la entidad
  let entidadId: number;
  let entidadNombre: string;
  let entidadImagen: string | undefined;

  if (desbloqueo.heroe) {
    entidadId = desbloqueo.heroe.id;
    entidadNombre = desbloqueo.heroe.nombre;
    entidadImagen = desbloqueo.heroe.portada;
  } else if (desbloqueo.tropa) {
    entidadId = desbloqueo.tropa.id;
    entidadNombre = desbloqueo.tropa.nombre;
    entidadImagen = desbloqueo.tropa.portada;
  } else if (desbloqueo.hechizo) {
    entidadId = desbloqueo.hechizo.id;
    entidadNombre = desbloqueo.hechizo.nombre;
    entidadImagen = desbloqueo.hechizo.portada;
  } else if (desbloqueo.edificio) {
    entidadId = desbloqueo.edificio.id;
    entidadNombre = desbloqueo.edificio.nombre;
    entidadImagen = desbloqueo.edificio.portada;
  } else if (desbloqueo.animal) {
    entidadId = desbloqueo.animal.id;
    entidadNombre = desbloqueo.animal.nombre;
    entidadImagen = desbloqueo.animal.portada;
  } else {
    // Fallback: usar los IDs directos
    entidadId = desbloqueo.heroeId || desbloqueo.tropaId || desbloqueo.hechizoId || desbloqueo.edificioId || desbloqueo.animalId || 0;
    entidadNombre = `Entidad ${entidadId}`;
  }

  if (!entidadId || !entidadNombre) {
    return null;
  }

  return {
    id: entidadId,
    nombre: entidadNombre,
    nivel: desbloqueo.nivelMinimo ?? desbloqueo.nivelMinimoDisponible ?? 1,
    nivelMinimo: desbloqueo.nivelMinimo ?? desbloqueo.nivelMinimoDisponible ?? 1,
    nivelMaximo: desbloqueo.nivelMaximo ?? desbloqueo.nivelMaximoDisponible ?? 1,
    esNuevoDesbloqueo: desbloqueo.esNuevoDesbloqueo ?? desbloqueo.esNuevo ?? false,
    imagenUrl: entidadImagen,
  };
}

function mapToDetailData(ayuntamiento: Ayuntamiento): AyuntamientoDetailData {
  const heroes: DesbloqueoItem[] = [];
  const tropas: DesbloqueoItem[] = [];
  const hechizos: DesbloqueoItem[] = [];
  const animales: DesbloqueoItem[] = [];

  // Mapear desbloqueos si existen (nueva estructura)
  if (ayuntamiento.desbloqueos) {
    // Mapear héroes
    if (ayuntamiento.desbloqueos.heroes && Array.isArray(ayuntamiento.desbloqueos.heroes)) {
      ayuntamiento.desbloqueos.heroes.forEach((desbloqueo: Desbloqueo) => {
        const item = mapDesbloqueoToItem(desbloqueo);
        if (item) {
          heroes.push(item);
        }
      });
    }

    // Mapear tropas
    if (ayuntamiento.desbloqueos.tropas && Array.isArray(ayuntamiento.desbloqueos.tropas)) {
      ayuntamiento.desbloqueos.tropas.forEach((desbloqueo: Desbloqueo) => {
        const item = mapDesbloqueoToItem(desbloqueo);
        if (item) {
          tropas.push(item);
        }
      });
    }

    // Mapear hechizos
    if (ayuntamiento.desbloqueos.hechizos && Array.isArray(ayuntamiento.desbloqueos.hechizos)) {
      ayuntamiento.desbloqueos.hechizos.forEach((desbloqueo: Desbloqueo) => {
        const item = mapDesbloqueoToItem(desbloqueo);
        if (item) {
          hechizos.push(item);
        }
      });
    }

    // Mapear animales
    if (ayuntamiento.desbloqueos.animales && Array.isArray(ayuntamiento.desbloqueos.animales)) {
      ayuntamiento.desbloqueos.animales.forEach((desbloqueo: Desbloqueo) => {
        const item = mapDesbloqueoToItem(desbloqueo);
        if (item) {
          animales.push(item);
        }
      });
    }
  }

  return {
    nivel: ayuntamiento.nivel,
    capacidadOro: ayuntamiento.capacidadAlmacenOro,
    capacidadElixir: ayuntamiento.capacidadAlmacenElixir,
    capacidadOscuro: ayuntamiento.capacidadAlmacenOscuro,
    tiempoConstruccion: ayuntamiento.tiempoConstruccionHoras,
    costoMejora: ayuntamiento.costoMejora,
    tipoRecursoId: ayuntamiento.tipoRecursoId,
    tipoRecursoNombre: ayuntamiento.tipoRecurso?.nombre || undefined,
    imagenUrl: ayuntamiento.portada,
    heroes,
    tropas,
    hechizos,
    animales,
  };
}

export function useAyuntamientoDetailViewModel(nivel: number): UseAyuntamientoDetailVMResult {
  const [activeTab, setActiveTab] = useState<'info' | 'desbloqueos'>('info');
  const [activeSubTab, setActiveSubTab] = useState<'heroes' | 'tropas' | 'hechizos' | 'animales'>('heroes');

  const query = useAyuntamientoPorNivelConDesbloqueos(nivel);

  const data = useMemo(() => {
    if (!query.data) {
      return undefined;
    }

    // Si la respuesta tiene completado y datos, mapear
    if (query.data.completado && query.data.datos) {
      return mapToDetailData(query.data.datos);
    }

    // Si no está completado pero tiene datos (puede ser un error parcial)
    if (query.data.datos) {
      return mapToDetailData(query.data.datos);
    }

    return undefined;
  }, [query.data]);

  const errorMessage = query.error 
    ? String(query.error.message) 
    : (query.data && !query.data.completado ? query.data.mensaje : undefined);

  return {
    data,
    isLoading: query.isLoading || query.isPending,
    errorMessage,
    refetch: query.refetch,
    activeTab,
    setActiveTab,
    activeSubTab,
    setActiveSubTab,
  };
}

