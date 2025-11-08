import { Injectable, BadRequestException } from '@nestjs/common';
import { PaginationQueryDto, PageDto } from '../../common/pagination/pagination.dto';
import { paginateQueryBuilder } from '../../common/pagination/paginate-typeorm';
import { Hechizo } from '../../infrastructure/persistence/entities/hechizo.entity';
import { CreateHechizoDto, UpdateHechizoDto } from '../../presentation/dto/hechizo.dto';
import { IHechizoService } from '../../domain/interfaces/hechizo.service.interface';
import { HechizoRepository } from '../../infrastructure/persistence/repositories/hechizo.repository';
import { ObtenerHechizoConDesbloqueosUseCase } from '../use-cases/hechizo/obtener-hechizo-con-desbloqueos.use-case';
import { HechizoConDesbloqueos } from '../../domain/types/desbloqueos.types';

@Injectable()
export class HechizoService implements IHechizoService {
  constructor(
    private readonly hechizoRepository: HechizoRepository,
    private readonly obtenerHechizoConDesbloqueosUseCase: ObtenerHechizoConDesbloqueosUseCase,
  ) {}

  async findAll(): Promise<Hechizo[]> {
    return this.hechizoRepository.findAll();
  }

  async findOne(id: number): Promise<Hechizo | null> {
    return this.hechizoRepository.findOne(id);
  }

  async findByTipo(tipo: string): Promise<Hechizo[]> {
    return this.hechizoRepository.findByTipo(tipo);
  }

  async findByName(nombre: string): Promise<Hechizo | null> {
    return this.hechizoRepository.findByName(nombre);
  }

  async findByEspacioHechizo(espacioHechizo: number): Promise<Hechizo[]> {
    return this.hechizoRepository.findByEspacioHechizo(espacioHechizo);
  }

  async findWithRelations(id: number): Promise<Hechizo | null> {
    return this.hechizoRepository.findWithRelations(id);
  }

  async findWithDesbloqueos(id: number): Promise<HechizoConDesbloqueos | null> {
    return this.obtenerHechizoConDesbloqueosUseCase.execute(id);
  }

  async paginate(query: PaginationQueryDto): Promise<PageDto<Hechizo>> {
    const qb = this.hechizoRepository.createQueryBuilder('h');
    if (query.search) {
      qb.andWhere('h.nombre LIKE :s', { s: `%${query.search}%` });
    }
    return paginateQueryBuilder(qb, query, [['h.id', 'DESC']]);
  }

  async createHechizo(createDto: CreateHechizoDto): Promise<Hechizo> {
    // Verificar que el nombre no exista
    const existingHechizo = await this.findByName(createDto.nombre);
    if (existingHechizo) {
      throw new BadRequestException(`Ya existe un hechizo con el nombre ${createDto.nombre}`);
    }

    return this.hechizoRepository.create(createDto as Partial<Hechizo>);
  }

  async updateHechizo(id: number, updateDto: UpdateHechizoDto): Promise<Hechizo | null> {
    // Si se está cambiando el nombre, verificar que no exista otro con el mismo nombre
    if (updateDto.nombre) {
      const existingHechizo = await this.findByName(updateDto.nombre);
      if (existingHechizo && existingHechizo.id !== id) {
        throw new BadRequestException(`Ya existe un hechizo con el nombre ${updateDto.nombre}`);
      }
    }

    return this.hechizoRepository.update(id, updateDto as Partial<Hechizo>);
  }

  async delete(id: number): Promise<boolean> {
    return this.hechizoRepository.delete(id);
  }
}

