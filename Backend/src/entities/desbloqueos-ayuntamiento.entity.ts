import { Entity, Column, ManyToOne, JoinColumn, Index } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Ayuntamiento } from './ayuntamiento.entity';
import { Parametro } from './parametro.entity';

@Entity('desbloqueos_ayuntamiento')
@Index(['ayuntamientoId', 'tipoEntidadParametroId', 'entidadId'], { unique: true })
export class DesbloqueosAyuntamiento extends BaseEntity {
  @Column({ name: 'ayuntamiento_id', type: 'int', nullable: false })
  ayuntamientoId: number;

  @ManyToOne(() => Ayuntamiento, (ayuntamiento) => ayuntamiento.desbloqueos)
  @JoinColumn({ name: 'ayuntamiento_id' })
  ayuntamiento: Ayuntamiento;

  @Column({ name: 'tipo_entidad_parametro_id', type: 'int', nullable: false })
  tipoEntidadParametroId: number;

  @ManyToOne(() => Parametro)
  @JoinColumn({ name: 'tipo_entidad_parametro_id' })
  tipoEntidadParametro: Parametro;

  @Column({ name: 'entidad_id', type: 'int', nullable: false })
  entidadId: number;
}
