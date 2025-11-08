import { Injectable, Logger } from '@nestjs/common';
import { EntityManager, FindOptionsWhere } from 'typeorm';
import { Ayuntamiento } from '../../entities/ayuntamiento.entity';
import {
  AYUNTAMIENTOS_NIVEL_MAXIMO,
  AYUNTAMIENTOS_DETALLES,
  AyuntamientoDetalle,
} from '../seed-data';
import { SeedOptions, SeedStatistics } from '../interfaces/seed-execution.interface';
import { SeedEntityException } from '../exceptions/seed.exception';
import { validarNivel, validarNumeroPositivo } from '../utils/seed-validators';
import { RecursoCacheHelper } from '../helpers/recurso-cache.helper';
import { RecursoConverterHelper } from '../helpers/recurso-converter.helper';

/**
 * Servicio para sembrar ayuntamientos
 */
@Injectable()
export class AyuntamientoSeedService {
  private readonly logger = new Logger(AyuntamientoSeedService.name);

  constructor(private readonly recursoCache: RecursoCacheHelper) {}

  async seed(
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
            this.logger.warn(
              `Error al crear ayuntamiento nivel ${nivel}: ${error instanceof Error ? error.message : 'Error desconocido'}`,
            );
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

          const tipoRecursoId = detalle.tipoRecurso
            ? this.recursoCache.obtenerId(
                RecursoConverterHelper.convertir(detalle.tipoRecurso),
              )
            : null;

          await manager.update(
            Ayuntamiento,
            { nivel: detalle.nivel },
            {
              capacidadAlmacenOro: detalle.capacidadOro,
              capacidadAlmacenElixir: detalle.capacidadElixir,
              capacidadAlmacenOscuro: detalle.capacidadOscuro,
              tiempoConstruccionHoras: detalle.tiempoConstruccionHoras,
              costoMejora: detalle.costoMejora,
              tipoRecursoId: tipoRecursoId ?? undefined,
              portada: detalle.portada ?? undefined,
            },
          );
        } catch (error) {
          estadisticas.errores++;
          if (config.logging) {
            this.logger.warn(
              `Error al actualizar ayuntamiento nivel ${detalle.nivel}: ${error instanceof Error ? error.message : 'Error desconocido'}`,
            );
          }
          if (!config.continuarConErrores) {
            throw error;
          }
        }
      }

      if (config.logging) {
        this.logger.log(
          `${contexto}: ${creados} creados, ${estadisticas.registrosExistentes} ya existían`,
        );
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
}

