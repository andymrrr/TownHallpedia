import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Tropa } from './tropa.entity';
import { NivelDetalle } from './nivel-detalle.entity';
import { DesbloqueosAyuntamiento } from './desbloqueos-ayuntamiento.entity';

@Entity('edificio')
export class Edificio extends BaseEntity {
  @Column({ name: 'nombre', type: 'varchar', length: 100, nullable: false })
  nombre: string;

  @Column({ name: 'tipo', type: 'varchar', length: 50, nullable: true })
  tipo: string;

  @Column({ name: 'descripcion', type: 'text', nullable: true })
  descripcion: string;

  @OneToMany(() => Tropa, (tropa) => tropa.desbloqueaEnCuartel)
  tropas: Tropa[];

  @OneToMany(() => NivelDetalle, (nivelDetalle) => nivelDetalle.entidadId)
  nivelesDetalle: NivelDetalle[];

  @OneToMany(() => DesbloqueosAyuntamiento, (desbloqueo) => desbloqueo.entidadId)
  desbloqueos: DesbloqueosAyuntamiento[];
}
