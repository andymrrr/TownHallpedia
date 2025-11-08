import { Edificio } from '../../infrastructure/persistence/entities/edificio.entity';
import { CreateEdificioDto, UpdateEdificioDto } from '../../presentation/dto/edificio.dto';
import { PaginationQueryDto, PageDto } from '../../common/pagination/pagination.dto';
import { EdificioConDesbloqueos } from '../types/desbloqueos.types';

export interface IEdificioService {
  findAll(): Promise<Edificio[]>;
  findOne(id: number): Promise<Edificio | null>;
  findByTipo(tipo: string): Promise<Edificio[]>;
  findByName(nombre: string): Promise<Edificio | null>;
  findWithTropas(id: number): Promise<Edificio | null>;
  findWithDesbloqueos(id: number): Promise<EdificioConDesbloqueos | null>;
  paginate(query: PaginationQueryDto): Promise<PageDto<Edificio>>;
  createEdificio(createDto: CreateEdificioDto): Promise<Edificio>;
  updateEdificio(id: number, updateDto: UpdateEdificioDto): Promise<Edificio | null>;
  delete(id: number): Promise<boolean>;
}

