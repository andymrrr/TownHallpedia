import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaginationQueryDto, PageDto } from '../common/pagination/pagination.dto';
import { paginateQueryBuilder } from '../common/pagination/paginate-typeorm';
import { DesbloqueosAyuntamiento } from '../entities/desbloqueos-ayuntamiento.entity';
import { TipoEntidad } from '../entities/nivel-detalle.entity';
import { BaseService } from './base.service';
import { CreateDesbloqueosAyuntamientoDto, UpdateDesbloqueosAyuntamientoDto } from '../dto/desbloqueos-ayuntamiento.dto';

@Injectable()
export class DesbloqueosAyuntamientoService extends BaseService<DesbloqueosAyuntamiento> {
  constructor(
    @InjectRepository(DesbloqueosAyuntamiento)
    private readonly desbloqueosRepository: Repository<DesbloqueosAyuntamiento>,
  ) {
    super(desbloqueosRepository);
  }

  async findByAyuntamiento(ayuntamientoId: number): Promise<DesbloqueosAyuntamiento[]> {
    return this.desbloqueosRepository.find({
      where: { ayuntamientoId } as any,
      relations: ['ayuntamiento'],
    });
  }

  async findByEntidad(tipoEntidad: TipoEntidad, entidadId: number): Promise<DesbloqueosAyuntamiento[]> {
    return this.desbloqueosRepository.find({
      where: { tipoEntidad, entidadId } as any,
      relations: ['ayuntamiento'],
    });
  }

  async findByAyuntamientoAndEntidad(
    ayuntamientoId: number,
    tipoEntidad: TipoEntidad,
    entidadId: number
  ): Promise<DesbloqueosAyuntamiento | null> {
    return this.desbloqueosRepository.findOne({
      where: { ayuntamientoId, tipoEntidad, entidadId } as any,
      relations: ['ayuntamiento'],
    });
  }

  async findWithRelations(id: number): Promise<DesbloqueosAyuntamiento | null> {
    return this.desbloqueosRepository.findOne({
      where: { id } as any,
      relations: ['ayuntamiento'],
    });
  }

  async paginate(query: PaginationQueryDto): Promise<PageDto<DesbloqueosAyuntamiento>> {
    const qb = this.desbloqueosRepository.createQueryBuilder('d');
    if (query.search) {
      qb.andWhere('(CAST(d.ayuntamientoId as text) LIKE :s OR CAST(d.entidadId as text) LIKE :s)', { s: `%${query.search}%` });
    }
    return paginateQueryBuilder(qb, query, [['d.id', 'DESC']]);
  }

  async createDesbloqueo(createDto: CreateDesbloqueosAyuntamientoDto): Promise<DesbloqueosAyuntamiento> {
    // Verificar que no exista el mismo desbloqueo
    const existingDesbloqueo = await this.findByAyuntamientoAndEntidad(
      createDto.ayuntamientoId,
      createDto.tipoEntidad,
      createDto.entidadId
    );
    if (existingDesbloqueo) {
      throw new Error(
        `Ya existe un desbloqueo para ${createDto.tipoEntidad} con ID ${createDto.entidadId} en el ayuntamiento ${createDto.ayuntamientoId}`
      );
    }

    return this.create(createDto);
  }

  async updateDesbloqueo(id: number, updateDto: UpdateDesbloqueosAyuntamientoDto): Promise<DesbloqueosAyuntamiento | null> {
    // Verificar que no exista otro desbloqueo con la misma combinación
    const existingDesbloqueo = await this.findByAyuntamientoAndEntidad(
      updateDto.ayuntamientoId,
      updateDto.tipoEntidad,
      updateDto.entidadId
    );
    if (existingDesbloqueo && existingDesbloqueo.id !== id) {
      throw new Error(
        `Ya existe un desbloqueo para ${updateDto.tipoEntidad} con ID ${updateDto.entidadId} en el ayuntamiento ${updateDto.ayuntamientoId}`
      );
    }

    return this.update(id, updateDto);
  }
}
