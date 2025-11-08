import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsWhere } from 'typeorm';
import { Edificio } from '../entities/edificio.entity';
import { DesbloqueosAyuntamientoEdificio } from '../entities/desbloqueos-ayuntamiento-edificio.entity';

@Injectable()
export class EdificioRepository {
  constructor(
    @InjectRepository(Edificio)
    private readonly edificioRepo: Repository<Edificio>,
    @InjectRepository(DesbloqueosAyuntamientoEdificio)
    private readonly desbloqueosRepo: Repository<DesbloqueosAyuntamientoEdificio>,
  ) {}

  async findAll(): Promise<Edificio[]> {
    return this.edificioRepo.find();
  }

  async findOne(id: number): Promise<Edificio | null> {
    return this.edificioRepo.findOne({ where: { id } as FindOptionsWhere<Edificio> });
  }

  async findByTipo(tipo: string): Promise<Edificio[]> {
    return this.edificioRepo.find({ where: { tipo } as any });
  }

  async findByName(nombre: string): Promise<Edificio | null> {
    return this.edificioRepo.findOne({ where: { nombre } as any });
  }

  async findWithTropas(id: number): Promise<Edificio | null> {
    return this.edificioRepo.findOne({
      where: { id } as any,
      relations: ['tropas', 'nivelesDetalle', 'desbloqueos'],
    });
  }

  async findWithRelations(id: number): Promise<Edificio | null> {
    return this.edificioRepo.findOne({
      where: { id } as any,
    });
  }

  async findDesbloqueosByEdificioId(id: number) {
    return this.desbloqueosRepo.find({
      where: { edificioId: id },
      relations: ['ayuntamiento'],
      order: { ayuntamiento: { nivel: 'ASC' } } as any,
    });
  }

  async create(edificio: Partial<Edificio>): Promise<Edificio> {
    const newEdificio = this.edificioRepo.create(edificio);
    return this.edificioRepo.save(newEdificio);
  }

  async update(id: number, edificio: Partial<Edificio>): Promise<Edificio | null> {
    await this.edificioRepo.update(id, edificio);
    return this.findOne(id);
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.edificioRepo.delete(id);
    return (result.affected ?? 0) > 0;
  }

  createQueryBuilder(alias?: string) {
    return this.edificioRepo.createQueryBuilder(alias);
  }
}

