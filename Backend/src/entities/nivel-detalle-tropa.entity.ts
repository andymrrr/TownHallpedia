import { Entity, Column, ManyToOne, JoinColumn, Index, Unique } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Tropa } from './tropa.entity';
import { Ayuntamiento } from './ayuntamiento.entity';
import { Recurso } from './recurso.entity';

@Entity('nivel_detalle_tropa')
@Unique(['tropaId', 'nivel'])
export class NivelDetalleTropa extends BaseEntity {
  @Column({ name: 'tropa_id', type: 'int', nullable: false })
  tropaId: number;

  @ManyToOne(() => Tropa, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'tropa_id' })
  tropa: Tropa;

  @Column({ name: 'nivel', type: 'int', nullable: false })
  nivel: number;

  @Column({ name: 'costo_mejora', type: 'int', nullable: true })
  costoMejora: number;

  @Column({ name: 'tipo_recurso_id', type: 'int', nullable: true })
  tipoRecursoId: number;

  @ManyToOne(() => Recurso, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'tipo_recurso_id' })
  tipoRecurso: Recurso;

  @Column({ name: 'tiempo_horas', type: 'int', nullable: true })
  tiempoHoras: number;

  @Column({ name: 'dano_por_segundo', type: 'float', nullable: true })
  danoPorSegundo: number;

  @Column({ name: 'vida', type: 'int', nullable: true })
  vida: number;

  @Column({ name: 'capacidad', type: 'int', nullable: true })
  capacidad: number;

  @Column({ name: 'desbloquea_en_ayuntamiento_id', type: 'int', nullable: true })
  desbloqueaEnAyuntamientoId: number;

  @ManyToOne(() => Ayuntamiento, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'desbloquea_en_ayuntamiento_id' })
  desbloqueaEnAyuntamiento: Ayuntamiento;
}

