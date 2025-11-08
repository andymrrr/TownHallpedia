import { IsOptional, IsDateString } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class BaseDto {
  @ApiPropertyOptional({
    description: 'Fecha de creación del registro',
    type: Date,
    example: '2024-01-01T00:00:00.000Z',
  })
  @IsOptional()
  @IsDateString()
  fechaCreacion?: Date;

  @ApiPropertyOptional({
    description: 'Fecha de última actualización del registro',
    type: Date,
    example: '2024-01-01T00:00:00.000Z',
  })
  @IsOptional()
  @IsDateString()
  fechaActualizacion?: Date;
}
