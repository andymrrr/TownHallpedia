import { Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';
import { SeedService } from './seed.service';
import { SeedResultDto } from './dto/seed-result.dto';
import { Respuesta, ok, fail } from '../../../common/respuesta/respuesta';
import { SeedDatabaseException, SeedEntityException } from './exceptions/seed.exception';

/**
 * Controlador para gestionar la ejecución de seeds de datos iniciales.
 * Proporciona endpoints para poblar la base de datos con datos de referencia.
 */
@ApiTags('Seed')
@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  /**
   * Ejecuta el proceso completo de seed de datos iniciales.
   * Carga datos de referencia: ayuntamientos, edificios, héroes, hechizos,
   * tropas, desbloqueos y niveles de detalle.
   *
   * @returns Resultado detallado con estadísticas de la ejecución
   */
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Ejecutar seed de datos iniciales',
    description: `
      Ejecuta el proceso completo de seed de datos iniciales en la base de datos.
      Incluye:
      - Ayuntamientos (niveles 1-15)
      - Edificios base del juego
      - Héroes principales
      - Hechizos disponibles
      - Tropas del juego
      - Relaciones de desbloqueos
      - Niveles de detalle iniciales
      
      El proceso es idempotente: no crea duplicados si los datos ya existen.
      Se ejecuta dentro de una transacción para garantizar consistencia.
    `,
  })
  @ApiCreatedResponse({
    description: 'Seed ejecutado exitosamente',
    type: SeedResultDto,
  })
  @ApiInternalServerErrorResponse({
    description: 'Error crítico durante la ejecución del seed',
    schema: {
      type: 'object',
      properties: {
        completado: { type: 'boolean', example: false },
        mensaje: { type: 'string', example: 'Error al ejecutar seed' },
        errorTecnico: { type: 'string' },
        tipoError: { type: 'string', example: 'SEED' },
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'Error de validación en los datos',
    schema: {
      type: 'object',
      properties: {
        completado: { type: 'boolean', example: false },
        mensaje: { type: 'string' },
        errorTecnico: { type: 'string' },
        tipoError: { type: 'string', example: 'SEED_VALIDATION' },
      },
    },
  })
  async ejecutarSeed(): Promise<Respuesta<SeedResultDto>> {
    try {
      const resultados = await this.seedService.ejecutarSeed({
        validarDatos: true,
        continuarConErrores: false,
        logging: true,
      });

      return ok<SeedResultDto>(resultados, 'Seed ejecutado exitosamente');
    } catch (error: unknown) {
      if (error instanceof SeedEntityException) {
        return fail<SeedResultDto>('Error de validación en el seed', {
          errorTecnico: error.message,
          tipoError: 'SEED_VALIDATION',
        });
      }

      if (error instanceof SeedDatabaseException) {
        return fail<SeedResultDto>('Error de base de datos durante el seed', {
          errorTecnico: error.message,
          tipoError: 'SEED_DATABASE',
        });
      }

      const mensajeError =
        error instanceof Error ? error.message : 'Error desconocido al ejecutar seed';

      return fail<SeedResultDto>('Error al ejecutar seed', {
        errorTecnico: mensajeError,
        tipoError: 'SEED',
      });
    }
  }
}
