import { EntityManager, FindOptionsWhere } from 'typeorm';
import { SeedOptions, SeedStatistics } from '../interfaces/seed-execution.interface';
import { SeedEntityException } from '../exceptions/seed.exception';
import { validarNombre, validarUrl } from '../utils/seed-validators';

/**
 * Clase base para servicios de seed
 * Proporciona funcionalidad común para todos los servicios de seed
 */
export abstract class BaseSeedService<T> {
  protected abstract readonly contexto: string;

  /**
   * Sembra una entidad individual
   */
  protected abstract seedEntity(
    manager: EntityManager,
    dato: any,
    config: Required<SeedOptions>,
    estadisticas: SeedStatistics,
  ): Promise<boolean>;

  /**
   * Obtiene los datos de seed
   */
  protected abstract getSeedData(): any[];

  /**
   * Valida un dato individual
   */
  protected validarDato(dato: any, config: Required<SeedOptions>): void {
    if (config.validarDatos) {
      validarNombre(dato.nombre, this.contexto);
      if (dato.portada) {
        validarUrl(dato.portada, 'portada', this.contexto);
      }
    }
  }

  /**
   * Ejecuta el seed de una entidad
   */
  async seed(
    manager: EntityManager,
    config: Required<SeedOptions>,
    estadisticas: SeedStatistics,
  ): Promise<number> {
    let creados = 0;
    const datos = this.getSeedData();

    try {
      for (const dato of datos) {
        try {
          this.validarDato(dato, config);
          const fueCreado = await this.seedEntity(manager, dato, config, estadisticas);
          if (fueCreado) {
            creados++;
          }
        } catch (error) {
          estadisticas.errores++;
          if (config.logging) {
            const logger = this.getLogger();
            logger.warn(
              `Error al crear ${this.contexto.toLowerCase()} ${dato.nombre}: ${error instanceof Error ? error.message : 'Error desconocido'}`,
            );
          }
          if (!config.continuarConErrores) {
            throw error;
          }
        }
      }

      return creados;
    } catch (error) {
      throw new SeedEntityException(
        this.contexto,
        error instanceof Error ? error.message : 'Error desconocido',
        { creados, errores: estadisticas.errores },
        error instanceof Error ? error : undefined,
      );
    }
  }

  /**
   * Obtiene el logger (debe ser implementado por las clases hijas)
   */
  protected abstract getLogger(): { warn: (message: string) => void };
}

