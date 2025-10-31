import { Respuesta } from '@/core/Domain/Model/Comun/Respuesta';
import { Edificio, CreateEdificio, UpdateEdificio } from '@/core/Domain/Model/Edificio';

export interface IEdificioService {
  findAll(): Promise<Respuesta<Edificio[]>>;
  findOne(id: number): Promise<Respuesta<Edificio>>;
  findByTipo(tipo: string): Promise<Respuesta<Edificio[]>>;
  findWithTropas(id: number): Promise<Respuesta<Edificio>>;
  create(createDto: CreateEdificio): Promise<Respuesta<Edificio>>;
  update(id: number, updateDto: UpdateEdificio): Promise<Respuesta<Edificio>>;
  delete(id: number): Promise<Respuesta<void>>;
}

