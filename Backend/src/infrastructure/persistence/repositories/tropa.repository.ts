import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsWhere } from 'typeorm';
import { Tropa } from '../entities/tropa.entity';

@Injectable()
export class TropaRepository {
  constructor(
    @InjectRepository(Tropa)
    private readonly tropaRepo: Repository<Tropa>,
  ) {}

  async findAll(): Promise<Tropa[]> {
    return this.tropaRepo.find();
  }

  async findOne(id: number): Promise<Tropa | null> {
    return this.tropaRepo.findOne({ where: { id } as FindOptionsWhere<Tropa> });
  }

  async findByTipo(tipo: string): Promise<Tropa[]> {
    return this.tropaRepo.find({ where: { tipo } as FindOptionsWhere<Tropa> });
  }

  async findByName(nombre: string): Promise<Tropa | null> {
    return this.tropaRepo.findOne({ where: { nombre } as FindOptionsWhere<Tropa> });
  }

  async findByCuartel(cuartelId: number): Promise<Tropa[]> {
    return this.tropaRepo.find({
      where: { desbloqueaEnCuartelId: cuartelId } as FindOptionsWhere<Tropa>,
      relations: ['desbloqueaEnCuartel'],
    });
  }

  async findWithRelations(id: number): Promise<Tropa | null> {
    return this.tropaRepo.findOne({
      where: { id } as FindOptionsWhere<Tropa>,
      relations: ['desbloqueaEnCuartel', 'nivelesDetalle', 'desbloqueos'],
    });
  }

  async create(tropa: Partial<Tropa>): Promise<Tropa> {
    const newTropa = this.tropaRepo.create(tropa);
    return this.tropaRepo.save(newTropa);
  }

  async update(id: number, tropa: Partial<Tropa>): Promise<Tropa | null> {
    await this.tropaRepo.update(id, tropa);
    return this.findOne(id);
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.tropaRepo.delete(id);
    return (result.affected ?? 0) > 0;
  }

  createQueryBuilder(alias?: string) {
    return this.tropaRepo.createQueryBuilder(alias);
  }
}

