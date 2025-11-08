import { useMemo } from 'react';
import { useHeroeWithDesbloqueos } from '@/hooks/heroe';
import { Heroe } from '@/core/Domain/Model/Heroe/Heroe';
import { HeroeDetailData, UseHeroeDetailVMResult } from '../interfaces';

function mapToDetailData(heroe: Heroe): HeroeDetailData {
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
    desbloqueos: desbloqueos.map((desbloqueo: any) => ({
      ayuntamientoId: desbloqueo.ayuntamientoId,
      nivel: desbloqueo.ayuntamiento?.nivel || 0,
      esNuevo: desbloqueo.esNuevo || desbloqueo.esNuevoDesbloqueo || false,
      nivelMinimoDisponible: desbloqueo.nivelMinimoDisponible || 1,
      nivelMaximoDisponible: desbloqueo.nivelMaximoDisponible || 1,
    })),
  };
}

export function useHeroeDetailViewModel(id: number): UseHeroeDetailVMResult {
  const query = useHeroeWithDesbloqueos(id);

  const data = useMemo(() => {
    if (!query.data) {
      return undefined;
    }

    if (query.data.completado && query.data.datos) {
      return mapToDetailData(query.data.datos);
    }

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
  };
}

