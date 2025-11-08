import { Entity, Column, ManyToOne, JoinColumn, Index, Unique } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Ayuntamiento } from './ayuntamiento.entity';
import { Edificio } from './edificio.entity';

@Entity('desbloqueos_ayuntamiento_edificio')
@Unique(['ayuntamientoId', 'edificioId'])
// Nota: La restricción CHECK se define en el esquema SQL (database_schema_improved.sql)
export class DesbloqueosAyuntamientoEdificio extends BaseEntity {
  @Column({ name: 'ayuntamiento_id', type: 'int', nullable: false })
  ayuntamientoId: number;

  @ManyToOne(() => Ayuntamiento, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'ayuntamiento_id' })
  ayuntamiento: Ayuntamiento;

  @Column({ name: 'edificio_id', type: 'int', nullable: false })
  edificioId: number;

  @ManyToOne(() => Edificio, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'edificio_id' })
  edificio: Edificio;

  @Column({ name: 'es_nuevo', type: 'boolean', nullable: false, default: false })
  esNuevo: boolean; // TRUE si es la primera vez que se desbloquea este edificio, FALSE si solo se desbloquean niveles adicionales

  @Column({ name: 'nivel_minimo_disponible', type: 'int', nullable: false })
  nivelMinimoDisponible: number; // Nivel mínimo del edificio disponible al desbloquearse

  @Column({ name: 'nivel_maximo_disponible', type: 'int', nullable: false })
  nivelMaximoDisponible: number; // Nivel máximo del edificio disponible al desbloquearse
}

