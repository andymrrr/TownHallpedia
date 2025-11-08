import { Ayuntamiento as AyuntamientoEntity } from '../entities/ayuntamiento.entity';
import { AyuntamientoDomain } from '../../../domain/entities/ayuntamiento.domain';

/**
 * Mapper para convertir entre entidades de persistencia y entidades de dominio
 */
export class AyuntamientoMapper {
  /**
   * Convierte una entidad de persistencia a una entidad de dominio
   */
  static toDomain(entity: AyuntamientoEntity): AyuntamientoDomain {
    return new AyuntamientoDomain(
      entity.id,
      entity.nivel,
      entity.capacidadAlmacenOro,
      entity.capacidadAlmacenElixir,
      entity.capacidadAlmacenOscuro,
      entity.tiempoConstruccionHoras,
      entity.costoMejora,
      entity.tipoRecursoId,
      entity.portada,
      entity.fechaCreacion,
      entity.fechaActualizacion,
      entity.tipoRecurso,
    );
  }

  /**
   * Convierte una entidad de dominio a una entidad de persistencia (parcial)
   */
  static toEntity(domain: AyuntamientoDomain): Partial<AyuntamientoEntity> {
    return {
      id: domain.id,
      nivel: domain.nivel,
      capacidadAlmacenOro: domain.capacidadAlmacenOro ?? undefined,
      capacidadAlmacenElixir: domain.capacidadAlmacenElixir ?? undefined,
      capacidadAlmacenOscuro: domain.capacidadAlmacenOscuro ?? undefined,
      tiempoConstruccionHoras: domain.tiempoConstruccionHoras ?? undefined,
      costoMejora: domain.costoMejora ?? undefined,
      tipoRecursoId: domain.tipoRecursoId ?? undefined,
      portada: domain.portada ?? undefined,
    };
  }

  /**
   * Convierte un array de entidades de persistencia a un array de entidades de dominio
   */
  static toDomainArray(entities: AyuntamientoEntity[]): AyuntamientoDomain[] {
    return entities.map(entity => this.toDomain(entity));
  }

  /**
   * Convierte un array de entidades de dominio a un array de entidades de persistencia (parciales)
   */
  static toEntityArray(domains: AyuntamientoDomain[]): Partial<AyuntamientoEntity>[] {
    return domains.map(domain => this.toEntity(domain));
  }
}

