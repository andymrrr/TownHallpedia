import { Transform } from 'class-transformer';
import { IsBoolean, IsInt, IsOptional, IsString, Min } from 'class-validator';

export class PaginationQueryDto {
  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  @IsInt()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  @IsInt()
  @Min(1)
  limit?: number = 10;

  // Ej: sort=nombre:ASC,createdAt:DESC
  @IsOptional()
  @IsString()
  sort?: string;

  // Búsqueda básica (cada módulo decide cómo aplicarla)
  @IsOptional()
  @IsString()
  search?: string;

  // Si false, evita ejecutar COUNT (mejor performance)
  @IsOptional()
  @Transform(({ value }) => String(value).toLowerCase() === 'true')
  @IsBoolean()
  withCount?: boolean = true;
}

export class PageMetaDto {
  page: number;
  limit: number;
  totalItems?: number;
  totalPages?: number;
  hasNextPage?: boolean;
  hasPrevPage?: boolean;
}

export class PageDto<T> {
  data: T[];
  meta: PageMetaDto;
}


// ViewModel compatible con el contrato esperado estilo PaginacionVm de C#
export interface PaginationVm<T> {
  Datos: T[];
  TotalRegistros: number;
  PaginaActual: number;
  CantidadRegistroPorPagina: number;
}

export function toPaginationVm<T>(page: PageDto<T>): PaginationVm<T> {
  return {
    Datos: page.data,
    TotalRegistros: page.meta.totalItems ?? page.data.length,
    PaginaActual: page.meta.page,
    CantidadRegistroPorPagina: page.meta.limit,
  };
}


