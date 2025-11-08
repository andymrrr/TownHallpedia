import { Heroe as HeroeEntity } from '../entities/heroe.entity';
import { HeroeDomain } from '../../../domain/entities/heroe.domain';

export class HeroeMapper {
  static toDomain(entity: HeroeEntity): HeroeDomain {
    return new HeroeDomain(
      entity.id,
      entity.nombre,
      entity.descripcion,
      entity.tipoRecursoId,
      entity.portada,
      entity.nivelMaximo,
      entity.nivelAyuntamientoDesbloqueo,
      entity.vida,
      entity.fechaCreacion,
      entity.fechaActualizacion,
      entity.tipoRecurso,
      entity.habilidades,
    );
  }

  static toEntity(domain: HeroeDomain): Partial<HeroeEntity> {
    return {
      id: domain.id,
      nombre: domain.nombre,
      descripcion: domain.descripcion ?? undefined,
      tipoRecursoId: domain.tipoRecursoId ?? undefined,
      portada: domain.portada ?? undefined,
      nivelMaximo: domain.nivelMaximo ?? undefined,
      nivelAyuntamientoDesbloqueo: domain.nivelAyuntamientoDesbloqueo ?? undefined,
      vida: domain.vida ?? undefined,
    };
  }

  static toDomainArray(entities: HeroeEntity[]): HeroeDomain[] {
    return entities.map(entity => this.toDomain(entity));
  }

  static toEntityArray(domains: HeroeDomain[]): Partial<HeroeEntity>[] {
    return domains.map(domain => this.toEntity(domain));
  }
}

