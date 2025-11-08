import { EntityManager } from 'typeorm';
import { DesbloqueosAyuntamientoHeroe } from '../../entities/desbloqueos-ayuntamiento-heroe.entity';
import { DesbloqueosAyuntamientoTropa } from '../../entities/desbloqueos-ayuntamiento-tropa.entity';
import { DesbloqueosAyuntamientoHechizo } from '../../entities/desbloqueos-ayuntamiento-hechizo.entity';
import { DesbloqueosAyuntamientoEdificio } from '../../entities/desbloqueos-ayuntamiento-edificio.entity';
import { DesbloqueosAyuntamientoAnimal } from '../../entities/desbloqueos-ayuntamiento-animal.entity';
import { SeedStatistics } from '../interfaces/seed-execution.interface';

/**
 * Helper para guardar desbloqueos por tipo de entidad
 */
export class DesbloqueoGuardarHelper {
  /**
   * Guarda un desbloqueo según el tipo de entidad
   */
  static async guardar(
    manager: EntityManager,
    tipoEntidad: string,
    ayuntamientoId: number,
    entidadId: number,
    nivelMinimo: number | null,
    nivelMaximo: number | null,
    estadisticas: SeedStatistics,
  ): Promise<boolean> {
    switch (tipoEntidad) {
      case 'Heroe':
        return this.guardarHeroe(manager, ayuntamientoId, entidadId, nivelMinimo, nivelMaximo, estadisticas);
      case 'Tropa':
        return this.guardarTropa(manager, ayuntamientoId, entidadId, nivelMinimo, nivelMaximo, estadisticas);
      case 'Hechizo':
        return this.guardarHechizo(manager, ayuntamientoId, entidadId, nivelMinimo, nivelMaximo, estadisticas);
      case 'Edificio':
        return this.guardarEdificio(manager, ayuntamientoId, entidadId, nivelMinimo, nivelMaximo, estadisticas);
      case 'Animal':
        return this.guardarAnimal(manager, ayuntamientoId, entidadId, nivelMinimo, nivelMaximo, estadisticas);
      default:
        return false;
    }
  }

  private static async guardarHeroe(
    manager: EntityManager,
    ayuntamientoId: number,
    entidadId: number,
    nivelMinimo: number | null,
    nivelMaximo: number | null,
    estadisticas: SeedStatistics,
  ): Promise<boolean> {
    const existe = !!(await manager.findOne(DesbloqueosAyuntamientoHeroe, {
      where: { ayuntamientoId, heroeId: entidadId },
    }));

    if (!existe) {
      // El nivel mínimo ya viene calculado correctamente desde el servicio
      // Si es 1, significa que es nuevo (es_nuevo = true)
      // Si es mayor que 1, significa que ya existía en un TH anterior (es_nuevo = false)
      const nivelMin = nivelMinimo ?? 1;
      const nivelMax = nivelMaximo ?? 1;
      const esNuevo = nivelMin === 1;
      
      await manager.save(DesbloqueosAyuntamientoHeroe, {
        ayuntamientoId,
        heroeId: entidadId,
        nivelMinimoDisponible: nivelMin,
        nivelMaximoDisponible: nivelMax,
        esNuevo,
      });
      estadisticas.registrosCreados++;
      return true;
    } else {
      estadisticas.registrosExistentes++;
      return false;
    }
  }

  private static async guardarTropa(
    manager: EntityManager,
    ayuntamientoId: number,
    entidadId: number,
    nivelMinimo: number | null,
    nivelMaximo: number | null,
    estadisticas: SeedStatistics,
  ): Promise<boolean> {
    const existe = !!(await manager.findOne(DesbloqueosAyuntamientoTropa, {
      where: { ayuntamientoId, tropaId: entidadId },
    }));

    if (!existe) {
      // El nivel mínimo ya viene calculado correctamente desde el servicio
      // Si es 1, significa que es nuevo (es_nuevo = true)
      // Si es mayor que 1, significa que ya existía en un TH anterior (es_nuevo = false)
      const nivelMin = nivelMinimo ?? 1;
      const nivelMax = nivelMaximo ?? 1;
      const esNuevo = nivelMin === 1;
      
      await manager.save(DesbloqueosAyuntamientoTropa, {
        ayuntamientoId,
        tropaId: entidadId,
        nivelMinimoDisponible: nivelMin,
        nivelMaximoDisponible: nivelMax,
        esNuevo,
      });
      estadisticas.registrosCreados++;
      return true;
    } else {
      estadisticas.registrosExistentes++;
      return false;
    }
  }

  private static async guardarHechizo(
    manager: EntityManager,
    ayuntamientoId: number,
    entidadId: number,
    nivelMinimo: number | null,
    nivelMaximo: number | null,
    estadisticas: SeedStatistics,
  ): Promise<boolean> {
    const existe = !!(await manager.findOne(DesbloqueosAyuntamientoHechizo, {
      where: { ayuntamientoId, hechizoId: entidadId },
    }));

    if (!existe) {
      // El nivel mínimo ya viene calculado correctamente desde el servicio
      // Si es 1, significa que es nuevo (es_nuevo = true)
      // Si es mayor que 1, significa que ya existía en un TH anterior (es_nuevo = false)
      const nivelMin = nivelMinimo ?? 1;
      const nivelMax = nivelMaximo ?? 1;
      const esNuevo = nivelMin === 1;
      
      await manager.save(DesbloqueosAyuntamientoHechizo, {
        ayuntamientoId,
        hechizoId: entidadId,
        nivelMinimoDisponible: nivelMin,
        nivelMaximoDisponible: nivelMax,
        esNuevo,
      });
      estadisticas.registrosCreados++;
      return true;
    } else {
      estadisticas.registrosExistentes++;
      return false;
    }
  }

  private static async guardarEdificio(
    manager: EntityManager,
    ayuntamientoId: number,
    entidadId: number,
    nivelMinimo: number | null,
    nivelMaximo: number | null,
    estadisticas: SeedStatistics,
  ): Promise<boolean> {
    const existe = !!(await manager.findOne(DesbloqueosAyuntamientoEdificio, {
      where: { ayuntamientoId, edificioId: entidadId },
    }));

    if (!existe) {
      // El nivel mínimo ya viene calculado correctamente desde el servicio
      // Si es 1, significa que es nuevo (es_nuevo = true)
      // Si es mayor que 1, significa que ya existía en un TH anterior (es_nuevo = false)
      const nivelMin = nivelMinimo ?? 1;
      const nivelMax = nivelMaximo ?? 1;
      const esNuevo = nivelMin === 1;
      
      await manager.save(DesbloqueosAyuntamientoEdificio, {
        ayuntamientoId,
        edificioId: entidadId,
        nivelMinimoDisponible: nivelMin,
        nivelMaximoDisponible: nivelMax,
        esNuevo,
      });
      estadisticas.registrosCreados++;
      return true;
    } else {
      estadisticas.registrosExistentes++;
      return false;
    }
  }

  private static async guardarAnimal(
    manager: EntityManager,
    ayuntamientoId: number,
    entidadId: number,
    nivelMinimo: number | null,
    nivelMaximo: number | null,
    estadisticas: SeedStatistics,
  ): Promise<boolean> {
    const existe = !!(await manager.findOne(DesbloqueosAyuntamientoAnimal, {
      where: { ayuntamientoId, animalId: entidadId },
    }));

    if (!existe) {
      // El nivel mínimo ya viene calculado correctamente desde el servicio
      // Si es 1, significa que es nuevo (es_nuevo = true)
      // Si es mayor que 1, significa que ya existía en un TH anterior (es_nuevo = false)
      const nivelMin = nivelMinimo ?? 1;
      const nivelMax = nivelMaximo ?? 1;
      const esNuevo = nivelMin === 1;
      
      await manager.save(DesbloqueosAyuntamientoAnimal, {
        ayuntamientoId,
        animalId: entidadId,
        nivelMinimoDisponible: nivelMin,
        nivelMaximoDisponible: nivelMax,
        esNuevo,
      });
      estadisticas.registrosCreados++;
      return true;
    } else {
      estadisticas.registrosExistentes++;
      return false;
    }
  }
}

