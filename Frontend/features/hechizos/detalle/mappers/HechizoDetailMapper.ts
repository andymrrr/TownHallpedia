import { Hechizo } from '@/core/Domain/Model/Hechizo/Hechizo';
import { HechizoDetailData } from '../interfaces/HechizoDetailData';
import { DesbloqueoAyuntamiento } from '../interfaces/DesbloqueoAyuntamiento';

/**
 * Mapea un Hechizo a HechizoDetailData
 */
export function mapToDetailData(hechizo: Hechizo): HechizoDetailData {
  const desbloqueos = (hechizo as any).desbloqueos || [];
  
  return {
    id: hechizo.id,
    nombre: hechizo.nombre,
    descripcion: hechizo.descripcion,
    imagenUrl: hechizo.portada,
    tipo: hechizo.tipo,
    espacioHechizo: hechizo.espacioHechizo,
    desbloqueos: desbloqueos.map((desbloqueo: any): DesbloqueoAyuntamiento => ({
      ayuntamientoId: desbloqueo.ayuntamientoId,
      nivel: desbloqueo.ayuntamiento?.nivel || 0,
      esNuevo: desbloqueo.esNuevo || desbloqueo.esNuevoDesbloqueo || false,
      nivelMinimoDisponible: desbloqueo.nivelMinimoDisponible || 1,
      nivelMaximoDisponible: desbloqueo.nivelMaximoDisponible || 1,
    })),
  };
}

