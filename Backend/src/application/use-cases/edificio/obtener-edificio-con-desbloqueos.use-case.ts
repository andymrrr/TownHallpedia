import { Injectable } from '@nestjs/common';
import { EdificioRepository } from '../../../infrastructure/persistence/repositories/edificio.repository';
import { EdificioConDesbloqueos } from '../../../domain/types/desbloqueos.types';

/**
 * Caso de uso: Obtener un edificio con sus desbloqueos
 */
@Injectable()
export class ObtenerEdificioConDesbloqueosUseCase {
  constructor(
    private readonly edificioRepository: EdificioRepository,
  ) {}

  async execute(id: number): Promise<EdificioConDesbloqueos | null> {
    const edificioEntity = await this.edificioRepository.findWithRelations(id);

    if (!edificioEntity) {
      return null;
    }

    const desbloqueos = await this.edificioRepository.findDesbloqueosByEdificioId(id);

    return {
      ...edificioEntity,
      desbloqueos,
    };
  }
}

