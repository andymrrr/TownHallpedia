import { Tropa } from '../../infrastructure/persistence/entities/tropa.entity';
import { CreateTropaDto, UpdateTropaDto } from '../../presentation/dto/tropa.dto';
import { PaginationQueryDto, PageDto } from '../../common/pagination/pagination.dto';

export interface ITropaService {
  findAll(): Promise<Tropa[]>;
  findOne(id: number): Promise<Tropa | null>;
  findByTipo(tipo: string): Promise<Tropa[]>;
  findByName(nombre: string): Promise<Tropa | null>;
  findByCuartel(cuartelId: number): Promise<Tropa[]>;
  findWithRelations(id: number): Promise<Tropa | null>;
  paginate(query: PaginationQueryDto): Promise<PageDto<Tropa>>;
  createTropa(createDto: CreateTropaDto): Promise<Tropa>;
  updateTropa(id: number, updateDto: UpdateTropaDto): Promise<Tropa | null>;
  delete(id: number): Promise<boolean>;
}

