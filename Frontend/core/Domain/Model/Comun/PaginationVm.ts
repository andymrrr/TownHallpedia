export interface PaginationVm<T> {
  Datos: T[];
  TotalRegistros: number;
  PaginaActual: number;
  CantidadRegistroPorPagina: number;
}


