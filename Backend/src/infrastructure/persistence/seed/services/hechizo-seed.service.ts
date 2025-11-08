import { Injectable, Logger } from '@nestjs/common';
import { EntityManager, FindOptionsWhere } from 'typeorm';
import { Hechizo } from '../../entities/hechizo.entity';
import { HECHIZOS_SEED, EntidadBaseSeed } from '../seed-data';
import { SeedOptions, SeedStatistics } from '../interfaces/seed-execution.interface';
import { SeedEntityException } from '../exceptions/seed.exception';
import { BaseSeedService } from './base-seed.service';

/**
 * Servicio para sembrar hechizos
 */
@Injectable()
export class HechizoSeedService extends BaseSeedService<Hechizo> {
  protected readonly contexto = 'Hechizos';
  private readonly logger = new Logger(HechizoSeedService.name);

  protected getLogger() {
    return this.logger;
  }

  protected getSeedData(): EntidadBaseSeed[] {
    return HECHIZOS_SEED;
  }

  protected async seedEntity(
    manager: EntityManager,
    dato: EntidadBaseSeed,
    config: Required<SeedOptions>,
    estadisticas: SeedStatistics,
  ): Promise<boolean> {
    const existe = await manager.findOne(Hechizo, {
      where: { nombre: dato.nombre } as FindOptionsWhere<Hechizo>,
    });

    if (!existe) {
      await manager.save(Hechizo, {
        nombre: dato.nombre,
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

