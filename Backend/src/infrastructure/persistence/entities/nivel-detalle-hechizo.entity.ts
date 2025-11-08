import { Entity, Column, ManyToOne, JoinColumn, Index, Unique } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Hechizo } from './hechizo.entity';
import { Ayuntamiento } from './ayuntamiento.entity';
import { Recurso } from './recurso.entity';

@Entity('nivel_detalle_hechizo')
@Unique(['hechizoId', 'nivel'])
export class NivelDetalleHechizo extends BaseEntity {
  @Column({ name: 'hechizo_id', type: 'int', nullable: false })
  hechizoId: number;

  @ManyToOne(() => Hechizo, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'hechizo_id' })
  hechizo: Hechizo;

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

