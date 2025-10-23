import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { NivelDetalle } from './nivel-detalle.entity';
import { DesbloqueosAyuntamiento } from './desbloqueos-ayuntamiento.entity';

@Entity('heroe')
export class Heroe extends BaseEntity {
  @Column({ name: 'nombre', type: 'varchar', length: 100, nullable: false })
  nombre: string;

  @Column({ name: 'descripcion', type: 'text', nullable: true })
  descripcion: string;

  @Column({ name: 'tipo_recurso', type: 'varchar', length: 20, nullable: true })
  tipoRecurso: string;

  @OneToMany(() => NivelDetalle, (nivelDetalle) => nivelDetalle.entidadId)
  nivelesDetalle: NivelDetalle[];

  @OneToMany(() => DesbloqueosAyuntamiento, (desbloqueo) => desbloqueo.entidadId)
  desbloqueos: DesbloqueosAyuntamiento[];
}
