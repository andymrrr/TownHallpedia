import { Heroe } from '@/core/Domain/Model/Heroe/Heroe';
import { HeroeDetailData } from '../interfaces/HeroeDetailData';
import { DesbloqueoAyuntamiento } from '../interfaces/DesbloqueoAyuntamiento';

/**
 * Mapea un Heroe a HeroeDetailData
 */
export function mapToDetailData(heroe: Heroe): HeroeDetailData {
  const desbloqueos = (heroe as any).desbloqueos || [];
  
  return {
    id: heroe.id,
    nombre: heroe.nombre,
    descripcion: heroe.descripcion,
    imagenUrl: heroe.portada,
    nivelMaximo: heroe.nivelMaximo,
    nivelAyuntamientoDesbloqueo: heroe.nivelAyuntamientoDesbloqueo,
    vida: heroe.vida,
    danoPorSegundo: heroe.danoPorSegundo || heroe.dano || heroe.damage,
    habilidad: heroe.habilidades?.[0]?.nombre,
    rol: heroe.rol || heroe.role,
    tipoRecursoId: heroe.tipoRecursoId,
    tipoRecursoNombre: heroe.tipoRecurso?.nombre,
    desbloqueos: desbloqueos.map((desbloqueo: any): DesbloqueoAyuntamiento => ({
      ayuntamientoId: desbloqueo.ayuntamientoId,
      nivel: desbloqueo.ayuntamiento?.nivel || 0,
      esNuevo: desbloqueo.esNuevo || desbloqueo.esNuevoDesbloqueo || false,
      nivelMinimoDisponible: desbloqueo.nivelMinimoDisponible || 1,
      nivelMaximoDisponible: desbloqueo.nivelMaximoDisponible || 1,
    })),
  };
}

