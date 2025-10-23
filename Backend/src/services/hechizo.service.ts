import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Hechizo } from '../entities/hechizo.entity';
import { BaseService } from './base.service';
import { CreateHechizoDto, UpdateHechizoDto } from '../dto/hechizo.dto';

@Injectable()
export class HechizoService extends BaseService<Hechizo> {
  constructor(
    @InjectRepository(Hechizo)
    private readonly hechizoRepository: Repository<Hechizo>,
  ) {
    super(hechizoRepository);
  }

  async findByTipo(tipo: string): Promise<Hechizo[]> {
    return this.hechizoRepository.find({
      where: { tipo } as any,
    });
  }

  async findByName(nombre: string): Promise<Hechizo | null> {
    return this.findOneBy({ nombre } as any);
  }

  async findByEspacioHechizo(espacioHechizo: number): Promise<Hechizo[]> {
    return this.hechizoRepository.find({
      where: { espacioHechizo } as any,
    });
  }

  async findWithRelations(id: number): Promise<Hechizo | null> {
    return this.hechizoRepository.findOne({
      where: { id } as any,
      relations: ['nivelesDetalle', 'desbloqueos'],
    });
  }

  async createHechizo(createDto: CreateHechizoDto): Promise<Hechizo> {
    // Verificar que el nombre no exista
    const existingHechizo = await this.findByName(createDto.nombre);
    if (existingHechizo) {
      throw new Error(`Ya existe un hechizo con el nombre ${createDto.nombre}`);
    }

    return this.create(createDto);
  }

  async updateHechizo(id: number, updateDto: UpdateHechizoDto): Promise<Hechizo | null> {
    // Si se está cambiando el nombre, verificar que no exista otro con el mismo nombre
    if (updateDto.nombre) {
      const existingHechizo = await this.findByName(updateDto.nombre);
      if (existingHechizo && existingHechizo.id !== id) {
        throw new Error(`Ya existe un hechizo con el nombre ${updateDto.nombre}`);
      }
    }

    return this.update(id, updateDto);
  }
}
