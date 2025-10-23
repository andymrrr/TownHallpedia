import { IsNotEmpty, IsString, IsNumber, IsEnum, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { BaseDto } from './base.dto';
import { TipoEntidad } from '../entities/nivel-detalle.entity';

export class CreateDesbloqueosAyuntamientoDto extends BaseDto {
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  ayuntamientoId: number;

  @IsNotEmpty()
  @IsEnum(TipoEntidad)
  tipoEntidad: TipoEntidad;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  entidadId: number;
}

export class UpdateDesbloqueosAyuntamientoDto {
  @ApiProperty({
    description: 'ID del ayuntamiento',
    minimum: 1,
    example: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  ayuntamientoId: number;

  @ApiProperty({
    description: 'Tipo de entidad',
    enum: TipoEntidad,
    example: TipoEntidad.EDIFICIO,
  })
  @IsNotEmpty()
  @IsEnum(TipoEntidad)
  tipoEntidad: TipoEntidad;

  @ApiProperty({
    description: 'ID de la entidad',
    minimum: 1,
    example: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  entidadId: number;
}

export class DesbloqueosAyuntamientoResponseDto extends BaseDto {
  @Type(() => Number)
  id: number;

  @Type(() => Number)
  ayuntamientoId: number;

  tipoEntidad: TipoEntidad;

  @Type(() => Number)
  entidadId: number;
}
