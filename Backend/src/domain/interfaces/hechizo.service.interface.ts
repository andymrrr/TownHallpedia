import { Hechizo } from '../../infrastructure/persistence/entities/hechizo.entity';
import { CreateHechizoDto, UpdateHechizoDto } from '../../presentation/dto/hechizo.dto';
import { PaginationQueryDto, PageDto } from '../../common/pagination/pagination.dto';

export interface IHechizoService {
  findAll(): Promise<Hechizo[]>;
  findOne(id: number): Promise<Hechizo | null>;
  findByTipo(tipo: string): Promise<Hechizo[]>;
  findByName(nombre: string): Promise<Hechizo | null>;
  findByEspacioHechizo(espacioHechizo: number): Promise<Hechizo[]>;
  findWithRelations(id: number): Promise<Hechizo | null>;
  findWithDesbloqueos(id: number): Promise<Hechizo | null>;
  paginate(query: PaginationQueryDto): Promise<PageDto<Hechizo>>;
  createHechizo(createDto: CreateHechizoDto): Promise<Hechizo>;
  updateHechizo(id: number, updateDto: UpdateHechizoDto): Promise<Hechizo | null>;
  delete(id: number): Promise<boolean>;
}

