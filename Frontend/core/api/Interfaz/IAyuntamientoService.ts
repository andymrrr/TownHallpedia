import { Respuesta } from '@/core/Domain/Model/Comun/Respuesta';
import { Ayuntamiento, CreateAyuntamiento, UpdateAyuntamiento } from '@/core/Domain/Model/Ayuntamiento';

export interface IAyuntamientoService {
  findAll(): Promise<Respuesta<Ayuntamiento[]>>;
  findOne(id: number): Promise<Respuesta<Ayuntamiento>>;
  findByNivel(nivel: number): Promise<Respuesta<Ayuntamiento>>;
  findWithDesbloqueos(id: number): Promise<Respuesta<Ayuntamiento>>;
  create(createDto: CreateAyuntamiento): Promise<Respuesta<Ayuntamiento>>;
  update(id: number, updateDto: UpdateAyuntamiento): Promise<Respuesta<Ayuntamiento>>;
  delete(id: number): Promise<Respuesta<void>>;
}

