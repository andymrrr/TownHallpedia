import { IsNotEmpty, IsNumber, IsString, IsOptional, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { BaseDto } from './base.dto';

export class CreateAyuntamientoDto extends BaseDto {
  @ApiProperty({
    description: 'Nivel del ayuntamiento (1-15)',
    minimum: 1,
    maximum: 15,
    example: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(15)
  nivel: number;

  @ApiPropertyOptional({
    description: 'Capacidad de almacenamiento de oro',
    minimum: 0,
    example: 10000,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  capacidadAlmacenOro?: number;

  @ApiPropertyOptional({
    description: 'Capacidad de almacenamiento de elixir',
    minimum: 0,
    example: 10000,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  capacidadAlmacenElixir?: number;

  @ApiPropertyOptional({
    description: 'Capacidad de almacenamiento de elixir oscuro',
    minimum: 0,
    example: 1000,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  capacidadAlmacenOscuro?: number;

  @ApiPropertyOptional({
    description: 'Tiempo de construcción en horas',
    minimum: 0,
    example: 24,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  tiempoConstruccionHoras?: number;

  @ApiPropertyOptional({
    description: 'Costo de mejora',
    minimum: 0,
    example: 1000000,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  costoMejora?: number;

  @ApiPropertyOptional({
    description: 'Tipo de recurso requerido para la mejora',
    example: 'Oro',
  })
  @IsOptional()
  @IsString()
  tipoRecurso?: string;
}

export class UpdateAyuntamientoDto extends CreateAyuntamientoDto {
  @ApiPropertyOptional({
    description: 'Nivel del ayuntamiento (1-15)',
    minimum: 1,
    maximum: 15,
    example: 1,
  })
  @IsOptional()
  @IsNumber()
  @Min(1)
  nivel?: number;
}

export class AyuntamientoResponseDto extends BaseDto {
  @ApiProperty({
    description: 'ID único del ayuntamiento',
    example: 1,
  })
  @Type(() => Number)
  id: number;

  @ApiProperty({
    description: 'Nivel del ayuntamiento',
    example: 1,
  })
  @Type(() => Number)
  nivel: number;

  @ApiPropertyOptional({
    description: 'Capacidad de almacenamiento de oro',
    example: 10000,
  })
  @Type(() => Number)
  capacidadAlmacenOro?: number;

  @ApiPropertyOptional({
    description: 'Capacidad de almacenamiento de elixir',
    example: 10000,
  })
  @Type(() => Number)
  capacidadAlmacenElixir?: number;

  @ApiPropertyOptional({
    description: 'Capacidad de almacenamiento de elixir oscuro',
    example: 1000,
  })
  @Type(() => Number)
  capacidadAlmacenOscuro?: number;

  @ApiPropertyOptional({
    description: 'Tiempo de construcción en horas',
    example: 24,
  })
  @Type(() => Number)
  tiempoConstruccionHoras?: number;

  @ApiPropertyOptional({
    description: 'Costo de mejora',
    example: 1000000,
  })
  @Type(() => Number)
  costoMejora?: number;

  @ApiPropertyOptional({
    description: 'Tipo de recurso requerido para la mejora',
    example: 'Oro',
  })
  tipoRecurso?: string;
}
