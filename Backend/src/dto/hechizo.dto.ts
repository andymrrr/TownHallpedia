import { IsNotEmpty, IsString, IsOptional, IsNumber, MaxLength, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { BaseDto } from './base.dto';

export class CreateHechizoDto extends BaseDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  nombre: string;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  tipo?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  espacioHechizo?: number;

  @IsOptional()
  @IsString()
  descripcion?: string;

  @ApiPropertyOptional({ description: 'URL de la imagen de portada', maxLength: 300 })
  @IsOptional()
  @IsString()
  @MaxLength(300)
  portada?: string;
}

export class UpdateHechizoDto {
  @ApiPropertyOptional({
    description: 'Nombre del hechizo',
    maxLength: 100,
    example: 'Rayo',
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  nombre?: string;

  @ApiPropertyOptional({
    description: 'Tipo de hechizo',
    maxLength: 20,
    example: 'Normal',
  })
  @IsOptional()
  @IsString()
  @MaxLength(20)
  tipo?: string;

  @ApiPropertyOptional({
    description: 'Espacio que ocupa en hechizos',
    minimum: 0,
    example: 1,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  espacioHechizo?: number;

  @ApiPropertyOptional({
    description: 'Descripción del hechizo',
    example: 'Hechizo de ataque aéreo',
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

export class HechizoResponseDto extends BaseDto {
  @Type(() => Number)
  id: number;

  nombre: string;
  tipo?: string;

  @Type(() => Number)
  espacioHechizo?: number;

  descripcion?: string;

  portada?: string;
}
