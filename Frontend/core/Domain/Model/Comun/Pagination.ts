/**
 * Parámetros de consulta para paginación
 */
export interface PaginationQueryDto {
  page?: number;
  limit?: number;
  sort?: string;
  search?: string;
  withCount?: boolean;
}

/**
 * Metadatos de paginación
 */
export interface PageMetaDto {
  page: number;
  limit: number;
  totalItems?: number;
  totalPages?: number;
  hasNextPage?: boolean;
  hasPrevPage?: boolean;
}

/**
 * Respuesta paginada
 */
export interface PageDto<T> {
  data: T[];
  meta: PageMetaDto;
}

/**
 * ViewModel de paginación (contrato backend actual)
 */
export interface PaginationVm<T> {
  Datos: T[];
  TotalRegistros: number;
  PaginaActual: number;
  CantidadRegistroPorPagina: number;
}

