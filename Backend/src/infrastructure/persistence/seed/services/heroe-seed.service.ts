import { Injectable, Logger } from '@nestjs/common';
import { EntityManager, FindOptionsWhere } from 'typeorm';
import { Heroe } from '../../entities/heroe.entity';
import { Habilidad } from '../../entities/habilidad.entity';
import { HEROES_SEED, HeroeSeed } from '../seed-data';
import { SeedOptions, SeedStatistics } from '../interfaces/seed-execution.interface';
import { SeedEntityException } from '../exceptions/seed.exception';
import { BaseSeedService } from './base-seed.service';
import { RecursoCacheHelper } from '../helpers/recurso-cache.helper';
import { RecursoConverterHelper } from '../helpers/recurso-converter.helper';

/**
 * Servicio para sembrar héroes
 */
@Injectable()
export class HeroeSeedService extends BaseSeedService<Heroe> {
  protected readonly contexto = 'Héroes';
  private readonly logger = new Logger(HeroeSeedService.name);

  constructor(private readonly recursoCache: RecursoCacheHelper) {
    super();
  }

  protected getLogger() {
    return this.logger;
  }

  protected getSeedData(): HeroeSeed[] {
    return HEROES_SEED;
  }

  protected async seedEntity(
    manager: EntityManager,
    dato: HeroeSeed,
    config: Required<SeedOptions>,
    estadisticas: SeedStatistics,
  ): Promise<boolean> {
    const existe = await manager.findOne(Heroe, {
      where: { nombre: dato.nombre } as FindOptionsWhere<Heroe>,
    });

    if (!existe) {
      const tipoRecursoId = dato.tipoRecurso
        ? this.recursoCache.obtenerId(RecursoConverterHelper.convertir(dato.tipoRecurso))
        : null;

      const heroeGuardado = await manager.save(Heroe, {
        nombre: dato.nombre,
        tipoRecursoId: tipoRecursoId ?? undefined,
        portada: dato.portada ?? undefined,
        nivelMaximo: dato.nivelMaximo ?? undefined,
        nivelAyuntamientoDesbloqueo: dato.nivelAyuntamientoDesbloqueo ?? undefined,
        vida: dato.vida ?? undefined,
      });

      // Guardar habilidades si existen
      if (dato.habilidades && dato.habilidades.length > 0) {
        const habilidades = dato.habilidades.map((habilidadSeed) => ({
          nombre: habilidadSeed.nombre,
          descripcion: habilidadSeed.descripcion ?? undefined,
          portada: habilidadSeed.portada ?? undefined,
          heroeId: heroeGuardado.id,
        }));

        await manager.save(Habilidad, habilidades);
      }

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

