import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaginationQueryDto, PageDto } from '../common/pagination/pagination.dto';
import { paginateQueryBuilder } from '../common/pagination/paginate-typeorm';
import { Heroe } from '../entities/heroe.entity';
import { DesbloqueosAyuntamientoHeroe } from '../entities/desbloqueos-ayuntamiento-heroe.entity';
import { BaseService } from './base.service';
import { CreateHeroeDto, UpdateHeroeDto } from '../dto/heroe.dto';

@Injectable()
export class HeroeService extends BaseService<Heroe> {
  constructor(
    @InjectRepository(Heroe)
    private readonly heroeRepository: Repository<Heroe>,
    @InjectRepository(DesbloqueosAyuntamientoHeroe)
    private readonly desbloqueosRepository: Repository<DesbloqueosAyuntamientoHeroe>,
  ) {
    super(heroeRepository);
  }

  async findByTipoRecurso(tipoRecurso: string): Promise<Heroe[]> {
    return this.heroeRepository.find({
      where: { tipoRecurso } as any,
    });
  }

  async findByName(nombre: string): Promise<Heroe | null> {
    return this.findOneBy({ nombre } as any);
  }

  async findOne(id: number): Promise<Heroe | null> {
    return this.heroeRepository.findOne({
      where: { id } as any,
      relations: ['tipoRecurso', 'habilidades'],
    });
  }

  async findAll(): Promise<Heroe[]> {
    return this.heroeRepository.find({
      relations: ['tipoRecurso', 'habilidades'],
    });
  }

  async findWithRelations(id: number): Promise<Heroe | null> {
    return this.heroeRepository.findOne({
      where: { id } as any,
      relations: ['tipoRecurso', 'habilidades', 'nivelesDetalle', 'desbloqueos'],
    });
  }

  async findWithDesbloqueos(id: number): Promise<Heroe | null> {
    const heroe = await this.heroeRepository.findOne({
      where: { id } as any,
      relations: ['tipoRecurso', 'habilidades'],
    });

    if (!heroe) {
      return null;
    }

    // Obtener todos los desbloqueos de este héroe en diferentes ayuntamientos
    const desbloqueos = await this.desbloqueosRepository.find({
      where: { heroeId: id },
      relations: ['ayuntamiento'],
      order: { ayuntamiento: { nivel: 'ASC' } } as any,
    });

    return {
      ...heroe,
      desbloqueos: desbloqueos.map(desbloqueo => ({
        ayuntamientoId: desbloqueo.ayuntamientoId,
        ayuntamiento: desbloqueo.ayuntamiento,
        esNuevo: desbloqueo.esNuevo,
        nivelMinimoDisponible: desbloqueo.nivelMinimoDisponible,
        nivelMaximoDisponible: desbloqueo.nivelMaximoDisponible,
      })),
    } as any;
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
      throw new Error(`Ya existe un héroe con el nombre ${createDto.nombre}`);
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

    return this.create(heroeData);
  }

  async updateHeroe(id: number, updateDto: UpdateHeroeDto): Promise<Heroe | null> {
    // Si se está cambiando el nombre, verificar que no exista otro con el mismo nombre
    if (updateDto.nombre) {
      const existingHeroe = await this.findByName(updateDto.nombre);
      if (existingHeroe && existingHeroe.id !== id) {
        throw new Error(`Ya existe un héroe con el nombre ${updateDto.nombre}`);
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

    return this.update(id, heroeData);
  }
}
