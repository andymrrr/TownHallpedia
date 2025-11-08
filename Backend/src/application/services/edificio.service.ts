import { Injectable, BadRequestException } from '@nestjs/common';
import { PaginationQueryDto, PageDto } from '../../common/pagination/pagination.dto';
import { paginateQueryBuilder } from '../../common/pagination/paginate-typeorm';
import { Edificio } from '../../infrastructure/persistence/entities/edificio.entity';
import { CreateEdificioDto, UpdateEdificioDto } from '../../presentation/dto/edificio.dto';
import { IEdificioService } from '../../domain/interfaces/edificio.service.interface';
import { EdificioRepository } from '../../infrastructure/persistence/repositories/edificio.repository';
import { ObtenerEdificioConDesbloqueosUseCase } from '../use-cases/edificio/obtener-edificio-con-desbloqueos.use-case';
import { EdificioConDesbloqueos } from '../../domain/types/desbloqueos.types';

@Injectable()
export class EdificioService implements IEdificioService {
  constructor(
    private readonly edificioRepository: EdificioRepository,
    private readonly obtenerEdificioConDesbloqueosUseCase: ObtenerEdificioConDesbloqueosUseCase,
  ) {}

  async findAll(): Promise<Edificio[]> {
    return this.edificioRepository.findAll();
  }

  async findOne(id: number): Promise<Edificio | null> {
    return this.edificioRepository.findOne(id);
  }

  async findByTipo(tipo: string): Promise<Edificio[]> {
    return this.edificioRepository.findByTipo(tipo);
  }

  async findByName(nombre: string): Promise<Edificio | null> {
    return this.edificioRepository.findByName(nombre);
  }

  async findWithTropas(id: number): Promise<Edificio | null> {
    return this.edificioRepository.findWithTropas(id);
  }

  async findWithDesbloqueos(id: number): Promise<EdificioConDesbloqueos | null> {
    return this.obtenerEdificioConDesbloqueosUseCase.execute(id);
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
      throw new BadRequestException(`Ya existe un edificio con el nombre ${createDto.nombre}`);
    }

    return this.edificioRepository.create(createDto as Partial<Edificio>);
  }

  async updateEdificio(id: number, updateDto: UpdateEdificioDto): Promise<Edificio | null> {
    // Si se está cambiando el nombre, verificar que no exista otro con el mismo nombre
    if (updateDto.nombre) {
      const existingEdificio = await this.findByName(updateDto.nombre);
      if (existingEdificio && existingEdificio.id !== id) {
        throw new BadRequestException(`Ya existe un edificio con el nombre ${updateDto.nombre}`);
      }
    }

    return this.edificioRepository.update(id, updateDto as Partial<Edificio>);
  }

  async delete(id: number): Promise<boolean> {
    return this.edificioRepository.delete(id);
  }
}

