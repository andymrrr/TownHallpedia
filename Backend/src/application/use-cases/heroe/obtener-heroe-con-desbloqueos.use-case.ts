import { Injectable } from '@nestjs/common';
import { HeroeRepository } from '../../../infrastructure/persistence/repositories/heroe.repository';
import { HeroeConDesbloqueos } from '../../../domain/types/desbloqueos.types';

/**
 * Caso de uso: Obtener un héroe con sus desbloqueos
 */
@Injectable()
export class ObtenerHeroeConDesbloqueosUseCase {
  constructor(
    private readonly heroeRepository: HeroeRepository,
  ) {}

  async execute(id: number): Promise<HeroeConDesbloqueos | null> {
    const heroeEntity = await this.heroeRepository.findOne(id);

    if (!heroeEntity) {
      return null;
    }

    const desbloqueos = await this.heroeRepository.findDesbloqueosByHeroeId(id);

    return {
      ...heroeEntity,
      desbloqueos,
    };
  }
}

