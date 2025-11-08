import { Hechizo as HechizoEntity } from '../entities/hechizo.entity';
import { HechizoDomain } from '../../../domain/entities/hechizo.domain';

export class HechizoMapper {
  static toDomain(entity: HechizoEntity): HechizoDomain {
    return new HechizoDomain(
      entity.id,
      entity.nombre,
      entity.tipo,
      entity.espacioHechizo,
      entity.descripcion,
      entity.portada,
      entity.fechaCreacion,
      entity.fechaActualizacion,
    );
  }

  static toEntity(domain: HechizoDomain): Partial<HechizoEntity> {
    return {
      id: domain.id,
      nombre: domain.nombre,
      tipo: domain.tipo ?? undefined,
      espacioHechizo: domain.espacioHechizo ?? undefined,
      descripcion: domain.descripcion ?? undefined,
      portada: domain.portada ?? undefined,
    };
  }

  static toDomainArray(entities: HechizoEntity[]): HechizoDomain[] {
    return entities.map(entity => this.toDomain(entity));
  }

  static toEntityArray(domains: HechizoDomain[]): Partial<HechizoEntity>[] {
    return domains.map(domain => this.toEntity(domain));
  }
}

