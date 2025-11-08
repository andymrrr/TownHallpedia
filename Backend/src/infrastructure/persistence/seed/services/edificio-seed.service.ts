import { Injectable, Logger } from '@nestjs/common';
import { EntityManager, FindOptionsWhere } from 'typeorm';
import { Edificio, TipoEdificio } from '../../entities/edificio.entity';
import { EDIFICIOS_SEED, EntidadBaseSeed } from '../seed-data';
import { SeedOptions, SeedStatistics } from '../interfaces/seed-execution.interface';
import { SeedEntityException } from '../exceptions/seed.exception';
import { BaseSeedService } from './base-seed.service';

/**
 * Servicio para sembrar edificios
 */
@Injectable()
export class EdificioSeedService extends BaseSeedService<Edificio> {
  protected readonly contexto = 'Edificios';
  private readonly logger = new Logger(EdificioSeedService.name);

  protected getLogger() {
    return this.logger;
  }

  protected getSeedData(): EntidadBaseSeed[] {
    return EDIFICIOS_SEED;
  }

  protected async seedEntity(
    manager: EntityManager,
    dato: EntidadBaseSeed,
    config: Required<SeedOptions>,
    estadisticas: SeedStatistics,
  ): Promise<boolean> {
    const existe = await manager.findOne(Edificio, {
      where: { nombre: dato.nombre } as FindOptionsWhere<Edificio>,
    });

    if (!existe) {
      await manager.save(Edificio, {
        nombre: dato.nombre,
        tipo: (dato.tipo as TipoEdificio) ?? undefined,
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

