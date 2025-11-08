import { Injectable } from '@nestjs/common';
import { AyuntamientoRepository } from '../../../infrastructure/persistence/repositories/ayuntamiento.repository';
import { AyuntamientoMapper } from '../../../infrastructure/persistence/mappers/ayuntamiento.mapper';
import { AyuntamientoDomain } from '../../../domain/entities/ayuntamiento.domain';
import { AyuntamientoConDesbloqueos } from '../../../domain/types/desbloqueos.types';

/**
 * Caso de uso: Obtener un ayuntamiento con sus desbloqueos
 * Encapsula la lógica de negocio para obtener un ayuntamiento y sus desbloqueos asociados
 */
@Injectable()
export class ObtenerAyuntamientoConDesbloqueosUseCase {
  constructor(
    private readonly ayuntamientoRepository: AyuntamientoRepository,
  ) {}

  /**
   * Ejecuta el caso de uso
   * @param id ID del ayuntamiento
   * @returns Ayuntamiento con sus desbloqueos o null si no existe
   */
  async execute(id: number): Promise<AyuntamientoConDesbloqueos | null> {
    // Obtener el ayuntamiento con sus relaciones
    const ayuntamientoEntity = await this.ayuntamientoRepository.findWithRelations(id);

    if (!ayuntamientoEntity) {
      return null;
    }

    // Obtener los desbloqueos del ayuntamiento
    const desbloqueos = await this.ayuntamientoRepository.findDesbloqueosByAyuntamientoId(id);

    // Retornar el ayuntamiento con sus desbloqueos
    return {
      ...ayuntamientoEntity,
      desbloqueos,
    };
  }
}

