import { IsNotEmpty, IsString, IsOptional, IsNumber, MaxLength, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { BaseDto } from './base.dto';

export class CreateHabilidadDto extends BaseDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  nombre: string;

  @IsOptional()
  @IsString()
  descripcion?: string;

  @ApiProperty({ description: 'ID del héroe al que pertenece la habilidad', minimum: 1 })
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Type(() => Number)
  heroeId: number;

  @ApiPropertyOptional({ description: 'URL de la imagen de portada', maxLength: 300 })
  @IsOptional()
  @IsString()
  @MaxLength(300)
  portada?: string;
}

export class UpdateHabilidadDto {
  @ApiPropertyOptional({
    description: 'Nombre de la habilidad',
    maxLength: 100,
    example: 'Furia del Rey',
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  nombre?: string;

  @ApiPropertyOptional({
    description: 'Descripción de la habilidad',
    example: 'Aumenta el daño y velocidad de ataque',
  })
  @IsOptional()
  @IsString()
  descripcion?: string;

  @ApiPropertyOptional({ description: 'ID del héroe al que pertenece la habilidad', minimum: 1 })
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Type(() => Number)
  heroeId?: number;

  @ApiPropertyOptional({ description: 'URL de la imagen de portada', maxLength: 300 })
  @IsOptional()
  @IsString()
  @MaxLength(300)
  portada?: string;
}

export class HabilidadResponseDto extends BaseDto {
  @Type(() => Number)
  id: number;

  nombre: string;
  descripcion?: string;
  heroeId: number;
  portada?: string;
}

