import { Injectable } from '@nestjs/common';
import { EdificioRepository } from '../../../infrastructure/persistence/repositories/edificio.repository';
import { Edificio } from '../../../infrastructure/persistence/entities/edificio.entity';

/**
 * Caso de uso: Obtener un edificio con sus desbloqueos
 */
@Injectable()
export class ObtenerEdificioConDesbloqueosUseCase {
  constructor(
    private readonly edificioRepository: EdificioRepository,
  ) {}

  async execute(id: number): Promise<(Edificio & { desbloqueos: any }) | null> {
    const edificioEntity = await this.edificioRepository.findWithRelations(id);

    if (!edificioEntity) {
      return null;
    }

    const desbloqueos = await this.edificioRepository.findDesbloqueosByEdificioId(id);

    return {
      ...edificioEntity,
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

