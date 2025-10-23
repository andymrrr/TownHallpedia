import { IsNotEmpty, IsString, IsOptional, IsNumber, MaxLength, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { BaseDto } from './base.dto';

export class CreateTropaDto extends BaseDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  nombre: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  tipo?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  espacioEjercito?: number;

  @IsOptional()
  @IsString()
  descripcion?: string;

  @IsOptional()
  @IsNumber()
  @Min(1)
  desbloqueaEnCuartelId?: number;
}

export class UpdateTropaDto extends CreateTropaDto {
  @IsOptional()
  @IsString()
  @MaxLength(100)
  nombre?: string;
}

export class TropaResponseDto extends BaseDto {
  @Type(() => Number)
  id: number;

  nombre: string;
  tipo?: string;

  @Type(() => Number)
  espacioEjercito?: number;

  descripcion?: string;

  @Type(() => Number)
  desbloqueaEnCuartelId?: number;
}
