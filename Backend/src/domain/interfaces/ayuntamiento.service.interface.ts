import { Ayuntamiento } from '../../infrastructure/persistence/entities/ayuntamiento.entity';
import { CreateAyuntamientoDto, UpdateAyuntamientoDto } from '../../presentation/dto/ayuntamiento.dto';
import { PaginationQueryDto, PaginationVm } from '../../common/pagination/pagination.dto';

export interface IAyuntamientoService {
  findAll(): Promise<Ayuntamiento[]>;
  findOne(id: number): Promise<Ayuntamiento | null>;
  findByNivel(nivel: number): Promise<Ayuntamiento | null>;
  findByTipoRecurso(tipoRecursoId: number): Promise<Ayuntamiento[]>;
  findWithDesbloqueos(id: number): Promise<Ayuntamiento | null>;
  findByNivelWithDesbloqueos(nivel: number): Promise<Ayuntamiento | null>;
  paginate(query: PaginationQueryDto): Promise<PaginationVm<Ayuntamiento>>;
  createAyuntamiento(createDto: CreateAyuntamientoDto): Promise<Ayuntamiento>;
  updateAyuntamiento(id: number, updateDto: UpdateAyuntamientoDto): Promise<Ayuntamiento | null>;
  delete(id: number): Promise<boolean>;
}

