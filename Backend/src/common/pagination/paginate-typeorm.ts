import { SelectQueryBuilder, ObjectLiteral } from 'typeorm';
import { PaginationQueryDto, PageDto, PageMetaDto, PaginationVm } from './pagination.dto';

type SortTuple = [column: string, order: 'ASC' | 'DESC'];

function parseSort(sort?: string): SortTuple[] {
  if (!sort) return [];
  return sort
    .split(',')
    .map(s => s.trim())
    .filter(Boolean)
    .map(part => {
      const [col, dir] = part.split(':').map(p => p.trim());
      const order = (dir?.toUpperCase() === 'DESC' ? 'DESC' : 'ASC') as 'ASC' | 'DESC';
      return [col, order] as SortTuple;
    });
}

export async function paginateQueryBuilder<T extends ObjectLiteral>(
  qb: SelectQueryBuilder<T>,
  query: PaginationQueryDto,
  defaultSort?: SortTuple[],
): Promise<PageDto<T>> {
  const page = query.page ?? 1;
  const limit = query.limit ?? 10;

  const sorts = parseSort(query.sort);
  const finalSort = sorts.length ? sorts : (defaultSort ?? []);
  for (const [col, dir] of finalSort) {
    qb.addOrderBy(col, dir);
  }

  qb.skip((page - 1) * limit).take(limit);

  let totalItems: number | undefined;
  if (query.withCount !== false) {
    totalItems = await qb.getCount();
  }

  const data = await qb.getMany();

  const meta: PageMetaDto = {
    page,
    limit,
    totalItems,
    totalPages: totalItems !== undefined ? Math.ceil(totalItems / limit) : undefined,
    hasNextPage: totalItems !== undefined ? page * limit < totalItems : undefined,
    hasPrevPage: page > 1,
  };

  return { data, meta };
}

// Helper genérico: devuelve directamente el ViewModel de paginación estándar
export async function paginateVmQueryBuilder<T extends ObjectLiteral>(
  qb: SelectQueryBuilder<T>,
  query: PaginationQueryDto,
  defaultSort?: SortTuple[],
): Promise<PaginationVm<T>> {
  const page = await paginateQueryBuilder(qb, query, defaultSort);
  return {
    Datos: page.data,
    TotalRegistros: page.meta.totalItems ?? page.data.length,
    PaginaActual: page.meta.page,
    CantidadRegistroPorPagina: page.meta.limit,
  };
}


