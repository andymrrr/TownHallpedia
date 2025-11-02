import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaginationQueryDto, PageDto } from '../common/pagination/pagination.dto';
import { paginateQueryBuilder } from '../common/pagination/paginate-typeorm';
import { NivelDetalle, TipoEntidad } from '../entities/nivel-detalle.entity';
import { BaseService } from './base.service';
import { CreateNivelDetalleDto, UpdateNivelDetalleDto } from '../dto/nivel-detalle.dto';

@Injectable()
export class NivelDetalleService extends BaseService<NivelDetalle> {
  constructor(
    @InjectRepository(NivelDetalle)
    private readonly nivelDetalleRepository: Repository<NivelDetalle>,
  ) {
    super(nivelDetalleRepository);
  }

  async findByEntidad(tipoEntidad: TipoEntidad, entidadId: number): Promise<NivelDetalle[]> {
    return this.nivelDetalleRepository.find({
      where: { tipoEntidad, entidadId } as any,
      order: { nivel: 'ASC' },
    });
  }

  async findByNivel(tipoEntidad: TipoEntidad, entidadId: number, nivel: number): Promise<NivelDetalle | null> {
    return this.nivelDetalleRepository.findOne({
      where: { tipoEntidad, entidadId, nivel } as any,
    });
  }

  async findByAyuntamiento(ayuntamientoId: number): Promise<NivelDetalle[]> {
    return this.nivelDetalleRepository.find({
      where: { desbloqueaEnAyuntamientoId: ayuntamientoId } as any,
      relations: ['desbloqueaEnAyuntamiento'],
    });
  }

  async findWithRelations(id: number): Promise<NivelDetalle | null> {
    return this.nivelDetalleRepository.findOne({
      where: { id } as any,
      relations: ['desbloqueaEnAyuntamiento'],
    });
  }

  async paginate(query: PaginationQueryDto): Promise<PageDto<NivelDetalle>> {
    const qb = this.nivelDetalleRepository.createQueryBuilder('n');
    if (query.search) {
      qb.andWhere('CAST(n.nivel as text) LIKE :s OR CAST(n.entidadId as text) LIKE :s', { s: `%${query.search}%` });
    }
    return paginateQueryBuilder(qb, query, [['n.id', 'DESC']]);
  }

  async createNivelDetalle(createDto: CreateNivelDetalleDto): Promise<NivelDetalle> {
    // Verificar que no exista el mismo nivel para la misma entidad
    const existingNivel = await this.findByNivel(
      createDto.tipoEntidad,
      createDto.entidadId,
      createDto.nivel
    );
    if (existingNivel) {
      throw new Error(
        `Ya existe un nivel ${createDto.nivel} para ${createDto.tipoEntidad} con ID ${createDto.entidadId}`
      );
    }

    return this.create(createDto);
  }

  async updateNivelDetalle(id: number, updateDto: UpdateNivelDetalleDto): Promise<NivelDetalle | null> {
    // Si se está cambiando la combinación tipoEntidad/entidadId/nivel, verificar que no exista otra
    if (updateDto.tipoEntidad && updateDto.entidadId && updateDto.nivel) {
      const existingNivel = await this.findByNivel(
        updateDto.tipoEntidad,
        updateDto.entidadId,
        updateDto.nivel
      );
      if (existingNivel && existingNivel.id !== id) {
        throw new Error(
          `Ya existe un nivel ${updateDto.nivel} para ${updateDto.tipoEntidad} con ID ${updateDto.entidadId}`
        );
      }
    }

    return this.update(id, updateDto);
  }
}
