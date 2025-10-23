import { Entity, Column, ManyToOne, JoinColumn, Index } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Ayuntamiento } from './ayuntamiento.entity';
import { TipoEntidad } from './nivel-detalle.entity';

@Entity('desbloqueos_ayuntamiento')
@Index(['ayuntamientoId', 'tipoEntidad', 'entidadId'], { unique: true })
export class DesbloqueosAyuntamiento extends BaseEntity {
  @Column({ name: 'ayuntamiento_id', type: 'int', nullable: false })
  ayuntamientoId: number;

  @Column({ 
    name: 'tipo_entidad', 
    type: 'varchar', 
    length: 20, 
    nullable: false,
    enum: TipoEntidad
  })
  tipoEntidad: TipoEntidad;

  @Column({ name: 'entidad_id', type: 'int', nullable: false })
  entidadId: number;

  @ManyToOne(() => Ayuntamiento, (ayuntamiento) => ayuntamiento.desbloqueos)
  @JoinColumn({ name: 'ayuntamiento_id' })
  ayuntamiento: Ayuntamiento;
}
