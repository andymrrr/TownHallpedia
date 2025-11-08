import { Edificio } from '@/core/Domain/Model/Edificio/Edificio';
import { EdificioDetailData } from '../interfaces/EdificioDetailData';
import { DesbloqueoAyuntamiento } from '../interfaces/DesbloqueoAyuntamiento';

/**
 * Mapea un Edificio a EdificioDetailData
 */
export function mapToDetailData(edificio: Edificio): EdificioDetailData {
  const desbloqueos = (edificio as any).desbloqueos || [];
  
  return {
    id: edificio.id,
    nombre: edificio.nombre,
    descripcion: edificio.descripcion,
    imagenUrl: edificio.portada,
    tipo: edificio.tipo,
    nivelRequeridoTH: edificio.nivelAyuntamientoDesbloqueo || edificio.nivelRequeridoTH || edificio.nivelRequerido,
    nivelMaximo: edificio.nivelMaximo,
    costoMejora: edificio.costoMejora || edificio.costo,
    tiempoMejoraHoras: edificio.tiempoMejoraHoras || edificio.tiempoMejora || edificio.tiempoConstruccionHoras,
    desbloqueos: desbloqueos.map((desbloqueo: any): DesbloqueoAyuntamiento => ({
      ayuntamientoId: desbloqueo.ayuntamientoId,
      nivel: desbloqueo.ayuntamiento?.nivel || 0,
      esNuevo: desbloqueo.esNuevo || desbloqueo.esNuevoDesbloqueo || false,
      nivelMinimoDisponible: desbloqueo.nivelMinimoDisponible || 1,
      nivelMaximoDisponible: desbloqueo.nivelMaximoDisponible || 1,
    })),
  };
}

