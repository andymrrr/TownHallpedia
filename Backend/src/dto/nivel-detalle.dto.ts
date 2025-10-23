import { IsNotEmpty, IsString, IsOptional, IsNumber, IsEnum, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { BaseDto } from './base.dto';
import { TipoEntidad } from '../entities/nivel-detalle.entity';

export class CreateNivelDetalleDto extends BaseDto {
  @IsNotEmpty()
  @IsEnum(TipoEntidad)
  tipoEntidad: TipoEntidad;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  entidadId: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  nivel: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  costoMejora?: number;

  @IsOptional()
  @IsString()
  @Min(0)
  tipoRecurso?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  tiempoHoras?: number;

  @IsOptional()
  @IsNumber()
  danoPorSegundo?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  vida?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  capacidad?: number;

  @IsOptional()
  @IsNumber()
  @Min(1)
  desbloqueaEnAyuntamientoId?: number;
}

export class UpdateNivelDetalleDto {
  @ApiPropertyOptional({
    description: 'Tipo de entidad',
    enum: TipoEntidad,
    example: TipoEntidad.EDIFICIO,
  })
  @IsOptional()
  @IsEnum(TipoEntidad)
  tipoEntidad?: TipoEntidad;

  @ApiPropertyOptional({
    description: 'ID de la entidad',
    minimum: 1,
    example: 1,
  })
  @IsOptional()
  @IsNumber()
  @Min(1)
  entidadId?: number;

  @ApiPropertyOptional({
    description: 'Nivel de la entidad',
    minimum: 1,
    example: 1,
  })
  @IsOptional()
  @IsNumber()
  @Min(1)
  nivel?: number;

  @ApiPropertyOptional({
    description: 'Costo de mejora',
    minimum: 0,
    example: 100000,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  costoMejora?: number;

  @ApiPropertyOptional({
    description: 'Tipo de recurso requerido',
    example: 'Oro',
  })
  @IsOptional()
  @IsString()
  tipoRecurso?: string;

  @ApiPropertyOptional({
    description: 'Tiempo de mejora en horas',
    minimum: 0,
    example: 24,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  tiempoHoras?: number;

  @ApiPropertyOptional({
    description: 'Daño por segundo',
    example: 50.5,
  })
  @IsOptional()
  @IsNumber()
  danoPorSegundo?: number;

  @ApiPropertyOptional({
    description: 'Puntos de vida',
    minimum: 0,
    example: 1000,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  vida?: number;

  @ApiPropertyOptional({
    description: 'Capacidad',
    minimum: 0,
    example: 100,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  capacidad?: number;

  @ApiPropertyOptional({
    description: 'ID del ayuntamiento donde se desbloquea',
    minimum: 1,
    example: 1,
  })
  @IsOptional()
  @IsNumber()
  @Min(1)
  desbloqueaEnAyuntamientoId?: number;
}

export class NivelDetalleResponseDto extends BaseDto {
  @Type(() => Number)
  id: number;

  tipoEntidad: TipoEntidad;

  @Type(() => Number)
  entidadId: number;

  @Type(() => Number)
  nivel: number;

  @Type(() => Number)
  costoMejora?: number;

  tipoRecurso?: string;

  @Type(() => Number)
  tiempoHoras?: number;

  @Type(() => Number)
  danoPorSegundo?: number;

  @Type(() => Number)
  vida?: number;

  @Type(() => Number)
  capacidad?: number;

  @Type(() => Number)
  desbloqueaEnAyuntamientoId?: number;
}
