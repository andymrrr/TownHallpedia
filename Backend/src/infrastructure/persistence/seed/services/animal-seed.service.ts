import { Injectable, Logger } from '@nestjs/common';
import { EntityManager, FindOptionsWhere } from 'typeorm';
import { Animal } from '../../entities/animal.entity';
import { ANIMALES_SEED, AnimalSeed } from '../seed-data';
import { SeedOptions, SeedStatistics } from '../interfaces/seed-execution.interface';
import { SeedEntityException } from '../exceptions/seed.exception';
import { BaseSeedService } from './base-seed.service';

/**
 * Servicio para sembrar animales
 */
@Injectable()
export class AnimalSeedService extends BaseSeedService<Animal> {
  protected readonly contexto = 'Animales';
  private readonly logger = new Logger(AnimalSeedService.name);

  protected getLogger() {
    return this.logger;
  }

  protected getSeedData(): AnimalSeed[] {
    return ANIMALES_SEED;
  }

  protected async seedEntity(
    manager: EntityManager,
    dato: AnimalSeed,
    config: Required<SeedOptions>,
    estadisticas: SeedStatistics,
  ): Promise<boolean> {
    const existe = await manager.findOne(Animal, {
      where: { nombre: dato.nombre } as FindOptionsWhere<Animal>,
    });

    if (!existe) {
      await manager.save(Animal, {
        nombre: dato.nombre,
        descripcion: dato.descripcion ?? undefined,
        tipo: dato.tipo ?? undefined,
        portada: dato.portada ?? undefined,
      });
      estadisticas.registrosCreados++;
      return true;
    } else {
      estadisticas.registrosExistentes++;
      return false;
    }
  }

  async seed(
    manager: EntityManager,
    config: Required<SeedOptions>,
    estadisticas: SeedStatistics,
  ): Promise<number> {
    if (config.logging) {
      this.logger.log(`Iniciando seed de ${this.contexto}...`);
    }

    const creados = await super.seed(manager, config, estadisticas);

    if (config.logging) {
      this.logger.log(
        `${this.contexto}: ${creados} creados, ${estadisticas.registrosExistentes} ya existían`,
      );
    }

    return creados;
  }
}

