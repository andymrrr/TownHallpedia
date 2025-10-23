import { IsNotEmpty, IsString, IsOptional, IsNumber, IsEnum, Min } from 'class-validator';
import { Type } from 'class-transformer';
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

export class UpdateNivelDetalleDto extends CreateNivelDetalleDto {
  @IsOptional()
  @IsEnum(TipoEntidad)
  tipoEntidad?: TipoEntidad;

  @IsOptional()
  @IsNumber()
  @Min(1)
  entidadId?: number;

  @IsOptional()
  @IsNumber()
  @Min(1)
  nivel?: number;
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
