import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsWhere } from 'typeorm';
import { Hechizo } from '../entities/hechizo.entity';
import { DesbloqueosAyuntamientoHechizo } from '../entities/desbloqueos-ayuntamiento-hechizo.entity';

@Injectable()
export class HechizoRepository {
  constructor(
    @InjectRepository(Hechizo)
    private readonly hechizoRepo: Repository<Hechizo>,
    @InjectRepository(DesbloqueosAyuntamientoHechizo)
    private readonly desbloqueosRepo: Repository<DesbloqueosAyuntamientoHechizo>,
  ) {}

  async findAll(): Promise<Hechizo[]> {
    return this.hechizoRepo.find();
  }

  async findOne(id: number): Promise<Hechizo | null> {
    return this.hechizoRepo.findOne({ where: { id } as FindOptionsWhere<Hechizo> });
  }

  async findByTipo(tipo: string): Promise<Hechizo[]> {
    return this.hechizoRepo.find({ where: { tipo } as FindOptionsWhere<Hechizo> });
  }

  async findByName(nombre: string): Promise<Hechizo | null> {
    return this.hechizoRepo.findOne({ where: { nombre } as FindOptionsWhere<Hechizo> });
  }

  async findByEspacioHechizo(espacioHechizo: number): Promise<Hechizo[]> {
    return this.hechizoRepo.find({ where: { espacioHechizo } as FindOptionsWhere<Hechizo> });
  }

  async findWithRelations(id: number): Promise<Hechizo | null> {
    return this.hechizoRepo.findOne({
      where: { id } as FindOptionsWhere<Hechizo>,
      relations: ['nivelesDetalle', 'desbloqueos'],
    });
  }

  async findDesbloqueosByHechizoId(id: number): Promise<DesbloqueosAyuntamientoHechizo[]> {
    return this.desbloqueosRepo.find({
      where: { hechizoId: id },
      relations: ['ayuntamiento'],
      order: { ayuntamiento: { nivel: 'ASC' } },
    });
  }

  async create(hechizo: Partial<Hechizo>): Promise<Hechizo> {
    const newHechizo = this.hechizoRepo.create(hechizo);
    return this.hechizoRepo.save(newHechizo);
  }

  async update(id: number, hechizo: Partial<Hechizo>): Promise<Hechizo | null> {
    await this.hechizoRepo.update(id, hechizo);
    return this.findOne(id);
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.hechizoRepo.delete(id);
    return (result.affected ?? 0) > 0;
  }

  createQueryBuilder(alias?: string) {
    return this.hechizoRepo.createQueryBuilder(alias);
  }
}

