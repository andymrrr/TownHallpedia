import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ayuntamiento } from '../entities/ayuntamiento.entity';
import { BaseService } from './base.service';
import { CreateAyuntamientoDto, UpdateAyuntamientoDto } from '../dto/ayuntamiento.dto';

@Injectable()
export class AyuntamientoService extends BaseService<Ayuntamiento> {
  constructor(
    @InjectRepository(Ayuntamiento)
    private readonly ayuntamientoRepository: Repository<Ayuntamiento>,
  ) {
    super(ayuntamientoRepository);
  }

  async findByNivel(nivel: number): Promise<Ayuntamiento | null> {
    return this.findOneBy({ nivel } as any);
  }

  async findByTipoRecurso(tipoRecurso: string): Promise<Ayuntamiento[]> {
    return this.ayuntamientoRepository.find({
      where: { tipoRecurso } as any,
    });
  }

  async findWithDesbloqueos(id: number): Promise<Ayuntamiento | null> {
    return this.ayuntamientoRepository.findOne({
      where: { id } as any,
      relations: ['desbloqueos', 'nivelesDetalle'],
    });
  }

  async createAyuntamiento(createDto: CreateAyuntamientoDto): Promise<Ayuntamiento> {
    // Verificar que el nivel no exista
    const existingAyuntamiento = await this.findByNivel(createDto.nivel);
    if (existingAyuntamiento) {
      throw new Error(`Ya existe un ayuntamiento con nivel ${createDto.nivel}`);
    }

    return this.create(createDto);
  }

  async updateAyuntamiento(id: number, updateDto: UpdateAyuntamientoDto): Promise<Ayuntamiento | null> {
    // Si se está cambiando el nivel, verificar que no exista otro con el mismo nivel
    if (updateDto.nivel) {
      const existingAyuntamiento = await this.findByNivel(updateDto.nivel);
      if (existingAyuntamiento && existingAyuntamiento.id !== id) {
        throw new Error(`Ya existe un ayuntamiento con nivel ${updateDto.nivel}`);
      }
    }

    return this.update(id, updateDto);
  }
}
