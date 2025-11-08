import { Injectable } from '@nestjs/common';
import { HeroeRepository } from '../../../infrastructure/persistence/repositories/heroe.repository';
import { Heroe } from '../../../infrastructure/persistence/entities/heroe.entity';

/**
 * Caso de uso: Obtener un héroe con sus desbloqueos
 */
@Injectable()
export class ObtenerHeroeConDesbloqueosUseCase {
  constructor(
    private readonly heroeRepository: HeroeRepository,
  ) {}

  async execute(id: number): Promise<(Heroe & { desbloqueos: any }) | null> {
    const heroeEntity = await this.heroeRepository.findOne(id);

    if (!heroeEntity) {
      return null;
    }

    const desbloqueos = await this.heroeRepository.findDesbloqueosByHeroeId(id);

    return {
      ...heroeEntity,
      desbloqueos: desbloqueos.map(desbloqueo => ({
        ayuntamientoId: desbloqueo.ayuntamientoId,
        ayuntamiento: desbloqueo.ayuntamiento,
        esNuevo: desbloqueo.esNuevo,
        nivelMinimoDisponible: desbloqueo.nivelMinimoDisponible,
        nivelMaximoDisponible: desbloqueo.nivelMaximoDisponible,
      })),
    } as any;
  }
}

