import { Entity, Column, ManyToOne, JoinColumn, Index, Unique } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Ayuntamiento } from './ayuntamiento.entity';
import { Heroe } from './heroe.entity';

@Entity('desbloqueos_ayuntamiento_heroe')
@Unique(['ayuntamientoId', 'heroeId'])
// Nota: La restricción CHECK se define en el esquema SQL (database_schema_improved.sql)
export class DesbloqueosAyuntamientoHeroe extends BaseEntity {
  @Column({ name: 'ayuntamiento_id', type: 'int', nullable: false })
  ayuntamientoId: number;

  @ManyToOne(() => Ayuntamiento, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'ayuntamiento_id' })
  ayuntamiento: Ayuntamiento;

  @Column({ name: 'heroe_id', type: 'int', nullable: false })
  heroeId: number;

  @ManyToOne(() => Heroe, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'heroe_id' })
  heroe: Heroe;

  @Column({ name: 'es_nuevo', type: 'boolean', nullable: false, default: false })
  esNuevo: boolean; // TRUE si es la primera vez que se desbloquea este héroe, FALSE si solo se desbloquean niveles adicionales

  @Column({ name: 'nivel_minimo_disponible', type: 'int', nullable: false })
  nivelMinimoDisponible: number; // Nivel mínimo del héroe disponible al desbloquearse

  @Column({ name: 'nivel_maximo_disponible', type: 'int', nullable: false })
  nivelMaximoDisponible: number; // Nivel máximo del héroe disponible al desbloquearse
}

