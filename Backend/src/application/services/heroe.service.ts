import { Injectable, BadRequestException } from '@nestjs/common';
import { PaginationQueryDto, PageDto } from '../../common/pagination/pagination.dto';
import { paginateQueryBuilder } from '../../common/pagination/paginate-typeorm';
import { Heroe } from '../../infrastructure/persistence/entities/heroe.entity';
import { CreateHeroeDto, UpdateHeroeDto } from '../../presentation/dto/heroe.dto';
import { IHeroeService } from '../../domain/interfaces/heroe.service.interface';
import { HeroeRepository } from '../../infrastructure/persistence/repositories/heroe.repository';
import { ObtenerHeroeConDesbloqueosUseCase } from '../use-cases/heroe/obtener-heroe-con-desbloqueos.use-case';

@Injectable()
export class HeroeService implements IHeroeService {
  constructor(
    private readonly heroeRepository: HeroeRepository,
    private readonly obtenerHeroeConDesbloqueosUseCase: ObtenerHeroeConDesbloqueosUseCase,
  ) {}

  async findAll(): Promise<Heroe[]> {
    return this.heroeRepository.findAll();
  }

  async findOne(id: number): Promise<Heroe | null> {
    return this.heroeRepository.findOne(id);
  }

  async findByTipoRecurso(tipoRecurso: string): Promise<Heroe[]> {
    return this.heroeRepository.findByTipoRecurso(tipoRecurso);
  }

  async findByName(nombre: string): Promise<Heroe | null> {
    return this.heroeRepository.findByName(nombre);
  }

  async findWithRelations(id: number): Promise<Heroe | null> {
    return this.heroeRepository.findWithRelations(id);
  }

  async findWithDesbloqueos(id: number): Promise<Heroe | null> {
    return this.obtenerHeroeConDesbloqueosUseCase.execute(id);
  }

  async paginate(query: PaginationQueryDto): Promise<PageDto<Heroe>> {
    const qb = this.heroeRepository.createQueryBuilder('h');
    if (query.search) {
      qb.andWhere('h.nombre LIKE :s', { s: `%${query.search}%` });
    }
    return paginateQueryBuilder(qb, query, [['h.id', 'DESC']]);
  }

  async createHeroe(createDto: CreateHeroeDto): Promise<Heroe> {
    // Verificar que el nombre no exista
    const existingHeroe = await this.findByName(createDto.nombre);
    if (existingHeroe) {
      throw new BadRequestException(`Ya existe un héroe con el nombre ${createDto.nombre}`);
    }

    // Mapear DTO a entidad
    const heroeData: Partial<Heroe> = {
      nombre: createDto.nombre,
      descripcion: createDto.descripcion,
      tipoRecursoId: createDto.tipoRecursoId,
      portada: createDto.portada,
      nivelMaximo: createDto.nivelMaximo,
      nivelAyuntamientoDesbloqueo: createDto.nivelAyuntamientoDesbloqueo,
      vida: createDto.vida,
    };

    return this.heroeRepository.create(heroeData);
  }

  async updateHeroe(id: number, updateDto: UpdateHeroeDto): Promise<Heroe | null> {
    // Si se está cambiando el nombre, verificar que no exista otro con el mismo nombre
    if (updateDto.nombre) {
      const existingHeroe = await this.findByName(updateDto.nombre);
      if (existingHeroe && existingHeroe.id !== id) {
        throw new BadRequestException(`Ya existe un héroe con el nombre ${updateDto.nombre}`);
      }
    }

    // Mapear DTO a entidad
    const heroeData: Partial<Heroe> = {
      nombre: updateDto.nombre,
      descripcion: updateDto.descripcion,
      tipoRecursoId: updateDto.tipoRecursoId,
      portada: updateDto.portada,
      nivelMaximo: updateDto.nivelMaximo,
      nivelAyuntamientoDesbloqueo: updateDto.nivelAyuntamientoDesbloqueo,
      vida: updateDto.vida,
    };

    return this.heroeRepository.update(id, heroeData);
  }

  async delete(id: number): Promise<boolean> {
    return this.heroeRepository.delete(id);
  }
}
