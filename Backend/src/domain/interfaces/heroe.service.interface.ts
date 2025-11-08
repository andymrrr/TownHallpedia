import { Heroe } from '../../infrastructure/persistence/entities/heroe.entity';
import { CreateHeroeDto, UpdateHeroeDto } from '../../presentation/dto/heroe.dto';
import { PaginationQueryDto, PageDto } from '../../common/pagination/pagination.dto';
import { HeroeConDesbloqueos } from '../types/desbloqueos.types';

export interface IHeroeService {
  findAll(): Promise<Heroe[]>;
  findOne(id: number): Promise<Heroe | null>;
  findByTipoRecurso(tipoRecurso: string): Promise<Heroe[]>;
  findByName(nombre: string): Promise<Heroe | null>;
  findWithRelations(id: number): Promise<Heroe | null>;
  findWithDesbloqueos(id: number): Promise<HeroeConDesbloqueos | null>;
  paginate(query: PaginationQueryDto): Promise<PageDto<Heroe>>;
  createHeroe(createDto: CreateHeroeDto): Promise<Heroe>;
  updateHeroe(id: number, updateDto: UpdateHeroeDto): Promise<Heroe | null>;
  delete(id: number): Promise<boolean>;
}

