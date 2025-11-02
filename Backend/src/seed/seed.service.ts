import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource, EntityManager, FindOptionsWhere, DeepPartial } from 'typeorm';
import { Ayuntamiento } from '../entities/ayuntamiento.entity';
import { Edificio } from '../entities/edificio.entity';
import { Heroe } from '../entities/heroe.entity';
import { Hechizo } from '../entities/hechizo.entity';
import { Tropa } from '../entities/tropa.entity';
import { NivelDetalle, TipoEntidad } from '../entities/nivel-detalle.entity';
import { DesbloqueosAyuntamiento } from '../entities/desbloqueos-ayuntamiento.entity';
import {
  AYUNTAMIENTOS_NIVEL_MAXIMO,
  AYUNTAMIENTOS_DETALLES,
  EDIFICIOS_SEED,
  HEROES_SEED,
  HECHIZOS_SEED,
  TROPAS_SEED,
  DESBLOQUEOS_SEED,
  NIVELES_BARBARO_SEED,
  NIVELES_RAYO_SEED,
  NIVELES_REY_BARBARO_SEED,
  NIVELES_CUARTEL_SEED,
  EntidadBaseSeed,
  HeroeSeed,
} from './seed-data';
import {
  SeedExecutionResult,
  SeedOptions,
  SeedStatistics,
} from './interfaces/seed-execution.interface';
import { SeedDatabaseException, SeedEntityException } from './exceptions/seed.exception';
import { validarNombre, validarNivel, validarNumeroPositivo, validarUrl } from './utils/seed-validators';

/**
 * Servicio encargado de ejecutar el seed de datos iniciales en la base de datos.
 * Implementa transacciones, validaciones y logging profesional.
 */
@Injectable()
export class SeedService {
  private readonly logger = new Logger(SeedService.name);
  private readonly opcionesPorDefecto: Required<SeedOptions> = {
    validarDatos: true,
    continuarConErrores: false,
    batchSize: 50,
    logging: true,
  };

  constructor(
    @InjectRepository(Ayuntamiento)
    private readonly ayuntamientoRepository: Repository<Ayuntamiento>,
    @InjectRepository(Edificio)
    private readonly edificioRepository: Repository<Edificio>,
    @InjectRepository(Heroe)
    private readonly heroeRepository: Repository<Heroe>,
    @InjectRepository(Hechizo)
    private readonly hechizoRepository: Repository<Hechizo>,
    @InjectRepository(Tropa)
    private readonly tropaRepository: Repository<Tropa>,
    @InjectRepository(NivelDetalle)
    private readonly nivelDetalleRepository: Repository<NivelDetalle>,
    @InjectRepository(DesbloqueosAyuntamiento)
    private readonly desbloqueosRepository: Repository<DesbloqueosAyuntamiento>,
    private readonly dataSource: DataSource,
  ) {}

  /**
   * Ejecuta el proceso completo de seed de datos iniciales.
   * @param opciones - Configuración opcional para la ejecución del seed
   * @returns Resultado detallado de la ejecución
   * @throws {SeedDatabaseException} Si ocurre un error crítico de base de datos
   */
  async ejecutarSeed(opciones?: SeedOptions): Promise<SeedExecutionResult> {
    const inicio = Date.now();
    const config = { ...this.opcionesPorDefecto, ...opciones };
    const estadisticas: SeedStatistics = {
      inicio: new Date(),
      registrosCreados: 0,
      registrosExistentes: 0,
      errores: 0,
    };

    if (config.logging) {
      this.logger.log('Iniciando proceso de seed de datos...');
    }

    try {
      // Paso 1: Preparar estructura de base de datos
      await this.prepararEstructura(config.logging);

      // Paso 2: Ejecutar seed dentro de transacción
      const resultados = await this.dataSource.transaction(async (manager) => {
        const parciales = {
          ayuntamientos: await this.seedAyuntamientos(manager, config, estadisticas),
          edificios: await this.seedEdificios(manager, config, estadisticas),
          heroes: await this.seedHeroes(manager, config, estadisticas),
          hechizos: await this.seedHechizos(manager, config, estadisticas),
          tropas: await this.seedTropas(manager, config, estadisticas),
          desbloqueos: await this.seedDesbloqueos(manager, config, estadisticas),
          nivelesDetalle: await this.seedNivelesDetalle(manager, config, estadisticas),
        };

        return parciales;
      });

      const tiempoEjecucion = Date.now() - inicio;
      estadisticas.fin = new Date();
      estadisticas.duracion = tiempoEjecucion;
      const total = Object.values(resultados).reduce((sum, count) => sum + count, 0);

      if (config.logging) {
        this.logger.log(
          `Seed completado exitosamente. Total: ${total} registros en ${tiempoEjecucion}ms`,
        );
        this.logger.debug(`Estadísticas: ${JSON.stringify(estadisticas)}`);
      }

      return {
        ...resultados,
        total,
        tiempoEjecucion,
      };
    } catch (error) {
      estadisticas.fin = new Date();
      estadisticas.duracion = Date.now() - inicio;
      estadisticas.errores++;

      const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
      this.logger.error(`Error crítico en seed: ${errorMessage}`, error instanceof Error ? error.stack : undefined);

      throw new SeedDatabaseException(
        `Error durante la ejecución del seed: ${errorMessage}`,
        { estadisticas },
        error instanceof Error ? error : undefined,
      );
    }
  }

  // ==========================================================================
  // PREPARACIÓN DE ESTRUCTURA
  // ==========================================================================

  /**
   * Prepara la estructura de base de datos necesaria para el seed.
   * @param logging - Si debe registrar logs
   */
  private async prepararEstructura(logging: boolean): Promise<void> {
    if (logging) {
      this.logger.log('Preparando estructura de base de datos...');
    }

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();

    try {
      const tablas = ['ayuntamiento', 'edificio', 'tropa', 'hechizo', 'heroe'] as const;

      for (const tabla of tablas) {
        try {
          await queryRunner.query(
            `ALTER TABLE IF EXISTS "${tabla}" ADD COLUMN IF NOT EXISTS "portada" varchar(300)`,
          );
          if (logging) {
            this.logger.debug(`Columna 'portada' verificada/creada en tabla '${tabla}'`);
          }
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
          this.logger.warn(`Advertencia al agregar columna en ${tabla}: ${errorMessage}`);
        }
      }
    } finally {
      await queryRunner.release();
    }
  }

  // ==========================================================================
  // SEED DE DATOS
  // ==========================================================================

  /**
   * Sembra datos de ayuntamientos
   */
  private async seedAyuntamientos(
    manager: EntityManager,
    config: Required<SeedOptions>,
    estadisticas: SeedStatistics,
  ): Promise<number> {
    const contexto = 'Ayuntamientos';
    let creados = 0;

    try {
      if (config.logging) {
        this.logger.log(`Iniciando seed de ${contexto}...`);
      }

      // Crear registros base para niveles 1-15
      for (let nivel = 1; nivel <= AYUNTAMIENTOS_NIVEL_MAXIMO; nivel++) {
        try {
          if (config.validarDatos) {
            validarNivel(nivel, 1, AYUNTAMIENTOS_NIVEL_MAXIMO, contexto);
          }

          const existe = await manager.findOne(Ayuntamiento, {
            where: { nivel } as FindOptionsWhere<Ayuntamiento>,
          });

          if (!existe) {
            await manager.save(Ayuntamiento, { nivel });
            creados++;
            estadisticas.registrosCreados++;
          } else {
            estadisticas.registrosExistentes++;
          }
        } catch (error) {
          estadisticas.errores++;
          if (config.logging) {
            this.logger.warn(`Error al crear ayuntamiento nivel ${nivel}: ${error instanceof Error ? error.message : 'Error desconocido'}`);
          }
          if (!config.continuarConErrores) {
            throw error;
          }
        }
      }

      // Actualizar detalles de cada nivel
      for (const detalle of AYUNTAMIENTOS_DETALLES) {
        try {
          if (config.validarDatos) {
            validarNivel(detalle.nivel, 1, AYUNTAMIENTOS_NIVEL_MAXIMO, contexto);
            validarNumeroPositivo(detalle.capacidadOro, 'capacidadOro', contexto);
            validarNumeroPositivo(detalle.capacidadElixir, 'capacidadElixir', contexto);
            validarNumeroPositivo(detalle.capacidadOscuro, 'capacidadOscuro', contexto);
          }

          await manager.update(
            Ayuntamiento,
            { nivel: detalle.nivel },
            {
              capacidadAlmacenOro: detalle.capacidadOro,
              capacidadAlmacenElixir: detalle.capacidadElixir,
              capacidadAlmacenOscuro: detalle.capacidadOscuro,
              tiempoConstruccionHoras: detalle.tiempoConstruccionHoras,
              costoMejora: detalle.costoMejora,
              tipoRecurso: detalle.tipoRecurso ?? undefined,
            },
          );
        } catch (error) {
          estadisticas.errores++;
          if (config.logging) {
            this.logger.warn(`Error al actualizar ayuntamiento nivel ${detalle.nivel}: ${error instanceof Error ? error.message : 'Error desconocido'}`);
          }
          if (!config.continuarConErrores) {
            throw error;
          }
        }
      }

      if (config.logging) {
        this.logger.log(`${contexto}: ${creados} creados, ${estadisticas.registrosExistentes} ya existían`);
      }

      return creados;
    } catch (error) {
      throw new SeedEntityException(
        contexto,
        error instanceof Error ? error.message : 'Error desconocido',
        { creados, errores: estadisticas.errores },
        error instanceof Error ? error : undefined,
      );
    }
  }

  /**
   * Sembra datos de edificios
   */
  private async seedEdificios(
    manager: EntityManager,
    config: Required<SeedOptions>,
    estadisticas: SeedStatistics,
  ): Promise<number> {
    return this.seedEntidadesBase(manager, Edificio, EDIFICIOS_SEED, 'Edificios', config, estadisticas);
  }

  /**
   * Sembra datos de héroes
   */
  private async seedHeroes(
    manager: EntityManager,
    config: Required<SeedOptions>,
    estadisticas: SeedStatistics,
  ): Promise<number> {
    const contexto = 'Héroes';
    let creados = 0;

    try {
      if (config.logging) {
        this.logger.log(`Iniciando seed de ${contexto}...`);
      }

      for (const heroeData of HEROES_SEED) {
        try {
          if (config.validarDatos) {
            validarNombre(heroeData.nombre, contexto);
            validarUrl(heroeData.portada, 'portada', contexto);
          }

          const existe = await manager.findOne(Heroe, {
            where: { nombre: heroeData.nombre } as FindOptionsWhere<Heroe>,
          });

          if (!existe) {
            await manager.save(Heroe, {
              nombre: heroeData.nombre,
              tipoRecurso: heroeData.tipoRecurso ?? undefined,
              portada: heroeData.portada ?? undefined,
            });
            creados++;
            estadisticas.registrosCreados++;
          } else {
            estadisticas.registrosExistentes++;
          }
        } catch (error) {
          estadisticas.errores++;
          if (config.logging) {
            this.logger.warn(`Error al crear héroe ${heroeData.nombre}: ${error instanceof Error ? error.message : 'Error desconocido'}`);
          }
          if (!config.continuarConErrores) {
            throw error;
          }
        }
      }

      if (config.logging) {
        this.logger.log(`${contexto}: ${creados} creados, ${estadisticas.registrosExistentes} ya existían`);
      }

      return creados;
    } catch (error) {
      throw new SeedEntityException(
        contexto,
        error instanceof Error ? error.message : 'Error desconocido',
        { creados, errores: estadisticas.errores },
        error instanceof Error ? error : undefined,
      );
    }
  }

  /**
   * Sembra datos de hechizos
   */
  private async seedHechizos(
    manager: EntityManager,
    config: Required<SeedOptions>,
    estadisticas: SeedStatistics,
  ): Promise<number> {
    return this.seedEntidadesBase(manager, Hechizo, HECHIZOS_SEED, 'Hechizos', config, estadisticas);
  }

  /**
   * Sembra datos de tropas
   */
  private async seedTropas(
    manager: EntityManager,
    config: Required<SeedOptions>,
    estadisticas: SeedStatistics,
  ): Promise<number> {
    return this.seedEntidadesBase(manager, Tropa, TROPAS_SEED, 'Tropas', config, estadisticas);
  }

  /**
   * Helper genérico para sembrar entidades base
   */
  private async seedEntidadesBase<T extends { nombre: string; tipo?: string | null; portada?: string | null }>(
    manager: EntityManager,
    entityClass: new () => T,
    datos: EntidadBaseSeed[],
    contexto: string,
    config: Required<SeedOptions>,
    estadisticas: SeedStatistics,
  ): Promise<number> {
    let creados = 0;
    const registrosExistentesInicial = estadisticas.registrosExistentes;

    try {
      if (config.logging) {
        this.logger.log(`Iniciando seed de ${contexto}...`);
      }

      for (const dato of datos) {
        try {
          if (config.validarDatos) {
            validarNombre(dato.nombre, contexto);
            validarUrl(dato.portada, 'portada', contexto);
          }

          const existe = await manager.findOne(entityClass, {
            where: { nombre: dato.nombre } as FindOptionsWhere<T>,
          });

          if (!existe) {
            await manager.save(entityClass, {
              nombre: dato.nombre,
              tipo: dato.tipo ?? undefined,
              portada: dato.portada ?? undefined,
            } as DeepPartial<T>);
            creados++;
            estadisticas.registrosCreados++;
          } else {
            estadisticas.registrosExistentes++;
          }
        } catch (error) {
          estadisticas.errores++;
          if (config.logging) {
            this.logger.warn(`Error al crear ${contexto.toLowerCase()} ${dato.nombre}: ${error instanceof Error ? error.message : 'Error desconocido'}`);
          }
          if (!config.continuarConErrores) {
            throw error;
          }
        }
      }

      const existentes = estadisticas.registrosExistentes - registrosExistentesInicial;
      if (config.logging) {
        this.logger.log(`${contexto}: ${creados} creados, ${existentes} ya existían`);
      }

      return creados;
    } catch (error) {
      throw new SeedEntityException(
        contexto,
        error instanceof Error ? error.message : 'Error desconocido',
        { creados, errores: estadisticas.errores },
        error instanceof Error ? error : undefined,
      );
    }
  }

  /**
   * Sembra datos de desbloqueos
   */
  private async seedDesbloqueos(
    manager: EntityManager,
    config: Required<SeedOptions>,
    estadisticas: SeedStatistics,
  ): Promise<number> {
    const contexto = 'Desbloqueos';
    let creados = 0;

    try {
      if (config.logging) {
        this.logger.log(`Iniciando seed de ${contexto}...`);
      }

      for (const configDesbloqueo of DESBLOQUEOS_SEED) {
        try {
          const ayuntamiento = await manager.findOne(Ayuntamiento, {
            where: { nivel: configDesbloqueo.nivelAyuntamiento } as FindOptionsWhere<Ayuntamiento>,
          });

          if (!ayuntamiento) {
            if (config.logging) {
              this.logger.warn(`Ayuntamiento nivel ${configDesbloqueo.nivelAyuntamiento} no encontrado, omitiendo desbloqueos`);
            }
            continue;
          }

          const tipoEntidadMap: Record<string, TipoEntidad> = {
            Edificio: TipoEntidad.EDIFICIO,
            Tropa: TipoEntidad.TROPA,
            Hechizo: TipoEntidad.HECHIZO,
          };
          const tipoEntidad = tipoEntidadMap[configDesbloqueo.tipoEntidad];

          if (!tipoEntidad) {
            throw new Error(`Tipo de entidad desconocido: ${configDesbloqueo.tipoEntidad}`);
          }

          const entidades = await this.obtenerEntidadesPorTipo(manager, tipoEntidad, configDesbloqueo.nombres);

          for (const entidad of entidades) {
            const existe = await manager.findOne(DesbloqueosAyuntamiento, {
              where: {
                ayuntamientoId: ayuntamiento.id,
                tipoEntidad,
                entidadId: entidad.id,
              } as FindOptionsWhere<DesbloqueosAyuntamiento>,
            });

            if (!existe) {
              await manager.save(DesbloqueosAyuntamiento, {
                ayuntamientoId: ayuntamiento.id,
                tipoEntidad,
                entidadId: entidad.id,
              });
              creados++;
              estadisticas.registrosCreados++;
            } else {
              estadisticas.registrosExistentes++;
            }
          }
        } catch (error) {
          estadisticas.errores++;
          if (config.logging) {
            this.logger.warn(`Error al crear desbloqueo: ${error instanceof Error ? error.message : 'Error desconocido'}`);
          }
          if (!config.continuarConErrores) {
            throw error;
          }
        }
      }

      if (config.logging) {
        this.logger.log(`${contexto}: ${creados} creados`);
      }

      return creados;
    } catch (error) {
      throw new SeedEntityException(
        contexto,
        error instanceof Error ? error.message : 'Error desconocido',
        { creados, errores: estadisticas.errores },
        error instanceof Error ? error : undefined,
      );
    }
  }

  /**
   * Obtiene entidades por tipo y nombres
   */
  private async obtenerEntidadesPorTipo(
    manager: EntityManager,
    tipoEntidad: TipoEntidad,
    nombres: string[],
  ): Promise<Array<{ id: number }>> {
    switch (tipoEntidad) {
      case TipoEntidad.EDIFICIO:
        return manager
          .createQueryBuilder(Edificio, 'e')
          .where('e.nombre IN (:...nombres)', { nombres })
          .getMany();

      case TipoEntidad.TROPA:
        return manager
          .createQueryBuilder(Tropa, 't')
          .where('t.nombre IN (:...nombres)', { nombres })
          .getMany();

      case TipoEntidad.HECHIZO:
        return manager
          .createQueryBuilder(Hechizo, 'h')
          .where('h.nombre IN (:...nombres)', { nombres })
          .getMany();

      default:
        this.logger.warn(`Tipo de entidad no soportado: ${tipoEntidad}`);
        return [];
    }
  }

  /**
   * Sembra datos de niveles de detalle
   */
  private async seedNivelesDetalle(
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

  /**
   * Sembra niveles de detalle para tropas
   */
  private async seedNivelesTropa(
    manager: EntityManager,
    nombreTropa: string,
    niveles: typeof NIVELES_BARBARO_SEED,
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

        const existe = await manager.findOne(NivelDetalle, {
          where: {
            tipoEntidad: TipoEntidad.TROPA,
            entidadId: tropa.id,
            nivel: nivel.nivel,
          },
        });

        if (!existe) {
          await manager.save(NivelDetalle, {
            tipoEntidad: TipoEntidad.TROPA,
            entidadId: tropa.id,
            nivel: nivel.nivel,
            costoMejora: nivel.costo,
            tipoRecurso: nivel.recurso,
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
          this.logger.warn(`Error al crear nivel ${nivel.nivel} de tropa ${nombreTropa}: ${error instanceof Error ? error.message : 'Error desconocido'}`);
        }
        if (!config.continuarConErrores) {
          throw error;
        }
      }
    }

    return creados;
  }

  /**
   * Sembra niveles de detalle para hechizos
   */
  private async seedNivelesHechizo(
    manager: EntityManager,
    nombreHechizo: string,
    niveles: typeof NIVELES_RAYO_SEED,
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

        const existe = await manager.findOne(NivelDetalle, {
          where: {
            tipoEntidad: TipoEntidad.HECHIZO,
            entidadId: hechizo.id,
            nivel: nivel.nivel,
          },
        });

        if (!existe) {
          await manager.save(NivelDetalle, {
            tipoEntidad: TipoEntidad.HECHIZO,
            entidadId: hechizo.id,
            nivel: nivel.nivel,
            costoMejora: nivel.costo,
            tipoRecurso: nivel.recurso,
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
          this.logger.warn(`Error al crear nivel ${nivel.nivel} de hechizo ${nombreHechizo}: ${error instanceof Error ? error.message : 'Error desconocido'}`);
        }
        if (!config.continuarConErrores) {
          throw error;
        }
      }
    }

    return creados;
  }

  /**
   * Sembra niveles de detalle para héroes
   */
  private async seedNivelesHeroe(
    manager: EntityManager,
    nombreHeroe: string,
    niveles: typeof NIVELES_REY_BARBARO_SEED,
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

        const existe = await manager.findOne(NivelDetalle, {
          where: {
            tipoEntidad: TipoEntidad.HEROE,
            entidadId: heroe.id,
            nivel: nivel.nivel,
          },
        });

        if (!existe) {
          await manager.save(NivelDetalle, {
            tipoEntidad: TipoEntidad.HEROE,
            entidadId: heroe.id,
            nivel: nivel.nivel,
            costoMejora: nivel.costo,
            tipoRecurso: nivel.recurso,
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
          this.logger.warn(`Error al crear nivel ${nivel.nivel} de héroe ${nombreHeroe}: ${error instanceof Error ? error.message : 'Error desconocido'}`);
        }
        if (!config.continuarConErrores) {
          throw error;
        }
      }
    }

    return creados;
  }

  /**
   * Sembra niveles de detalle para edificios
   */
  private async seedNivelesEdificio(
    manager: EntityManager,
    nombreEdificio: string,
    niveles: typeof NIVELES_CUARTEL_SEED,
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

        const existe = await manager.findOne(NivelDetalle, {
          where: {
            tipoEntidad: TipoEntidad.EDIFICIO,
            entidadId: edificio.id,
            nivel: nivel.nivel,
          },
        });

        if (!existe) {
          await manager.save(NivelDetalle, {
            tipoEntidad: TipoEntidad.EDIFICIO,
            entidadId: edificio.id,
            nivel: nivel.nivel,
            costoMejora: nivel.costo,
            tipoRecurso: nivel.recurso,
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
          this.logger.warn(`Error al crear nivel ${nivel.nivel} de edificio ${nombreEdificio}: ${error instanceof Error ? error.message : 'Error desconocido'}`);
        }
        if (!config.continuarConErrores) {
          throw error;
        }
      }
    }

    return creados;
  }
}
