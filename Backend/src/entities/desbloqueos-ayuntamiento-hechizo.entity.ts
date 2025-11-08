import { Entity, Column, ManyToOne, JoinColumn, Index, Unique } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Ayuntamiento } from './ayuntamiento.entity';
import { Hechizo } from './hechizo.entity';

@Entity('desbloqueos_ayuntamiento_hechizo')
@Unique(['ayuntamientoId', 'hechizoId'])
// Nota: La restricción CHECK se define en el esquema SQL (database_schema_improved.sql)
export class DesbloqueosAyuntamientoHechizo extends BaseEntity {
  @Column({ name: 'ayuntamiento_id', type: 'int', nullable: false })
  ayuntamientoId: number;

  @ManyToOne(() => Ayuntamiento, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'ayuntamiento_id' })
  ayuntamiento: Ayuntamiento;

  @Column({ name: 'hechizo_id', type: 'int', nullable: false })
  hechizoId: number;

  @ManyToOne(() => Hechizo, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'hechizo_id' })
  hechizo: Hechizo;

  @Column({ name: 'es_nuevo', type: 'boolean', nullable: false, default: false })
  esNuevo: boolean; // TRUE si es la primera vez que se desbloquea este hechizo, FALSE si solo se desbloquean niveles adicionales

  @Column({ name: 'nivel_minimo_disponible', type: 'int', nullable: false })
  nivelMinimoDisponible: number; // Nivel mínimo del hechizo disponible al desbloquearse

  @Column({ name: 'nivel_maximo_disponible', type: 'int', nullable: false })
  nivelMaximoDisponible: number; // Nivel máximo del hechizo disponible al desbloquearse
}

