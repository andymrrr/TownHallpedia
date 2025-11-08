import { Injectable } from '@nestjs/common';
import { HechizoRepository } from '../../../infrastructure/persistence/repositories/hechizo.repository';
import { Hechizo } from '../../../infrastructure/persistence/entities/hechizo.entity';

/**
 * Caso de uso: Obtener un hechizo con sus desbloqueos
 */
@Injectable()
export class ObtenerHechizoConDesbloqueosUseCase {
  constructor(
    private readonly hechizoRepository: HechizoRepository,
  ) {}

  async execute(id: number): Promise<(Hechizo & { desbloqueos: any }) | null> {
    const hechizoEntity = await this.hechizoRepository.findOne(id);

    if (!hechizoEntity) {
      return null;
    }

    const desbloqueos = await this.hechizoRepository.findDesbloqueosByHechizoId(id);

    return {
      ...hechizoEntity,
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

