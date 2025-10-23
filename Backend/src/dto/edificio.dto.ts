import { IsNotEmpty, IsString, IsOptional, MaxLength } from 'class-validator';
import { Type } from 'class-transformer';
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

export class UpdateEdificioDto extends CreateEdificioDto {
  @IsOptional()
  @IsString()
  @MaxLength(100)
  nombre?: string;
}

export class EdificioResponseDto extends BaseDto {
  @Type(() => Number)
  id: number;

  nombre: string;
  tipo?: string;
  descripcion?: string;
}
