import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsWhere } from 'typeorm';
import { Heroe } from '../entities/heroe.entity';
import { DesbloqueosAyuntamientoHeroe } from '../entities/desbloqueos-ayuntamiento-heroe.entity';

@Injectable()
export class HeroeRepository {
  constructor(
    @InjectRepository(Heroe)
    private readonly heroeRepo: Repository<Heroe>,
    @InjectRepository(DesbloqueosAyuntamientoHeroe)
    private readonly desbloqueosRepo: Repository<DesbloqueosAyuntamientoHeroe>,
  ) {}

  async findAll(): Promise<Heroe[]> {
    return this.heroeRepo.find({
      relations: ['tipoRecurso', 'habilidades'],
    });
  }

  async findOne(id: number): Promise<Heroe | null> {
    return this.heroeRepo.findOne({
      where: { id } as FindOptionsWhere<Heroe>,
      relations: ['tipoRecurso', 'habilidades'],
    });
  }

  async findByTipoRecurso(tipoRecurso: string): Promise<Heroe[]> {
    return this.heroeRepo.find({ where: { tipoRecurso } as any });
  }

  async findByName(nombre: string): Promise<Heroe | null> {
    return this.heroeRepo.findOne({ where: { nombre } as any });
  }

  async findWithRelations(id: number): Promise<Heroe | null> {
    return this.heroeRepo.findOne({
      where: { id } as any,
      relations: ['tipoRecurso', 'habilidades', 'nivelesDetalle', 'desbloqueos'],
    });
  }

  async findDesbloqueosByHeroeId(id: number) {
    return this.desbloqueosRepo.find({
      where: { heroeId: id },
      relations: ['ayuntamiento'],
      order: { ayuntamiento: { nivel: 'ASC' } } as any,
    });
  }

  async create(heroe: Partial<Heroe>): Promise<Heroe> {
    const newHeroe = this.heroeRepo.create(heroe);
    return this.heroeRepo.save(newHeroe);
  }

  async update(id: number, heroe: Partial<Heroe>): Promise<Heroe | null> {
    await this.heroeRepo.update(id, heroe);
    return this.findOne(id);
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.heroeRepo.delete(id);
    return (result.affected ?? 0) > 0;
  }

  createQueryBuilder(alias?: string) {
    return this.heroeRepo.createQueryBuilder(alias);
  }
}

