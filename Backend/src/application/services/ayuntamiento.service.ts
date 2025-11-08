import { Injectable, BadRequestException } from '@nestjs/common';
import { PaginationQueryDto, PaginationVm } from '../../common/pagination/pagination.dto';
import { paginateVmQueryBuilder } from '../../common/pagination/paginate-typeorm';
import { Ayuntamiento } from '../../infrastructure/persistence/entities/ayuntamiento.entity';
import { CreateAyuntamientoDto, UpdateAyuntamientoDto } from '../../presentation/dto/ayuntamiento.dto';
import { IAyuntamientoService } from '../../domain/interfaces/ayuntamiento.service.interface';
import { AyuntamientoRepository } from '../../infrastructure/persistence/repositories/ayuntamiento.repository';
import { ObtenerAyuntamientoConDesbloqueosUseCase } from '../use-cases/ayuntamiento/obtener-ayuntamiento-con-desbloqueos.use-case';
import { ObtenerAyuntamientoPorNivelConDesbloqueosUseCase } from '../use-cases/ayuntamiento/obtener-ayuntamiento-por-nivel-con-desbloqueos.use-case';

@Injectable()
export class AyuntamientoService implements IAyuntamientoService {
  constructor(
    private readonly ayuntamientoRepository: AyuntamientoRepository,
    private readonly obtenerAyuntamientoConDesbloqueosUseCase: ObtenerAyuntamientoConDesbloqueosUseCase,
    private readonly obtenerAyuntamientoPorNivelConDesbloqueosUseCase: ObtenerAyuntamientoPorNivelConDesbloqueosUseCase,
  ) {}

  async findAll(): Promise<Ayuntamiento[]> {
    return this.ayuntamientoRepository.findAll();
  }

  async findOne(id: number): Promise<Ayuntamiento | null> {
    return this.ayuntamientoRepository.findOne(id);
  }

  async findByNivel(nivel: number): Promise<Ayuntamiento | null> {
    return this.ayuntamientoRepository.findByNivel(nivel);
  }

  async findByTipoRecurso(tipoRecursoId: number): Promise<Ayuntamiento[]> {
    return this.ayuntamientoRepository.findByTipoRecurso(tipoRecursoId);
  }

  async findWithDesbloqueos(id: number): Promise<Ayuntamiento | null> {
    return this.obtenerAyuntamientoConDesbloqueosUseCase.execute(id);
  }

  async findByNivelWithDesbloqueos(nivel: number): Promise<Ayuntamiento | null> {
    return this.obtenerAyuntamientoPorNivelConDesbloqueosUseCase.execute(nivel);
  }

  async paginate(query: PaginationQueryDto): Promise<PaginationVm<Ayuntamiento>> {
    const qb = this.ayuntamientoRepository.createQueryBuilder('a');

    if (query.search) {
      qb.andWhere('a.nivel::text LIKE :s', { s: `%${query.search}%` });
    }

    return paginateVmQueryBuilder(qb, query, [['a.id', 'DESC']]);
  }

  async createAyuntamiento(createDto: CreateAyuntamientoDto): Promise<Ayuntamiento> {
    // Verificar que el nivel no exista
    const existingAyuntamiento = await this.findByNivel(createDto.nivel);
    if (existingAyuntamiento) {
      throw new BadRequestException(`Ya existe un ayuntamiento con nivel ${createDto.nivel}`);
    }

    return this.ayuntamientoRepository.create(createDto);
  }

  async updateAyuntamiento(id: number, updateDto: UpdateAyuntamientoDto): Promise<Ayuntamiento | null> {
    // Si se está cambiando el nivel, verificar que no exista otro con el mismo nivel
    if (updateDto.nivel) {
      const existingAyuntamiento = await this.findByNivel(updateDto.nivel);
      if (existingAyuntamiento && existingAyuntamiento.id !== id) {
        throw new BadRequestException(`Ya existe un ayuntamiento con nivel ${updateDto.nivel}`);
      }
    }

    return this.ayuntamientoRepository.update(id, updateDto);
  }

  async delete(id: number): Promise<boolean> {
    return this.ayuntamientoRepository.delete(id);
  }
}

