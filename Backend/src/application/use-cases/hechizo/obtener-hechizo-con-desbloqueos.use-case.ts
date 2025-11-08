import { Injectable } from '@nestjs/common';
import { HechizoRepository } from '../../../infrastructure/persistence/repositories/hechizo.repository';
import { HechizoConDesbloqueos } from '../../../domain/types/desbloqueos.types';

/**
 * Caso de uso: Obtener un hechizo con sus desbloqueos
 */
@Injectable()
export class ObtenerHechizoConDesbloqueosUseCase {
  constructor(
    private readonly hechizoRepository: HechizoRepository,
  ) {}

  async execute(id: number): Promise<HechizoConDesbloqueos | null> {
    const hechizoEntity = await this.hechizoRepository.findOne(id);

    if (!hechizoEntity) {
      return null;
    }

    const desbloqueos = await this.hechizoRepository.findDesbloqueosByHechizoId(id);

    return {
      ...hechizoEntity,
      desbloqueos,
    };
  }
}

