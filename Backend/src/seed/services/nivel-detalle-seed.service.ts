import { Injectable, Logger } from '@nestjs/common';
import { EntityManager, FindOptionsWhere } from 'typeorm';
import { Tropa } from '../../entities/tropa.entity';
import { Hechizo } from '../../entities/hechizo.entity';
import { Heroe } from '../../entities/heroe.entity';
import { Edificio } from '../../entities/edificio.entity';
import {
  NIVELES_BARBARO_SEED,
  NIVELES_RAYO_SEED,
  NIVELES_REY_BARBARO_SEED,
  NIVELES_CUARTEL_SEED,
  NivelDetalleTropaSeed,
  NivelDetalleHechizoSeed,
  NivelDetalleHeroeSeed,
  NivelDetalleEdificioSeed,
} from '../seed-data';
import { SeedOptions, SeedStatistics } from '../interfaces/seed-execution.interface';
import { SeedEntityException } from '../exceptions/seed.exception';
import { validarNivel, validarNumeroPositivo } from '../utils/seed-validators';
import { NivelDetalleTropa } from '../../entities/nivel-detalle-tropa.entity';
import { NivelDetalleHechizo } from '../../entities/nivel-detalle-hechizo.entity';
import { NivelDetalleHeroe } from '../../entities/nivel-detalle-heroe.entity';
import { NivelDetalleEdificio } from '../../entities/nivel-detalle-edificio.entity';
import { RecursoCacheHelper } from '../helpers/recurso-cache.helper';
import { RecursoConverterHelper } from '../helpers/recurso-converter.helper';

/**
 * Servicio para sembrar niveles de detalle
 */
@Injectable()
export class NivelDetalleSeedService {
  private readonly logger = new Logger(NivelDetalleSeedService.name);

  constructor(private readonly recursoCache: RecursoCacheHelper) {}

  async seed(
    manager: EntityManager,
    config: Required<SeedOptions>,
    estadisticas: SeedStatistics,
  ): Promise<number> {
    let creados = 0;

    try {
      if (config.logging) {
        this.logger.log('Iniciando seed de Niveles de Detalle...');
      }

      creados += await this.seedNivelesTropa(manager, 'Bárbaro', NIVELES_BARBARO_SEED, config, estadisticas);
      creados += await this.seedNivelesHechizo(manager, 'Rayo', NIVELES_RAYO_SEED, config, estadisticas);
      creados += await this.seedNivelesHeroe(manager, 'Rey Bárbaro', NIVELES_REY_BARBARO_SEED, config, estadisticas);
      creados += await this.seedNivelesEdificio(manager, 'Cuartel', NIVELES_CUARTEL_SEED, config, estadisticas);

      if (config.logging) {
        this.logger.log(`Niveles de Detalle: ${creados} creados`);
      }

      return creados;
    } catch (error) {
      throw new SeedEntityException(
        'Niveles de Detalle',
        error instanceof Error ? error.message : 'Error desconocido',
        { creados, errores: estadisticas.errores },
        error instanceof Error ? error : undefined,
      );
    }
  }

  private async seedNivelesTropa(
    manager: EntityManager,
    nombreTropa: string,
    niveles: NivelDetalleTropaSeed[],
    config: Required<SeedOptions>,
    estadisticas: SeedStatistics,
  ): Promise<number> {
    const tropa = await manager.findOne(Tropa, {
      where: { nombre: nombreTropa } as FindOptionsWhere<Tropa>,
    });

    if (!tropa) {
      if (config.logging) {
        this.logger.warn(`Tropa '${nombreTropa}' no encontrada, omitiendo niveles`);
      }
      return 0;
    }

    let creados = 0;
    for (const nivel of niveles) {
      try {
        if (config.validarDatos) {
          validarNivel(nivel.nivel, 1, 100, 'Nivel Detalle Tropa');
          validarNumeroPositivo(nivel.costo, 'costo', 'Nivel Detalle Tropa');
          validarNumeroPositivo(nivel.vida, 'vida', 'Nivel Detalle Tropa');
        }

        const tipoRecursoId = this.recursoCache.obtenerId(
          RecursoConverterHelper.convertir(nivel.recurso),
        );

        const existe = await manager.findOne(NivelDetalleTropa, {
          where: { tropaId: tropa.id, nivel: nivel.nivel },
        });

        if (!existe) {
          await manager.save(NivelDetalleTropa, {
            tropaId: tropa.id,
            nivel: nivel.nivel,
            costoMejora: nivel.costo,
            tipoRecursoId: tipoRecursoId ?? undefined,
            tiempoHoras: nivel.tiempo,
            danoPorSegundo: nivel.dano,
            vida: nivel.vida,
          });
          creados++;
          estadisticas.registrosCreados++;
        } else {
          estadisticas.registrosExistentes++;
        }
      } catch (error) {
        estadisticas.errores++;
        if (config.logging) {
          this.logger.warn(
            `Error al crear nivel ${nivel.nivel} de tropa ${nombreTropa}: ${error instanceof Error ? error.message : 'Error desconocido'}`,
          );
        }
        if (!config.continuarConErrores) {
          throw error;
        }
      }
    }

    return creados;
  }

  private async seedNivelesHechizo(
    manager: EntityManager,
    nombreHechizo: string,
    niveles: NivelDetalleHechizoSeed[],
    config: Required<SeedOptions>,
    estadisticas: SeedStatistics,
  ): Promise<number> {
    const hechizo = await manager.findOne(Hechizo, {
      where: { nombre: nombreHechizo } as FindOptionsWhere<Hechizo>,
    });

    if (!hechizo) {
      if (config.logging) {
        this.logger.warn(`Hechizo '${nombreHechizo}' no encontrado, omitiendo niveles`);
      }
      return 0;
    }

    let creados = 0;
    for (const nivel of niveles) {
      try {
        if (config.validarDatos) {
          validarNivel(nivel.nivel, 1, 100, 'Nivel Detalle Hechizo');
          validarNumeroPositivo(nivel.costo, 'costo', 'Nivel Detalle Hechizo');
        }

        const tipoRecursoId = this.recursoCache.obtenerId(
          RecursoConverterHelper.convertir(nivel.recurso),
        );

        const existe = await manager.findOne(NivelDetalleHechizo, {
          where: { hechizoId: hechizo.id, nivel: nivel.nivel },
        });

        if (!existe) {
          await manager.save(NivelDetalleHechizo, {
            hechizoId: hechizo.id,
            nivel: nivel.nivel,
            costoMejora: nivel.costo,
            tipoRecursoId: tipoRecursoId ?? undefined,
            tiempoHoras: nivel.tiempo,
            danoPorSegundo: nivel.dano,
            capacidad: nivel.capacidad ?? undefined,
          });
          creados++;
          estadisticas.registrosCreados++;
        } else {
          estadisticas.registrosExistentes++;
        }
      } catch (error) {
        estadisticas.errores++;
        if (config.logging) {
          this.logger.warn(
            `Error al crear nivel ${nivel.nivel} de hechizo ${nombreHechizo}: ${error instanceof Error ? error.message : 'Error desconocido'}`,
          );
        }
        if (!config.continuarConErrores) {
          throw error;
        }
      }
    }

    return creados;
  }

  private async seedNivelesHeroe(
    manager: EntityManager,
    nombreHeroe: string,
    niveles: NivelDetalleHeroeSeed[],
    config: Required<SeedOptions>,
    estadisticas: SeedStatistics,
  ): Promise<number> {
    const heroe = await manager.findOne(Heroe, {
      where: { nombre: nombreHeroe } as FindOptionsWhere<Heroe>,
    });

    if (!heroe) {
      if (config.logging) {
        this.logger.warn(`Héroe '${nombreHeroe}' no encontrado, omitiendo niveles`);
      }
      return 0;
    }

    let creados = 0;
    for (const nivel of niveles) {
      try {
        if (config.validarDatos) {
          validarNivel(nivel.nivel, 1, 100, 'Nivel Detalle Héroe');
          validarNumeroPositivo(nivel.costo, 'costo', 'Nivel Detalle Héroe');
          validarNumeroPositivo(nivel.vida, 'vida', 'Nivel Detalle Héroe');
        }

        const tipoRecursoId = this.recursoCache.obtenerId(
          RecursoConverterHelper.convertir(nivel.recurso),
        );

        const existe = await manager.findOne(NivelDetalleHeroe, {
          where: { heroeId: heroe.id, nivel: nivel.nivel },
        });

        if (!existe) {
          await manager.save(NivelDetalleHeroe, {
            heroeId: heroe.id,
            nivel: nivel.nivel,
            costoMejora: nivel.costo,
            tipoRecursoId: tipoRecursoId ?? undefined,
            tiempoHoras: nivel.tiempo,
            vida: nivel.vida,
          });
          creados++;
          estadisticas.registrosCreados++;
        } else {
          estadisticas.registrosExistentes++;
        }
      } catch (error) {
        estadisticas.errores++;
        if (config.logging) {
          this.logger.warn(
            `Error al crear nivel ${nivel.nivel} de héroe ${nombreHeroe}: ${error instanceof Error ? error.message : 'Error desconocido'}`,
          );
        }
        if (!config.continuarConErrores) {
          throw error;
        }
      }
    }

    return creados;
  }

  private async seedNivelesEdificio(
    manager: EntityManager,
    nombreEdificio: string,
    niveles: NivelDetalleEdificioSeed[],
    config: Required<SeedOptions>,
    estadisticas: SeedStatistics,
  ): Promise<number> {
    const edificio = await manager.findOne(Edificio, {
      where: { nombre: nombreEdificio } as FindOptionsWhere<Edificio>,
    });

    if (!edificio) {
      if (config.logging) {
        this.logger.warn(`Edificio '${nombreEdificio}' no encontrado, omitiendo niveles`);
      }
      return 0;
    }

    let creados = 0;
    for (const nivel of niveles) {
      try {
        if (config.validarDatos) {
          validarNivel(nivel.nivel, 1, 100, 'Nivel Detalle Edificio');
          validarNumeroPositivo(nivel.costo, 'costo', 'Nivel Detalle Edificio');
          validarNumeroPositivo(nivel.vida, 'vida', 'Nivel Detalle Edificio');
        }

        const tipoRecursoId = this.recursoCache.obtenerId(
          RecursoConverterHelper.convertir(nivel.recurso),
        );

        const existe = await manager.findOne(NivelDetalleEdificio, {
          where: { edificioId: edificio.id, nivel: nivel.nivel },
        });

        if (!existe) {
          await manager.save(NivelDetalleEdificio, {
            edificioId: edificio.id,
            nivel: nivel.nivel,
            costoMejora: nivel.costo,
            tipoRecursoId: tipoRecursoId ?? undefined,
            tiempoHoras: nivel.tiempo,
            vida: nivel.vida,
          });
          creados++;
          estadisticas.registrosCreados++;
        } else {
          estadisticas.registrosExistentes++;
        }
      } catch (error) {
        estadisticas.errores++;
        if (config.logging) {
          this.logger.warn(
            `Error al crear nivel ${nivel.nivel} de edificio ${nombreEdificio}: ${error instanceof Error ? error.message : 'Error desconocido'}`,
          );
        }
        if (!config.continuarConErrores) {
          throw error;
        }
      }
    }

    return creados;
  }
}

