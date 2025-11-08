import { Injectable, Logger } from '@nestjs/common';
import { EntityManager, FindOptionsWhere } from 'typeorm';
import { Ayuntamiento } from '../../entities/ayuntamiento.entity';
import { Edificio } from '../../entities/edificio.entity';
import { Tropa } from '../../entities/tropa.entity';
import { Heroe } from '../../entities/heroe.entity';
import { Hechizo } from '../../entities/hechizo.entity';
import { Animal } from '../../entities/animal.entity';
import { DESBLOQUEOS_SEED, DESBLOQUEOS_EXPANDIDOS, DesbloqueoConfig } from '../seed-data';
import { SeedOptions, SeedStatistics } from '../interfaces/seed-execution.interface';
import { SeedEntityException } from '../exceptions/seed.exception';
import { EntidadFinderHelper } from '../helpers/entidad-finder.helper';
import { NivelesCalculatorHelper } from '../helpers/niveles-calculator.helper';
import { DesbloqueoGuardarHelper } from '../helpers/desbloqueo-guardar.helper';
import { DesbloqueosAyuntamientoHeroe } from '../../entities/desbloqueos-ayuntamiento-heroe.entity';
import { DesbloqueosAyuntamientoTropa } from '../../entities/desbloqueos-ayuntamiento-tropa.entity';
import { DesbloqueosAyuntamientoHechizo } from '../../entities/desbloqueos-ayuntamiento-hechizo.entity';
import { DesbloqueosAyuntamientoEdificio } from '../../entities/desbloqueos-ayuntamiento-edificio.entity';
import { DesbloqueosAyuntamientoAnimal } from '../../entities/desbloqueos-ayuntamiento-animal.entity';

/**
 * Servicio para sembrar desbloqueos
 */
@Injectable()
export class DesbloqueoSeedService {
  private readonly logger = new Logger(DesbloqueoSeedService.name);

  async seed(
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

      const todosDesbloqueos = [...DESBLOQUEOS_SEED, ...DESBLOQUEOS_EXPANDIDOS];

      for (const configDesbloqueo of todosDesbloqueos) {
        try {
          const ayuntamiento = await manager.findOne(Ayuntamiento, {
            where: { nivel: configDesbloqueo.nivelAyuntamiento } as FindOptionsWhere<Ayuntamiento>,
          });

          if (!ayuntamiento) {
            if (config.logging) {
              this.logger.warn(
                `Ayuntamiento nivel ${configDesbloqueo.nivelAyuntamiento} no encontrado, omitiendo desbloqueos`,
              );
            }
            continue;
          }

          const entidades = await EntidadFinderHelper.encontrarPorTipo(
            manager,
            configDesbloqueo.tipoEntidad,
            configDesbloqueo.nombres,
          );

          for (const entidad of entidades) {
            try {
              const entidadNombre = await this.obtenerNombreEntidad(manager, configDesbloqueo.tipoEntidad, entidad.id);
              
              // Determinar nivel máximo: primero buscar en nivelesMaximos por nombre, luego nivelMaximo general, sino calcular
              let nivelMaximo: number | null = null;
              
              // Prioridad 1: nivelesMaximos específico por nombre de entidad
              if (configDesbloqueo.nivelesMaximos && entidadNombre && configDesbloqueo.nivelesMaximos[entidadNombre]) {
                nivelMaximo = configDesbloqueo.nivelesMaximos[entidadNombre];
              }

              // Prioridad 2: nivelMaximo general para todas las entidades
              if (nivelMaximo === null && configDesbloqueo.nivelMaximo !== undefined) {
                nivelMaximo = configDesbloqueo.nivelMaximo;
              }

              // Prioridad 3: Calcular basándose en los niveles de detalle disponibles
              if (nivelMaximo === null) {
                const nivelesCalculados = await NivelesCalculatorHelper.calcularNivelesDisponibles(
                  manager,
                  configDesbloqueo.tipoEntidad,
                  entidad.id,
                  configDesbloqueo.nivelAyuntamiento,
                );
                nivelMaximo = nivelesCalculados.nivelMaximo;
              }

              // Determinar nivel mínimo
              let nivelMinimo: number | null = null;
              
              // Prioridad 1: nivelesMinimos específico por nombre de entidad
              if (configDesbloqueo.nivelesMinimos && entidadNombre && configDesbloqueo.nivelesMinimos[entidadNombre]) {
                nivelMinimo = configDesbloqueo.nivelesMinimos[entidadNombre];
              }

              // Prioridad 2: nivelMinimo general para todas las entidades
              if (nivelMinimo === null && configDesbloqueo.nivelMinimo !== undefined) {
                nivelMinimo = configDesbloqueo.nivelMinimo;
              }

              // Prioridad 3: Buscar el nivel máximo del TH anterior si la entidad ya fue desbloqueada
              if (nivelMinimo === null) {
                const nivelMaximoTHAnterior = await this.obtenerNivelMaximoTHAnterior(
                  manager,
                  configDesbloqueo.tipoEntidad,
                  entidad.id,
                  configDesbloqueo.nivelAyuntamiento,
                );
                if (nivelMaximoTHAnterior !== null) {
                  // Si existe un desbloqueo anterior, el nivel mínimo es el máximo del TH anterior
                  nivelMinimo = nivelMaximoTHAnterior;
                } else {
                  // Si no existe desbloqueo anterior, es nuevo y el nivel mínimo es 1
                  nivelMinimo = 1;
                }
              }

              // Si aún es null, usar 1 por defecto
              const nivelMinFinal = nivelMinimo ?? 1;
              const nivelMaxFinal = nivelMaximo ?? 1;

              const guardado = await DesbloqueoGuardarHelper.guardar(
                manager,
                configDesbloqueo.tipoEntidad,
                ayuntamiento.id,
                entidad.id,
                nivelMinFinal,
                nivelMaxFinal,
                estadisticas,
              );

              if (guardado) {
                creados++;
              }
            } catch (error) {
              estadisticas.errores++;
              if (config.logging) {
                this.logger.warn(
                  `Error al crear desbloqueo para ${configDesbloqueo.tipoEntidad} ${entidad.id}: ${error instanceof Error ? error.message : 'Error desconocido'}`,
                );
              }
              if (!config.continuarConErrores) {
                throw error;
              }
            }
          }
        } catch (error) {
          estadisticas.errores++;
          if (config.logging) {
            this.logger.warn(
              `Error al procesar desbloqueo: ${error instanceof Error ? error.message : 'Error desconocido'}`,
            );
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
   * Obtiene el nombre de una entidad por su ID y tipo
   */
  private async obtenerNombreEntidad(
    manager: EntityManager,
    tipoEntidad: string,
    entidadId: number,
  ): Promise<string | null> {
    try {
      switch (tipoEntidad) {
        case 'Edificio':
          const edificio = await manager.findOne(Edificio, {
            where: { id: entidadId } as FindOptionsWhere<Edificio>,
          });
          return edificio?.nombre || null;
        case 'Tropa':
          const tropa = await manager.findOne(Tropa, {
            where: { id: entidadId } as FindOptionsWhere<Tropa>,
          });
          return tropa?.nombre || null;
        case 'Heroe':
          const heroe = await manager.findOne(Heroe, {
            where: { id: entidadId } as FindOptionsWhere<Heroe>,
          });
          return heroe?.nombre || null;
        case 'Hechizo':
          const hechizo = await manager.findOne(Hechizo, {
            where: { id: entidadId } as FindOptionsWhere<Hechizo>,
          });
          return hechizo?.nombre || null;
        case 'Animal':
          const animal = await manager.findOne(Animal, {
            where: { id: entidadId } as FindOptionsWhere<Animal>,
          });
          return animal?.nombre || null;
        default:
          return null;
      }
    } catch (error) {
      return null;
    }
  }

  /**
   * Obtiene el nivel máximo disponible de una entidad en el Town Hall anterior
   * Retorna null si no existe un desbloqueo anterior (es decir, es nuevo)
   */
  private async obtenerNivelMaximoTHAnterior(
    manager: EntityManager,
    tipoEntidad: string,
    entidadId: number,
    nivelAyuntamientoActual: number,
  ): Promise<number | null> {
    try {
      // Obtener todos los ayuntamientos ordenados por nivel
      const ayuntamientos = await manager.find(Ayuntamiento, {
        order: { nivel: 'ASC' },
      });

      // Encontrar el TH anterior
      const thAnterior = ayuntamientos.find(a => a.nivel === nivelAyuntamientoActual - 1);
      if (!thAnterior) {
        return null; // No hay TH anterior, es nuevo
      }

      // Buscar desbloqueo en el TH anterior según el tipo de entidad
      let desbloqueoAnterior: { nivelMaximoDisponible: number } | null = null;

      switch (tipoEntidad) {
        case 'Heroe':
          const desbloqueoHeroe = await manager.findOne(DesbloqueosAyuntamientoHeroe, {
            where: { ayuntamientoId: thAnterior.id, heroeId: entidadId },
          });
          desbloqueoAnterior = desbloqueoHeroe;
          break;
        case 'Tropa':
          const desbloqueoTropa = await manager.findOne(DesbloqueosAyuntamientoTropa, {
            where: { ayuntamientoId: thAnterior.id, tropaId: entidadId },
          });
          desbloqueoAnterior = desbloqueoTropa;
          break;
        case 'Hechizo':
          const desbloqueoHechizo = await manager.findOne(DesbloqueosAyuntamientoHechizo, {
            where: { ayuntamientoId: thAnterior.id, hechizoId: entidadId },
          });
          desbloqueoAnterior = desbloqueoHechizo;
          break;
        case 'Edificio':
          const desbloqueoEdificio = await manager.findOne(DesbloqueosAyuntamientoEdificio, {
            where: { ayuntamientoId: thAnterior.id, edificioId: entidadId },
          });
          desbloqueoAnterior = desbloqueoEdificio;
          break;
        case 'Animal':
          const desbloqueoAnimal = await manager.findOne(DesbloqueosAyuntamientoAnimal, {
            where: { ayuntamientoId: thAnterior.id, animalId: entidadId },
          });
          desbloqueoAnterior = desbloqueoAnimal;
          break;
      }

      return desbloqueoAnterior?.nivelMaximoDisponible ?? null;
    } catch (error) {
      return null;
    }
  }
}

