import { Entity, Column, ManyToOne, JoinColumn, Index, Unique } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Ayuntamiento } from './ayuntamiento.entity';
import { Animal } from './animal.entity';

@Entity('desbloqueos_ayuntamiento_animal')
@Unique(['ayuntamientoId', 'animalId'])
// Nota: La restricción CHECK se define en el esquema SQL (database_schema_improved.sql)
export class DesbloqueosAyuntamientoAnimal extends BaseEntity {
  @Column({ name: 'ayuntamiento_id', type: 'int', nullable: false })
  ayuntamientoId: number;

  @ManyToOne(() => Ayuntamiento, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'ayuntamiento_id' })
  ayuntamiento: Ayuntamiento;

  @Column({ name: 'animal_id', type: 'int', nullable: false })
  animalId: number;

  @ManyToOne(() => Animal, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'animal_id' })
  animal: Animal;

  @Column({ name: 'es_nuevo', type: 'boolean', nullable: false, default: false })
  esNuevo: boolean; // TRUE si es la primera vez que se desbloquea este animal, FALSE si solo se desbloquean niveles adicionales

  @Column({ name: 'nivel_minimo_disponible', type: 'int', nullable: false })
  nivelMinimoDisponible: number; // Nivel mínimo del animal disponible al desbloquearse

  @Column({ name: 'nivel_maximo_disponible', type: 'int', nullable: false })
  nivelMaximoDisponible: number; // Nivel máximo del animal disponible al desbloquearse
}

