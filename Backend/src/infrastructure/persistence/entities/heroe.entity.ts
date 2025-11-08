import { Entity, Column, ManyToOne, JoinColumn, Index, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Recurso } from './recurso.entity';
import { Habilidad } from './habilidad.entity';

@Entity('heroe')
export class Heroe extends BaseEntity {
  @Column({ name: 'nombre', type: 'varchar', length: 100, nullable: false })
  nombre: string;

  @Column({ name: 'descripcion', type: 'text', nullable: true })
  descripcion: string;

  @Column({ name: 'tipo_recurso_id', type: 'int', nullable: true })
  tipoRecursoId: number;

  @ManyToOne(() => Recurso, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'tipo_recurso_id' })
  tipoRecurso: Recurso;

  @Column({ name: 'portada', type: 'varchar', length: 300, nullable: true })
  portada: string;

  @Column({ name: 'nivel_maximo', type: 'int', nullable: true })
  nivelMaximo: number;

  @Column({ name: 'nivel_ayuntamiento_desbloqueo', type: 'int', nullable: true })
  nivelAyuntamientoDesbloqueo: number;

  @Column({ name: 'vida', type: 'int', nullable: true })
  vida: number;

  @OneToMany(() => Habilidad, (habilidad) => habilidad.heroe)
  habilidades: Habilidad[];
}
