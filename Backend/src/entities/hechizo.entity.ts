import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { NivelDetalle } from './nivel-detalle.entity';
import { DesbloqueosAyuntamiento } from './desbloqueos-ayuntamiento.entity';

@Entity('hechizo')
export class Hechizo extends BaseEntity {
  @Column({ name: 'nombre', type: 'varchar', length: 100, nullable: false })
  nombre: string;

  @Column({ name: 'tipo', type: 'varchar', length: 20, nullable: true })
  tipo: string;

  @Column({ name: 'espacio_hechizo', type: 'int', nullable: true })
  espacioHechizo: number;

  @Column({ name: 'descripcion', type: 'text', nullable: true })
  descripcion: string;

  @OneToMany(() => NivelDetalle, (nivelDetalle) => nivelDetalle.entidadId)
  nivelesDetalle: NivelDetalle[];

  @OneToMany(() => DesbloqueosAyuntamiento, (desbloqueo) => desbloqueo.entidadId)
  desbloqueos: DesbloqueosAyuntamiento[];
}
