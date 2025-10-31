import { IsNotEmpty, IsString, IsOptional, MaxLength } from 'class-validator';
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
  @IsString()
  @MaxLength(20)
  tipoRecurso?: string;

  @ApiPropertyOptional({ description: 'URL de la imagen de portada', maxLength: 300 })
  @IsOptional()
  @IsString()
  @MaxLength(300)
  portada?: string;
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
  @IsString()
  @MaxLength(20)
  tipoRecurso?: string;

  @ApiPropertyOptional({ description: 'URL de la imagen de portada', maxLength: 300 })
  @IsOptional()
  @IsString()
  @MaxLength(300)
  portada?: string;
}

export class HeroeResponseDto extends BaseDto {
  @Type(() => Number)
  id: number;

  nombre: string;
  descripcion?: string;
  tipoRecurso?: string;
  portada?: string;
}
