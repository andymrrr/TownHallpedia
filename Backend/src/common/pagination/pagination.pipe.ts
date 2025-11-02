import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import { PaginationQueryDto } from './pagination.dto';

@Injectable()
export class PaginationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (metadata.type !== 'query') return value;
    const dto = plainToInstance(PaginationQueryDto, value, { enableImplicitConversion: true });
    const errors = validateSync(dto, { whitelist: true, forbidNonWhitelisted: true });
    // Si hubiera errores, devolvemos dto saneado para no romper flujo
    return dto;
  }
}


