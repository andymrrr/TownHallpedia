import { IsNotEmpty, IsString, IsOptional, MaxLength, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { BaseDto } from './base.dto';
import { TipoEdificio } from '../entities/edificio.entity';

export class CreateEdificioDto extends BaseDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  nombre: string;

  @IsOptional()
  @IsEnum(TipoEdificio)
  tipo?: TipoEdificio;

  @IsOptional()
  @IsString()
  descripcion?: string;

  @ApiPropertyOptional({ description: 'URL de la imagen de portada', maxLength: 300 })
  @IsOptional()
  @IsString()
  @MaxLength(300)
  portada?: string;
}

export class UpdateEdificioDto {
  @ApiPropertyOptional({
    description: 'Nombre del edificio',
    maxLength: 100,
    example: 'Ayuntamiento',
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  nombre?: string;

  @ApiPropertyOptional({
    description: 'Tipo de edificio',
    maxLength: 50,
    example: 'Defensa',
  })
  @IsOptional()
  @IsEnum(TipoEdificio)
  tipo?: TipoEdificio;

  @ApiPropertyOptional({
    description: 'Descripción del edificio',
    example: 'Edificio principal de la aldea',
  })
  @IsOptional()
  @IsString()
  descripcion?: string;

  @ApiPropertyOptional({ description: 'URL de la imagen de portada', maxLength: 300 })
  @IsOptional()
  @IsString()
  @MaxLength(300)
  portada?: string;
}

export class EdificioResponseDto extends BaseDto {
  @Type(() => Number)
  id: number;

  nombre: string;
  tipo?: TipoEdificio;
  descripcion?: string;
  portada?: string;
}
