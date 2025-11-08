import { Ayuntamiento, Desbloqueo } from '@/core/Domain/Model/Ayuntamiento';
import { AyuntamientoDetailData } from '../interfaces/AyuntamientoDetailData';
import { DesbloqueoItem } from '../interfaces/DesbloqueoItem';
import { mapDesbloqueoToItem } from './DesbloqueoMapper';

/**
 * Mapea un array de desbloqueos a DesbloqueoItem[]
 */
function mapDesbloqueosArray(desbloqueos: Desbloqueo[] | undefined): DesbloqueoItem[] {
  if (!desbloqueos || !Array.isArray(desbloqueos)) {
    return [];
  }

  return desbloqueos
    .map(mapDesbloqueoToItem)
    .filter((item): item is DesbloqueoItem => item !== null);
}

/**
 * Mapea un Ayuntamiento a AyuntamientoDetailData
 */
export function mapToDetailData(ayuntamiento: Ayuntamiento): AyuntamientoDetailData {
  const heroes: DesbloqueoItem[] = [];
  const tropas: DesbloqueoItem[] = [];
  const hechizos: DesbloqueoItem[] = [];
  const edificios: DesbloqueoItem[] = [];
  const animales: DesbloqueoItem[] = [];

  // Mapear desbloqueos si existen
  if (ayuntamiento.desbloqueos) {
    heroes.push(...mapDesbloqueosArray(ayuntamiento.desbloqueos.heroes));
    tropas.push(...mapDesbloqueosArray(ayuntamiento.desbloqueos.tropas));
    hechizos.push(...mapDesbloqueosArray(ayuntamiento.desbloqueos.hechizos));
    edificios.push(...mapDesbloqueosArray(ayuntamiento.desbloqueos.edificios));
    animales.push(...mapDesbloqueosArray(ayuntamiento.desbloqueos.animales));
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
    edificios,
    animales,
  };
}

