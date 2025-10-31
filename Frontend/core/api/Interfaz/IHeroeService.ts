import { Respuesta } from '@/core/Domain/Model/Comun/Respuesta';
import { Heroe, CreateHeroe, UpdateHeroe } from '@/core/Domain/Model/Heroe';

export interface IHeroeService {
  findAll(): Promise<Respuesta<Heroe[]>>;
  findOne(id: number): Promise<Respuesta<Heroe>>;
  findByTipoRecurso(tipoRecurso: string): Promise<Respuesta<Heroe[]>>;
  findWithRelations(id: number): Promise<Respuesta<Heroe>>;
  create(createDto: CreateHeroe): Promise<Respuesta<Heroe>>;
  update(id: number, updateDto: UpdateHeroe): Promise<Respuesta<Heroe>>;
  delete(id: number): Promise<Respuesta<void>>;
}

