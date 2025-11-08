import { EntityManager } from 'typeorm';
import { Ayuntamiento } from '../../entities/ayuntamiento.entity';
import { NivelDetalleHeroe } from '../../entities/nivel-detalle-heroe.entity';
import { NivelDetalleTropa } from '../../entities/nivel-detalle-tropa.entity';
import { NivelDetalleHechizo } from '../../entities/nivel-detalle-hechizo.entity';
import { NivelDetalleEdificio } from '../../entities/nivel-detalle-edificio.entity';
import { NivelDetalleAnimal } from '../../entities/nivel-detalle-animal.entity';

/**
 * Helper para calcular niveles mínimo y máximo disponibles
 */
export class NivelesCalculatorHelper {
  /**
   * Calcula los niveles mínimo y máximo disponibles para una entidad
   */
  static async calcularNivelesDisponibles(
    manager: EntityManager,
    tipoEntidad: string,
    entidadId: number,
    nivelAyuntamiento: number,
  ): Promise<{ nivelMinimo: number | null; nivelMaximo: number | null }> {
    let nivelesDisponibles: Array<{ nivel: number; desbloqueaEnAyuntamientoId: number | null }> = [];

    switch (tipoEntidad) {
      case 'Heroe':
        const nivelesHeroe = await manager.find(NivelDetalleHeroe, {
          where: { heroeId: entidadId },
          relations: ['desbloqueaEnAyuntamiento'],
          order: { nivel: 'ASC' },
        });
        nivelesDisponibles = nivelesHeroe.map(n => ({
          nivel: n.nivel,
          desbloqueaEnAyuntamientoId: n.desbloqueaEnAyuntamientoId,
        }));
        break;
      case 'Tropa':
        const nivelesTropa = await manager.find(NivelDetalleTropa, {
          where: { tropaId: entidadId },
          relations: ['desbloqueaEnAyuntamiento'],
          order: { nivel: 'ASC' },
        });
        nivelesDisponibles = nivelesTropa.map(n => ({
          nivel: n.nivel,
          desbloqueaEnAyuntamientoId: n.desbloqueaEnAyuntamientoId,
        }));
        break;
      case 'Hechizo':
        const nivelesHechizo = await manager.find(NivelDetalleHechizo, {
          where: { hechizoId: entidadId },
          relations: ['desbloqueaEnAyuntamiento'],
          order: { nivel: 'ASC' },
        });
        nivelesDisponibles = nivelesHechizo.map(n => ({
          nivel: n.nivel,
          desbloqueaEnAyuntamientoId: n.desbloqueaEnAyuntamientoId,
        }));
        break;
      case 'Edificio':
        const nivelesEdificio = await manager.find(NivelDetalleEdificio, {
          where: { edificioId: entidadId },
          relations: ['desbloqueaEnAyuntamiento'],
          order: { nivel: 'ASC' },
        });
        nivelesDisponibles = nivelesEdificio.map(n => ({
          nivel: n.nivel,
          desbloqueaEnAyuntamientoId: n.desbloqueaEnAyuntamientoId,
        }));
        break;
      case 'Animal':
        const nivelesAnimal = await manager.find(NivelDetalleAnimal, {
          where: { animalId: entidadId },
          relations: ['desbloqueaEnAyuntamiento'],
          order: { nivel: 'ASC' },
        });
        nivelesDisponibles = nivelesAnimal.map(n => ({
          nivel: n.nivel,
          desbloqueaEnAyuntamientoId: n.desbloqueaEnAyuntamientoId,
        }));
        break;
    }

    // Obtener niveles de ayuntamiento para filtrar
    const nivelesAyuntamiento = await manager.find(Ayuntamiento, {
      where: {},
      order: { nivel: 'ASC' },
    });

    // Filtrar niveles que se pueden desbloquear hasta este nivel de ayuntamiento
    const nivelesHastaEsteAyuntamiento = nivelesDisponibles.filter(nd => {
      if (!nd.desbloqueaEnAyuntamientoId) {
        return false;
      }
      const ayuntamiento = nivelesAyuntamiento.find(a => a.id === nd.desbloqueaEnAyuntamientoId);
      return ayuntamiento && ayuntamiento.nivel <= nivelAyuntamiento;
    });

    let nivelMinimo: number | null = null;
    let nivelMaximo: number | null = null;

    if (nivelesHastaEsteAyuntamiento.length > 0) {
      nivelMinimo = nivelesHastaEsteAyuntamiento[0].nivel;
      nivelMaximo = nivelesHastaEsteAyuntamiento[nivelesHastaEsteAyuntamiento.length - 1].nivel;
    } else if (nivelesDisponibles.length > 0) {
      nivelMinimo = nivelesDisponibles[0].nivel;
      nivelMaximo = nivelesDisponibles[0].nivel;
    }

    return { nivelMinimo, nivelMaximo };
  }
}

