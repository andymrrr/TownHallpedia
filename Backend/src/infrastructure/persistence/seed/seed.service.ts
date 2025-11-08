import { Injectable, Logger } from '@nestjs/common';
import { DataSource } from 'typeorm';
import {
  SeedExecutionResult,
  SeedOptions,
  SeedStatistics,
} from './interfaces/seed-execution.interface';
import { SeedDatabaseException } from './exceptions/seed.exception';
import {
  RecursoSeedService,
  AyuntamientoSeedService,
  EdificioSeedService,
  HeroeSeedService,
  HechizoSeedService,
  TropaSeedService,
  AnimalSeedService,
  DesbloqueoSeedService,
  NivelDetalleSeedService,
} from './services';

/**
 * Servicio principal encargado de orquestar el seed de datos iniciales.
 * Delega la responsabilidad a servicios específicos por entidad.
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
    private readonly recursoSeedService: RecursoSeedService,
    private readonly ayuntamientoSeedService: AyuntamientoSeedService,
    private readonly edificioSeedService: EdificioSeedService,
    private readonly heroeSeedService: HeroeSeedService,
    private readonly hechizoSeedService: HechizoSeedService,
    private readonly tropaSeedService: TropaSeedService,
    private readonly animalSeedService: AnimalSeedService,
    private readonly desbloqueoSeedService: DesbloqueoSeedService,
    private readonly nivelDetalleSeedService: NivelDetalleSeedService,
    private readonly dataSource: DataSource,
  ) {}

  /**
   * Ejecuta el proceso completo de seed de datos iniciales.
   * 
   * IMPORTANTE: Este método usa transacciones de base de datos para garantizar atomicidad.
   * - Si algún paso falla y `continuarConErrores` es `false`, TODA la transacción se revierte (rollback)
   * - Si `continuarConErrores` es `true`, los errores individuales se registran pero la transacción continúa
   * - Valida duplicados antes de insertar: solo crea registros que no existen
   * 
   * @param opciones - Configuración opcional para la ejecución del seed
   * @returns Resultado detallado de la ejecución
   * @throws {SeedDatabaseException} Si ocurre un error crítico de base de datos (causa rollback automático)
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
      // Paso 1: Preparar estructura de base de datos (fuera de transacción - solo DDL)
      await this.prepararEstructura(config.logging);

      // Paso 2: Ejecutar seed dentro de transacción
      const resultados = await this.dataSource.transaction(async (manager) => {
        // PRIMERO: Crear recursos (requeridos para las demás entidades)
        const recursosCreados = await this.recursoSeedService.seed(manager, config, estadisticas);

        // Luego sembrar las demás entidades
        const parciales = {
          recursos: recursosCreados,
          ayuntamientos: await this.ayuntamientoSeedService.seed(manager, config, estadisticas),
          edificios: await this.edificioSeedService.seed(manager, config, estadisticas),
          heroes: await this.heroeSeedService.seed(manager, config, estadisticas),
          hechizos: await this.hechizoSeedService.seed(manager, config, estadisticas),
          tropas: await this.tropaSeedService.seed(manager, config, estadisticas),
          animales: await this.animalSeedService.seed(manager, config, estadisticas),
          nivelesDetalle: await this.nivelDetalleSeedService.seed(manager, config, estadisticas),
          desbloqueos: await this.desbloqueoSeedService.seed(manager, config, estadisticas),
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
}
