import { IsNotEmpty, IsString, IsOptional, IsNumber, MaxLength, Min } from 'class-validator';
import { Type } from 'class-transformer';
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
}

export class UpdateHechizoDto extends CreateHechizoDto {
  @IsOptional()
  @IsString()
  @MaxLength(100)
  nombre?: string;
}

export class HechizoResponseDto extends BaseDto {
  @Type(() => Number)
  id: number;

  nombre: string;
  tipo?: string;

  @Type(() => Number)
  espacioHechizo?: number;

  descripcion?: string;
}
