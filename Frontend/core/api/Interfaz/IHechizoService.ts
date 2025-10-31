import { Respuesta } from '@/core/Domain/Model/Comun/Respuesta';
import { Hechizo, CreateHechizo, UpdateHechizo } from '@/core/Domain/Model/Hechizo';

export interface IHechizoService {
  findAll(): Promise<Respuesta<Hechizo[]>>;
  findOne(id: number): Promise<Respuesta<Hechizo>>;
  findByTipo(tipo: string): Promise<Respuesta<Hechizo[]>>;
  findByEspacioHechizo(espacioHechizo: number): Promise<Respuesta<Hechizo[]>>;
  findWithRelations(id: number): Promise<Respuesta<Hechizo>>;
  create(createDto: CreateHechizo): Promise<Respuesta<Hechizo>>;
  update(id: number, updateDto: UpdateHechizo): Promise<Respuesta<Hechizo>>;
  delete(id: number): Promise<Respuesta<void>>;
}

