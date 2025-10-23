import { IsNotEmpty, IsString, IsNumber, IsEnum, Min } from 'class-validator';
import { Type } from 'class-transformer';
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

export class UpdateDesbloqueosAyuntamientoDto extends CreateDesbloqueosAyuntamientoDto {
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

export class DesbloqueosAyuntamientoResponseDto extends BaseDto {
  @Type(() => Number)
  id: number;

  @Type(() => Number)
  ayuntamientoId: number;

  tipoEntidad: TipoEntidad;

  @Type(() => Number)
  entidadId: number;
}
