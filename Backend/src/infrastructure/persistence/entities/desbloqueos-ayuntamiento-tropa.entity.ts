import { Entity, Column, ManyToOne, JoinColumn, Index, Unique } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Ayuntamiento } from './ayuntamiento.entity';
import { Tropa } from './tropa.entity';

@Entity('desbloqueos_ayuntamiento_tropa')
@Unique(['ayuntamientoId', 'tropaId'])
// Nota: La restricción CHECK se define en el esquema SQL (database_schema_improved.sql)
export class DesbloqueosAyuntamientoTropa extends BaseEntity {
  @Column({ name: 'ayuntamiento_id', type: 'int', nullable: false })
  ayuntamientoId: number;

  @ManyToOne(() => Ayuntamiento, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'ayuntamiento_id' })
  ayuntamiento: Ayuntamiento;

  @Column({ name: 'tropa_id', type: 'int', nullable: false })
  tropaId: number;

  @ManyToOne(() => Tropa, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'tropa_id' })
  tropa: Tropa;

  @Column({ name: 'es_nuevo', type: 'boolean', nullable: false, default: false })
  esNuevo: boolean; // TRUE si es la primera vez que se desbloquea esta tropa, FALSE si solo se desbloquean niveles adicionales

  @Column({ name: 'nivel_minimo_disponible', type: 'int', nullable: false })
  nivelMinimoDisponible: number; // Nivel mínimo de la tropa disponible al desbloquearse

  @Column({ name: 'nivel_maximo_disponible', type: 'int', nullable: false })
  nivelMaximoDisponible: number; // Nivel máximo de la tropa disponible al desbloquearse
}

