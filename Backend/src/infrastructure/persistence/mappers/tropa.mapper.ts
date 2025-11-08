import { Tropa as TropaEntity } from '../entities/tropa.entity';
import { TropaDomain } from '../../../domain/entities/tropa.domain';

export class TropaMapper {
  static toDomain(entity: TropaEntity): TropaDomain {
    return new TropaDomain(
      entity.id,
      entity.nombre,
      entity.tipo,
      entity.espacioEjercito,
      entity.descripcion,
      entity.portada,
      entity.desbloqueaEnCuartelId,
      entity.fechaCreacion,
      entity.fechaActualizacion,
      entity.desbloqueaEnCuartel,
    );
  }

  static toEntity(domain: TropaDomain): Partial<TropaEntity> {
    return {
      id: domain.id,
      nombre: domain.nombre,
      tipo: domain.tipo ?? undefined,
      espacioEjercito: domain.espacioEjercito ?? undefined,
      descripcion: domain.descripcion ?? undefined,
      portada: domain.portada ?? undefined,
      desbloqueaEnCuartelId: domain.desbloqueaEnCuartelId ?? undefined,
    };
  }

  static toDomainArray(entities: TropaEntity[]): TropaDomain[] {
    return entities.map(entity => this.toDomain(entity));
  }

  static toEntityArray(domains: TropaDomain[]): Partial<TropaEntity>[] {
    return domains.map(domain => this.toEntity(domain));
  }
}

