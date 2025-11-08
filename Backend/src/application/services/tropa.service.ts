import { Injectable, BadRequestException } from '@nestjs/common';
import { PaginationQueryDto, PageDto } from '../../common/pagination/pagination.dto';
import { paginateQueryBuilder } from '../../common/pagination/paginate-typeorm';
import { Tropa } from '../../infrastructure/persistence/entities/tropa.entity';
import { CreateTropaDto, UpdateTropaDto } from '../../presentation/dto/tropa.dto';
import { ITropaService } from '../../domain/interfaces/tropa.service.interface';
import { TropaRepository } from '../../infrastructure/persistence/repositories/tropa.repository';

@Injectable()
export class TropaService implements ITropaService {
  constructor(
    private readonly tropaRepository: TropaRepository,
  ) {}

  async findAll(): Promise<Tropa[]> {
    return this.tropaRepository.findAll();
  }

  async findOne(id: number): Promise<Tropa | null> {
    return this.tropaRepository.findOne(id);
  }

  async findByTipo(tipo: string): Promise<Tropa[]> {
    return this.tropaRepository.findByTipo(tipo);
  }

  async findByName(nombre: string): Promise<Tropa | null> {
    return this.tropaRepository.findByName(nombre);
  }

  async findByCuartel(cuartelId: number): Promise<Tropa[]> {
    return this.tropaRepository.findByCuartel(cuartelId);
  }

  async findWithRelations(id: number): Promise<Tropa | null> {
    return this.tropaRepository.findWithRelations(id);
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
      throw new BadRequestException(`Ya existe una tropa con el nombre ${createDto.nombre}`);
    }

    return this.tropaRepository.create(createDto as Partial<Tropa>);
  }

  async updateTropa(id: number, updateDto: UpdateTropaDto): Promise<Tropa | null> {
    // Si se está cambiando el nombre, verificar que no exista otra con el mismo nombre
    if (updateDto.nombre) {
      const existingTropa = await this.findByName(updateDto.nombre);
      if (existingTropa && existingTropa.id !== id) {
        throw new BadRequestException(`Ya existe una tropa con el nombre ${updateDto.nombre}`);
      }
    }

    return this.tropaRepository.update(id, updateDto as Partial<Tropa>);
  }

  async delete(id: number): Promise<boolean> {
    return this.tropaRepository.delete(id);
  }
}

