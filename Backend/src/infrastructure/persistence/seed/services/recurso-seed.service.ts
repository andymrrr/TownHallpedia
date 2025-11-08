import { Injectable, Logger } from '@nestjs/common';
import { EntityManager, FindOptionsWhere } from 'typeorm';
import { Recurso } from '../../entities/recurso.entity';
import { RECURSOS_SEED, RecursoSeed } from '../seed-data';
import { SeedOptions, SeedStatistics } from '../interfaces/seed-execution.interface';
import { SeedEntityException } from '../exceptions/seed.exception';
import { BaseSeedService } from './base-seed.service';
import { RecursoCacheHelper } from '../helpers/recurso-cache.helper';

/**
 * Servicio para sembrar recursos
 */
@Injectable()
export class RecursoSeedService extends BaseSeedService<Recurso> {
  protected readonly contexto = 'Recursos';
  private readonly logger = new Logger(RecursoSeedService.name);

  constructor(private readonly recursoCache: RecursoCacheHelper) {
    super();
  }

  protected getLogger() {
    return this.logger;
  }

  protected getSeedData(): RecursoSeed[] {
    return RECURSOS_SEED;
  }

  protected validarDato(dato: RecursoSeed, config: Required<SeedOptions>): void {
    if (config.validarDatos) {
      if (!dato.nombre) {
        throw new Error('Nombre es requerido para recursos');
      }
    }
  }

  protected async seedEntity(
    manager: EntityManager,
    dato: RecursoSeed,
    config: Required<SeedOptions>,
    estadisticas: SeedStatistics,
  ): Promise<boolean> {
    // Validación de duplicados
    const existe = await manager.findOne(Recurso, {
      where: { nombre: dato.nombre } as FindOptionsWhere<Recurso>,
    });

    if (!existe) {
      await manager.save(Recurso, {
        nombre: dato.nombre,
        descripcion: dato.descripcion ?? undefined,
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

    // Cargar recursos en cache después de sembrarlos
    await this.recursoCache.cargarCache(manager);

    if (config.logging) {
      this.logger.log(
        `${this.contexto}: ${creados} creados, ${estadisticas.registrosExistentes} ya existían`,
      );
    }

    return creados;
  }
}

