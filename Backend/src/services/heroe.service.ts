import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaginationQueryDto, PageDto } from '../common/pagination/pagination.dto';
import { paginateQueryBuilder } from '../common/pagination/paginate-typeorm';
import { Heroe } from '../entities/heroe.entity';
import { BaseService } from './base.service';
import { CreateHeroeDto, UpdateHeroeDto } from '../dto/heroe.dto';

@Injectable()
export class HeroeService extends BaseService<Heroe> {
  constructor(
    @InjectRepository(Heroe)
    private readonly heroeRepository: Repository<Heroe>,
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

  async findWithRelations(id: number): Promise<Heroe | null> {
    return this.heroeRepository.findOne({
      where: { id } as any,
      relations: ['nivelesDetalle', 'desbloqueos'],
    });
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

    return this.create(createDto);
  }

  async updateHeroe(id: number, updateDto: UpdateHeroeDto): Promise<Heroe | null> {
    // Si se está cambiando el nombre, verificar que no exista otro con el mismo nombre
    if (updateDto.nombre) {
      const existingHeroe = await this.findByName(updateDto.nombre);
      if (existingHeroe && existingHeroe.id !== id) {
        throw new Error(`Ya existe un héroe con el nombre ${updateDto.nombre}`);
      }
    }

    return this.update(id, updateDto);
  }
}
