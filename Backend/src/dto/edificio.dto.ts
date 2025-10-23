import { IsNotEmpty, IsString, IsOptional, MaxLength } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { BaseDto } from './base.dto';

export class CreateEdificioDto extends BaseDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  nombre: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  tipo?: string;

  @IsOptional()
  @IsString()
  descripcion?: string;
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
  @IsString()
  @MaxLength(50)
  tipo?: string;

  @ApiPropertyOptional({
    description: 'Descripción del edificio',
    example: 'Edificio principal de la aldea',
  })
  @IsOptional()
  @IsString()
  descripcion?: string;
}

export class EdificioResponseDto extends BaseDto {
  @Type(() => Number)
  id: number;

  nombre: string;
  tipo?: string;
  descripcion?: string;
}
