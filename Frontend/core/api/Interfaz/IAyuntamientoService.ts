import { Respuesta } from '@/core/Domain/Model/Comun/Respuesta';
import { PageDto, PaginationQueryDto } from '@/core/Domain/Model/Comun/Pagination';
import { PaginationVm } from '@/core/Domain/Model/Comun/PaginationVm';
import { Ayuntamiento, CreateAyuntamiento, UpdateAyuntamiento } from '@/core/Domain/Model/Ayuntamiento';

export interface IAyuntamientoService {
  findAll(): Promise<Respuesta<Ayuntamiento[]>>;
  findOne(id: number): Promise<Respuesta<Ayuntamiento>>;
  findByNivel(nivel: number): Promise<Respuesta<Ayuntamiento>>;
  findWithDesbloqueos(id: number): Promise<Respuesta<Ayuntamiento>>;
  paginate(query: PaginationQueryDto): Promise<PaginationVm<Ayuntamiento>>;
  create(createDto: CreateAyuntamiento): Promise<Respuesta<Ayuntamiento>>;
  update(id: number, updateDto: UpdateAyuntamiento): Promise<Respuesta<Ayuntamiento>>;
  delete(id: number): Promise<Respuesta<void>>;
}

