import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaginationQueryDto, PageDto } from '../common/pagination/pagination.dto';
import { paginateQueryBuilder } from '../common/pagination/paginate-typeorm';
import { Tropa } from '../entities/tropa.entity';
import { BaseService } from './base.service';
import { CreateTropaDto, UpdateTropaDto } from '../dto/tropa.dto';

@Injectable()
export class TropaService extends BaseService<Tropa> {
  constructor(
    @InjectRepository(Tropa)
    private readonly tropaRepository: Repository<Tropa>,
  ) {
    super(tropaRepository);
  }

  async findByTipo(tipo: string): Promise<Tropa[]> {
    return this.tropaRepository.find({
      where: { tipo } as any,
    });
  }

  async findByName(nombre: string): Promise<Tropa | null> {
    return this.findOneBy({ nombre } as any);
  }

  async findByCuartel(cuartelId: number): Promise<Tropa[]> {
    return this.tropaRepository.find({
      where: { desbloqueaEnCuartelId: cuartelId } as any,
      relations: ['desbloqueaEnCuartel'],
    });
  }

  async findWithRelations(id: number): Promise<Tropa | null> {
    return this.tropaRepository.findOne({
      where: { id } as any,
      relations: ['desbloqueaEnCuartel', 'nivelesDetalle', 'desbloqueos'],
    });
  }

  async paginate(query: PaginationQueryDto): Promise<PageDto<Tropa>> {
    const qb = this.tropaRepository.createQueryBuilder('t');
    if (query.search) {
      qb.andWhere('t.nombre LIKE :s', { s: `%${query.search}%` });
    }
    return paginateQueryBuilder(qb, query, [['t.id', 'DESC']]);
  }

  async createTropa(createDto: CreateTropaDto): Promise<Tropa> {
    // Verificar que el nombre no exista
    const existingTropa = await this.findByName(createDto.nombre);
    if (existingTropa) {
      throw new Error(`Ya existe una tropa con el nombre ${createDto.nombre}`);
    }

    // Mapear DTO a entidad (ya está correcto porque los tipos coinciden)
    return this.create(createDto as Partial<Tropa>);
  }

  async updateTropa(id: number, updateDto: UpdateTropaDto): Promise<Tropa | null> {
    // Si se está cambiando el nombre, verificar que no exista otra con el mismo nombre
    if (updateDto.nombre) {
      const existingTropa = await this.findByName(updateDto.nombre);
      if (existingTropa && existingTropa.id !== id) {
        throw new Error(`Ya existe una tropa con el nombre ${updateDto.nombre}`);
      }
    }

    // Mapear DTO a entidad (ya está correcto porque los tipos coinciden)
    return this.update(id, updateDto as Partial<Tropa>);
  }
}
