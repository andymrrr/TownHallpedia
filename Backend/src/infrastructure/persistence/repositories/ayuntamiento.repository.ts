import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsWhere, In, SelectQueryBuilder } from 'typeorm';
import { Ayuntamiento } from '../entities/ayuntamiento.entity';
import { DesbloqueosAyuntamientoHeroe } from '../entities/desbloqueos-ayuntamiento-heroe.entity';
import { DesbloqueosAyuntamientoTropa } from '../entities/desbloqueos-ayuntamiento-tropa.entity';
import { DesbloqueosAyuntamientoHechizo } from '../entities/desbloqueos-ayuntamiento-hechizo.entity';
import { DesbloqueosAyuntamientoEdificio } from '../entities/desbloqueos-ayuntamiento-edificio.entity';
import { DesbloqueosAyuntamientoAnimal } from '../entities/desbloqueos-ayuntamiento-animal.entity';
import { DesbloqueosResult } from '../../../domain/types/desbloqueos.types';

@Injectable()
export class AyuntamientoRepository {
  constructor(
    @InjectRepository(Ayuntamiento)
    private readonly ayuntamientoRepo: Repository<Ayuntamiento>,
    @InjectRepository(DesbloqueosAyuntamientoHeroe)
    private readonly desbloqueosHeroeRepo: Repository<DesbloqueosAyuntamientoHeroe>,
    @InjectRepository(DesbloqueosAyuntamientoTropa)
    private readonly desbloqueosTropaRepo: Repository<DesbloqueosAyuntamientoTropa>,
    @InjectRepository(DesbloqueosAyuntamientoHechizo)
    private readonly desbloqueosHechizoRepo: Repository<DesbloqueosAyuntamientoHechizo>,
    @InjectRepository(DesbloqueosAyuntamientoEdificio)
    private readonly desbloqueosEdificioRepo: Repository<DesbloqueosAyuntamientoEdificio>,
    @InjectRepository(DesbloqueosAyuntamientoAnimal)
    private readonly desbloqueosAnimalRepo: Repository<DesbloqueosAyuntamientoAnimal>,
  ) {}

  async findAll(): Promise<Ayuntamiento[]> {
    return this.ayuntamientoRepo.find();
  }

  async findOne(id: number): Promise<Ayuntamiento | null> {
    return this.ayuntamientoRepo.findOne({ where: { id } });
  }

  async findByNivel(nivel: number): Promise<Ayuntamiento | null> {
    return this.ayuntamientoRepo.findOne({
      where: { nivel },
      relations: ['tipoRecurso'],
    });
  }

  async findByTipoRecurso(tipoRecursoId: number): Promise<Ayuntamiento[]> {
    return this.ayuntamientoRepo.find({
      where: { tipoRecursoId },
      relations: ['tipoRecurso'],
    });
  }

  async findWithRelations(id: number): Promise<Ayuntamiento | null> {
    return this.ayuntamientoRepo.findOne({
      where: { id },
      relations: ['tipoRecurso'],
    });
  }

  async findDesbloqueosByAyuntamientoId(id: number): Promise<DesbloqueosResult> {
    const [heroes, tropas, hechizos, edificios, animales] = await Promise.all([
      this.desbloqueosHeroeRepo.find({
        where: { ayuntamientoId: id },
        relations: ['heroe'],
      }),
      this.desbloqueosTropaRepo.find({
        where: { ayuntamientoId: id },
        relations: ['tropa'],
      }),
      this.desbloqueosHechizoRepo.find({
        where: { ayuntamientoId: id },
        relations: ['hechizo'],
      }),
      this.desbloqueosEdificioRepo.find({
        where: { ayuntamientoId: id },
        relations: ['edificio'],
      }),
      this.desbloqueosAnimalRepo.find({
        where: { ayuntamientoId: id },
        relations: ['animal'],
      }),
    ]);

    return { heroes, tropas, hechizos, edificios, animales };
  }

  async findDesbloqueosByNiveles(niveles: number[]): Promise<DesbloqueosResult> {
    const [heroes, tropas, hechizos, edificios, animales] = await Promise.all([
      this.desbloqueosHeroeRepo.find({
        where: { ayuntamientoId: In(niveles) },
        relations: ['heroe', 'ayuntamiento'],
      }),
      this.desbloqueosTropaRepo.find({
        where: { ayuntamientoId: In(niveles) },
        relations: ['tropa', 'ayuntamiento'],
      }),
      this.desbloqueosHechizoRepo.find({
        where: { ayuntamientoId: In(niveles) },
        relations: ['hechizo', 'ayuntamiento'],
      }),
      this.desbloqueosEdificioRepo.find({
        where: { ayuntamientoId: In(niveles) },
        relations: ['edificio', 'ayuntamiento'],
      }),
      this.desbloqueosAnimalRepo.find({
        where: { ayuntamientoId: In(niveles) },
        relations: ['animal', 'ayuntamiento'],
      }),
    ]);

    return { heroes, tropas, hechizos, edificios, animales };
  }

  async findAllAyuntamientos(): Promise<Ayuntamiento[]> {
    return this.ayuntamientoRepo.find();
  }

  async create(ayuntamiento: Partial<Ayuntamiento>): Promise<Ayuntamiento> {
    const newAyuntamiento = this.ayuntamientoRepo.create(ayuntamiento);
    return this.ayuntamientoRepo.save(newAyuntamiento);
  }

  async update(id: number, ayuntamiento: Partial<Ayuntamiento>): Promise<Ayuntamiento | null> {
    await this.ayuntamientoRepo.update(id, ayuntamiento);
    return this.findOne(id);
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.ayuntamientoRepo.delete(id);
    return (result.affected ?? 0) > 0;
  }

  async count(where?: FindOptionsWhere<Ayuntamiento>): Promise<number> {
    return this.ayuntamientoRepo.count({ where });
  }

  createQueryBuilder(alias?: string): SelectQueryBuilder<Ayuntamiento> {
    return this.ayuntamientoRepo.createQueryBuilder(alias);
  }
}

