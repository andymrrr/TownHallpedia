import { IsNotEmpty, IsString, IsOptional, IsNumber, MaxLength, Min, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { BaseDto } from './base.dto';
import { TipoTropa } from '../entities/tropa.entity';

export class CreateTropaDto extends BaseDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  nombre: string;

  @IsOptional()
  @IsEnum(TipoTropa)
  tipo?: TipoTropa;

  @IsOptional()
  @IsNumber()
  @Min(0)
  espacioEjercito?: number;

  @IsOptional()
  @IsString()
  descripcion?: string;

  @ApiPropertyOptional({ description: 'URL de la imagen de portada', maxLength: 300 })
  @IsOptional()
  @IsString()
  @MaxLength(300)
  portada?: string;

  @IsOptional()
  @IsNumber()
  @Min(1)
  desbloqueaEnCuartelId?: number;
}

export class UpdateTropaDto {
  @ApiPropertyOptional({
    description: 'Nombre de la tropa',
    maxLength: 100,
    example: 'Bárbaro',
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  nombre?: string;

  @ApiPropertyOptional({
    description: 'Tipo de tropa',
    maxLength: 50,
    example: 'Normal',
  })
  @IsOptional()
  @IsEnum(TipoTropa)
  tipo?: TipoTropa;

  @ApiPropertyOptional({
    description: 'Espacio que ocupa en el ejército',
    minimum: 0,
    example: 1,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  espacioEjercito?: number;

  @ApiPropertyOptional({
    description: 'Descripción de la tropa',
    example: 'Tropa básica de ataque cuerpo a cuerpo',
  })
  @IsOptional()
  @IsString()
  descripcion?: string;

  @ApiPropertyOptional({
    description: 'ID del cuartel donde se desbloquea',
    minimum: 1,
    example: 1,
  })
  @IsOptional()
  @IsNumber()
  @Min(1)
  desbloqueaEnCuartelId?: number;

  @ApiPropertyOptional({ description: 'URL de la imagen de portada', maxLength: 300 })
  @IsOptional()
  @IsString()
  @MaxLength(300)
  portada?: string;
}

export class TropaResponseDto extends BaseDto {
  @Type(() => Number)
  id: number;

  nombre: string;
  tipo?: TipoTropa;

  @Type(() => Number)
  espacioEjercito?: number;

  descripcion?: string;

  @Type(() => Number)
  desbloqueaEnCuartelId?: number;

  portada?: string;
}
