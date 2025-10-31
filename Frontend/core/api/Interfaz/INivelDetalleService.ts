import { Respuesta } from '@/core/Domain/Model/Comun/Respuesta';
import { NivelDetalle, CreateNivelDetalle, UpdateNivelDetalle, TipoEntidad } from '@/core/Domain/Model/NivelDetalle';

export interface INivelDetalleService {
  findAll(): Promise<Respuesta<NivelDetalle[]>>;
  findOne(id: number): Promise<Respuesta<NivelDetalle>>;
  findByEntidad(tipoEntidad: TipoEntidad, entidadId: number): Promise<Respuesta<NivelDetalle[]>>;
  findByNivel(tipoEntidad: TipoEntidad, entidadId: number, nivel: number): Promise<Respuesta<NivelDetalle>>;
  findByAyuntamiento(ayuntamientoId: number): Promise<Respuesta<NivelDetalle[]>>;
  findWithRelations(id: number): Promise<Respuesta<NivelDetalle>>;
  create(createDto: CreateNivelDetalle): Promise<Respuesta<NivelDetalle>>;
  update(id: number, updateDto: UpdateNivelDetalle): Promise<Respuesta<NivelDetalle>>;
  delete(id: number): Promise<Respuesta<void>>;
}

