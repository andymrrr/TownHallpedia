import { IsNotEmpty, IsString, IsOptional, MaxLength, IsNumber, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { BaseDto } from './base.dto';

export class CreateHeroeDto extends BaseDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  nombre: string;

  @IsOptional()
  @IsString()
  descripcion?: string;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Type(() => Number)
  tipoRecursoId?: number;

  @ApiPropertyOptional({ description: 'URL de la imagen de portada', maxLength: 300 })
  @IsOptional()
  @IsString()
  @MaxLength(300)
  portada?: string;

  @ApiPropertyOptional({ description: 'Nivel máximo que puede alcanzar el héroe', minimum: 1 })
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Type(() => Number)
  nivelMaximo?: number;

  @ApiPropertyOptional({ description: 'Nivel de ayuntamiento donde se desbloquea', minimum: 1 })
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Type(() => Number)
  nivelAyuntamientoDesbloqueo?: number;

  @ApiPropertyOptional({ description: 'Vida o salud del héroe', minimum: 1 })
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Type(() => Number)
  vida?: number;
}

export class UpdateHeroeDto {
  @ApiPropertyOptional({
    description: 'Nombre del héroe',
    maxLength: 100,
    example: 'Rey Bárbaro',
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  nombre?: string;

  @ApiPropertyOptional({
    description: 'Descripción del héroe',
    example: 'Héroe principal de la aldea',
  })
  @IsOptional()
  @IsString()
  descripcion?: string;

  @ApiPropertyOptional({
    description: 'Tipo de recurso requerido',
    maxLength: 20,
    example: 'Elixir Oscuro',
  })
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Type(() => Number)
  tipoRecursoId?: number;

  @ApiPropertyOptional({ description: 'URL de la imagen de portada', maxLength: 300 })
  @IsOptional()
  @IsString()
  @MaxLength(300)
  portada?: string;

  @ApiPropertyOptional({ description: 'Nivel máximo que puede alcanzar el héroe', minimum: 1 })
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Type(() => Number)
  nivelMaximo?: number;

  @ApiPropertyOptional({ description: 'Nivel de ayuntamiento donde se desbloquea', minimum: 1 })
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Type(() => Number)
  nivelAyuntamientoDesbloqueo?: number;

  @ApiPropertyOptional({ description: 'Vida o salud del héroe', minimum: 1 })
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Type(() => Number)
  vida?: number;
}

export class HeroeResponseDto extends BaseDto {
  @Type(() => Number)
  id: number;

  nombre: string;
  descripcion?: string;
  tipoRecursoId?: number;
  portada?: string;
  nivelMaximo?: number;
  nivelAyuntamientoDesbloqueo?: number;
  vida?: number;
}
