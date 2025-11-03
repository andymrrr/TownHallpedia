import { ApiProperty } from '@nestjs/swagger';

/**
 * DTO que representa el resultado de la ejecución del seed
 */
export class SeedResultDto {
  @ApiProperty({
    description: 'Número de ayuntamientos creados',
    example: 15,
    minimum: 0,
  })
  ayuntamientos: number;

  @ApiProperty({
    description: 'Número de edificios creados',
    example: 9,
    minimum: 0,
  })
  edificios: number;

  @ApiProperty({
    description: 'Número de héroes creados',
    example: 4,
    minimum: 0,
  })
  heroes: number;

  @ApiProperty({
    description: 'Número de hechizos creados',
    example: 12,
    minimum: 0,
  })
  hechizos: number;

  @ApiProperty({
    description: 'Número de tropas creadas',
    example: 23,
    minimum: 0,
  })
  tropas: number;

  @ApiProperty({
    description: 'Número de desbloqueos creados',
    example: 4,
    minimum: 0,
  })
  desbloqueos: number;

  @ApiProperty({
    description: 'Número de niveles de detalle creados',
    example: 12,
    minimum: 0,
  })
  nivelesDetalle: number;

  @ApiProperty({
    description: 'Total de registros creados',
    example: 79,
    minimum: 0,
  })
  total: number;

  @ApiProperty({
    description: 'Tiempo de ejecución en milisegundos',
    example: 1250,
    minimum: 0,
  })
  tiempoEjecucion: number;
}







