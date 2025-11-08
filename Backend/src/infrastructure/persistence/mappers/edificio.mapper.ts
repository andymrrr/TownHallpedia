import { Edificio as EdificioEntity } from '../entities/edificio.entity';
import { EdificioDomain } from '../../../domain/entities/edificio.domain';

export class EdificioMapper {
  static toDomain(entity: EdificioEntity): EdificioDomain {
    return new EdificioDomain(
      entity.id,
      entity.nombre,
      entity.tipo,
      entity.descripcion,
      entity.portada,
      entity.fechaCreacion,
      entity.fechaActualizacion,
      entity.tropas,
    );
  }

  static toEntity(domain: EdificioDomain): Partial<EdificioEntity> {
    return {
      id: domain.id,
      nombre: domain.nombre,
      tipo: domain.tipo ?? undefined,
      descripcion: domain.descripcion ?? undefined,
      portada: domain.portada ?? undefined,
    };
  }

  static toDomainArray(entities: EdificioEntity[]): EdificioDomain[] {
    return entities.map(entity => this.toDomain(entity));
  }

  static toEntityArray(domains: EdificioDomain[]): Partial<EdificioEntity>[] {
    return domains.map(domain => this.toEntity(domain));
  }
}

