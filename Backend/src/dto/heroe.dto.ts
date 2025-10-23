import { IsNotEmpty, IsString, IsOptional, MaxLength } from 'class-validator';
import { Type } from 'class-transformer';
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
}

export class UpdateHeroeDto extends CreateHeroeDto {
  @IsOptional()
  @IsString()
  @MaxLength(100)
  nombre?: string;
}

export class HeroeResponseDto extends BaseDto {
  @Type(() => Number)
  id: number;

  nombre: string;
  descripcion?: string;
  tipoRecurso?: string;
}
