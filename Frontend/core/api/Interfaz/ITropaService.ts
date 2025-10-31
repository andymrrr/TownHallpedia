import { Respuesta } from '@/core/Domain/Model/Comun/Respuesta';
import { Tropa, CreateTropa, UpdateTropa } from '@/core/Domain/Model/Tropa';

export interface ITropaService {
  findAll(): Promise<Respuesta<Tropa[]>>;
  findOne(id: number): Promise<Respuesta<Tropa>>;
  findByTipo(tipo: string): Promise<Respuesta<Tropa[]>>;
  findByCuartel(cuartelId: number): Promise<Respuesta<Tropa[]>>;
  findWithRelations(id: number): Promise<Respuesta<Tropa>>;
  create(createDto: CreateTropa): Promise<Respuesta<Tropa>>;
  update(id: number, updateDto: UpdateTropa): Promise<Respuesta<Tropa>>;
  delete(id: number): Promise<Respuesta<void>>;
}

