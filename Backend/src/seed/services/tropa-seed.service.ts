import { Injectable, Logger } from '@nestjs/common';
import { EntityManager, FindOptionsWhere } from 'typeorm';
import { Tropa, TipoTropa } from '../../entities/tropa.entity';
import { TROPAS_SEED, EntidadBaseSeed } from '../seed-data';
import { SeedOptions, SeedStatistics } from '../interfaces/seed-execution.interface';
import { SeedEntityException } from '../exceptions/seed.exception';
import { BaseSeedService } from './base-seed.service';

/**
 * Servicio para sembrar tropas
 */
@Injectable()
export class TropaSeedService extends BaseSeedService<Tropa> {
  protected readonly contexto = 'Tropas';
  private readonly logger = new Logger(TropaSeedService.name);

  protected getLogger() {
    return this.logger;
  }

  protected getSeedData(): EntidadBaseSeed[] {
    return TROPAS_SEED;
  }

  protected async seedEntity(
    manager: EntityManager,
    dato: EntidadBaseSeed,
    config: Required<SeedOptions>,
    estadisticas: SeedStatistics,
  ): Promise<boolean> {
    const existe = await manager.findOne(Tropa, {
      where: { nombre: dato.nombre } as FindOptionsWhere<Tropa>,
    });

    if (!existe) {
      await manager.save(Tropa, {
        nombre: dato.nombre,
        tipo: (dato.tipo as TipoTropa) ?? undefined,
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

