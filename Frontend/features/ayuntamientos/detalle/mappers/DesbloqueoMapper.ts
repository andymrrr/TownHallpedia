import { Desbloqueo } from '@/core/Domain/Model/Ayuntamiento';
import { DesbloqueoItem } from '../interfaces/DesbloqueoItem';

/**
 * Mapea un desbloqueo a DesbloqueoItem
 */
export function mapDesbloqueoToItem(desbloqueo: Desbloqueo): DesbloqueoItem | null {
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

