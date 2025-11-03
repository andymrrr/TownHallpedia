import { useMemo, useState } from 'react';
import { useAyuntamientoPorNivelConDesbloqueos } from '@/hooks/ayuntamiento';
import { Ayuntamiento, DesbloqueoAyuntamiento } from '@/core/Domain/Model/Ayuntamiento';
import { AyuntamientoDetailData, DesbloqueoItem, UseAyuntamientoDetailVMResult } from '../interfaces';

function mapToDetailData(ayuntamiento: Ayuntamiento): AyuntamientoDetailData {
  const heroes: DesbloqueoItem[] = [];
  const tropas: DesbloqueoItem[] = [];
  const hechizos: DesbloqueoItem[] = [];

  console.log('🗺️ Mapeando datos del ayuntamiento:', {
    nivel: ayuntamiento.nivel,
    tieneDesbloqueos: !!ayuntamiento.desbloqueos,
    cantidadDesbloqueos: ayuntamiento.desbloqueos?.length || 0,
    desbloqueos: ayuntamiento.desbloqueos,
  });

  // Mapear desbloqueos si existen
  if (ayuntamiento.desbloqueos && Array.isArray(ayuntamiento.desbloqueos)) {
    ayuntamiento.desbloqueos.forEach((desbloqueo: DesbloqueoAyuntamiento) => {
      console.log('🔍 Procesando desbloqueo:', {
        id: desbloqueo.id,
        entidadId: desbloqueo.entidadId,
        tipoEntidadParametro: desbloqueo.tipoEntidadParametro,
        entidadNombre: desbloqueo.entidadNombre,
        nivel: desbloqueo.nivel,
      });

      const tipo = desbloqueo.tipoEntidadParametro?.valor || desbloqueo.tipoEntidadParametro?.nombre || '';
      const tipoNormalizado = tipo.toUpperCase().trim();

      console.log('📋 Tipo detectado:', {
        tipoOriginal: tipo,
        tipoNormalizado,
        tieneTipo: !!tipoNormalizado,
      });

      // Solo procesar si tiene un tipo válido
      if (!tipoNormalizado) {
        console.warn('⚠️ Desbloqueo sin tipo válido, saltando:', desbloqueo);
        return;
      }

      const item: DesbloqueoItem = {
        id: desbloqueo.entidadId,
        nombre: desbloqueo.entidadNombre || `Entidad ${desbloqueo.entidadId}`, // Fallback si no viene el nombre
        nivel: desbloqueo.nivel ?? 1, // Nivel del desbloqueo desde nivelDetalle
      };

      // Clasificar según el tipo de entidad
      if (tipoNormalizado === 'HEROE' || tipoNormalizado.includes('HEROE')) {
        console.log('✅ Clasificado como HÉROE:', item);
        heroes.push(item);
      } else if (tipoNormalizado === 'TROPA' || tipoNormalizado.includes('TROPA')) {
        console.log('✅ Clasificado como TROPA:', item);
        tropas.push(item);
      } else if (tipoNormalizado === 'HECHIZO' || tipoNormalizado.includes('HECHIZO')) {
        console.log('✅ Clasificado como HECHIZO:', item);
        hechizos.push(item);
      } else {
        console.warn('⚠️ Tipo no reconocido, no se clasificó:', tipoNormalizado, item);
      }
    });
  }

  console.log('📊 Resultado del mapeo:', {
    heroes: heroes.length,
    tropas: tropas.length,
    hechizos: hechizos.length,
    heroesItems: heroes,
    tropasItems: tropas,
    hechizosItems: hechizos,
  });

  return {
    nivel: ayuntamiento.nivel,
    capacidadOro: ayuntamiento.capacidadAlmacenOro,
    capacidadElixir: ayuntamiento.capacidadAlmacenElixir,
    capacidadOscuro: ayuntamiento.capacidadAlmacenOscuro,
    tiempoConstruccion: ayuntamiento.tiempoConstruccionHoras,
    costoMejora: ayuntamiento.costoMejora,
    tipoRecurso: ayuntamiento.tipoRecurso,
    imagenUrl: ayuntamiento.portada,
    heroes,
    tropas,
    hechizos,
  };
}

export function useAyuntamientoDetailViewModel(nivel: number): UseAyuntamientoDetailVMResult {
  const [activeTab, setActiveTab] = useState<'info' | 'desbloqueos'>('info');
  const [activeSubTab, setActiveSubTab] = useState<'heroes' | 'tropas' | 'hechizos'>('heroes');

  const query = useAyuntamientoPorNivelConDesbloqueos(nivel);

  const data = useMemo(() => {
    console.log('🔍 ViewModel Debug:', {
      hasQueryData: !!query.data,
      queryData: query.data,
      isLoading: query.isLoading,
      isPending: query.isPending,
      error: query.error,
    });

    if (!query.data) {
      console.log('⚠️ No hay query.data');
      return undefined;
    }

    // Si la respuesta tiene completado y datos, mapear
    if (query.data.completado && query.data.datos) {
      console.log('✅ Datos completos encontrados, mapeando...', query.data.datos);
      return mapToDetailData(query.data.datos);
    }

    // Si no está completado pero tiene datos (puede ser un error parcial)
    if (query.data.datos) {
      console.log('⚠️ Datos sin completado, mapeando de todas formas...', query.data.datos);
      return mapToDetailData(query.data.datos);
    }

    console.log('❌ No hay datos en la respuesta');
    return undefined;
  }, [query.data, query.isLoading, query.isPending, query.error]);

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

