import { Respuesta } from '@/core/Domain/Model/Comun/Respuesta';
import { DesbloqueosAyuntamiento, CreateDesbloqueosAyuntamiento, UpdateDesbloqueosAyuntamiento } from '@/core/Domain/Model/DesbloqueosAyuntamiento';
import { TipoEntidad } from '@/core/Domain/Model/NivelDetalle';

export interface IDesbloqueosAyuntamientoService {
  findAll(): Promise<Respuesta<DesbloqueosAyuntamiento[]>>;
  findOne(id: number): Promise<Respuesta<DesbloqueosAyuntamiento>>;
  findByAyuntamiento(ayuntamientoId: number): Promise<Respuesta<DesbloqueosAyuntamiento[]>>;
  findByEntidad(tipoEntidad: TipoEntidad, entidadId: number): Promise<Respuesta<DesbloqueosAyuntamiento[]>>;
  findByAyuntamientoAndEntidad(ayuntamientoId: number, tipoEntidad: TipoEntidad, entidadId: number): Promise<Respuesta<DesbloqueosAyuntamiento>>;
  findWithRelations(id: number): Promise<Respuesta<DesbloqueosAyuntamiento>>;
  create(createDto: CreateDesbloqueosAyuntamiento): Promise<Respuesta<DesbloqueosAyuntamiento>>;
  update(id: number, updateDto: UpdateDesbloqueosAyuntamiento): Promise<Respuesta<DesbloqueosAyuntamiento>>;
  delete(id: number): Promise<Respuesta<void>>;
}

