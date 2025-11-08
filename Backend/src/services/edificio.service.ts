import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaginationQueryDto, PageDto } from '../common/pagination/pagination.dto';
import { paginateQueryBuilder } from '../common/pagination/paginate-typeorm';
import { Edificio } from '../entities/edificio.entity';
import { BaseService } from './base.service';
import { CreateEdificioDto, UpdateEdificioDto } from '../dto/edificio.dto';

@Injectable()
export class EdificioService extends BaseService<Edificio> {
  constructor(
    @InjectRepository(Edificio)
    private readonly edificioRepository: Repository<Edificio>,
  ) {
    super(edificioRepository);
  }

  async findByTipo(tipo: string): Promise<Edificio[]> {
    return this.edificioRepository.find({
      where: { tipo } as any,
    });
  }

  async findByName(nombre: string): Promise<Edificio | null> {
    return this.findOneBy({ nombre } as any);
  }

  async findWithTropas(id: number): Promise<Edificio | null> {
    return this.edificioRepository.findOne({
      where: { id } as any,
      relations: ['tropas', 'nivelesDetalle', 'desbloqueos'],
    });
  }

  async paginate(query: PaginationQueryDto): Promise<PageDto<Edificio>> {
    const qb = this.edificioRepository.createQueryBuilder('e');
    if (query.search) {
      qb.andWhere('e.nombre LIKE :s', { s: `%${query.search}%` });
    }
    return paginateQueryBuilder(qb, query, [['e.id', 'DESC']]);
  }

  async createEdificio(createDto: CreateEdificioDto): Promise<Edificio> {
    // Verificar que el nombre no exista
    const existingEdificio = await this.findByName(createDto.nombre);
    if (existingEdificio) {
      throw new Error(`Ya existe un edificio con el nombre ${createDto.nombre}`);
    }

    // Mapear DTO a entidad (ya está correcto porque los tipos coinciden)
    return this.create(createDto as Partial<Edificio>);
  }

  async updateEdificio(id: number, updateDto: UpdateEdificioDto): Promise<Edificio | null> {
    // Si se está cambiando el nombre, verificar que no exista otro con el mismo nombre
    if (updateDto.nombre) {
      const existingEdificio = await this.findByName(updateDto.nombre);
      if (existingEdificio && existingEdificio.id !== id) {
        throw new Error(`Ya existe un edificio con el nombre ${updateDto.nombre}`);
      }
    }

    // Mapear DTO a entidad (ya está correcto porque los tipos coinciden)
    return this.update(id, updateDto as Partial<Edificio>);
  }
}
