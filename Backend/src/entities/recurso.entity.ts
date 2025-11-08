import { Entity, Column, Index, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity('recurso')
@Index(['nombre'], { unique: true })
export class Recurso extends BaseEntity {
  @Column({ name: 'nombre', type: 'varchar', length: 50, nullable: false, unique: true })
  nombre: string; // Ej: 'ORO', 'ELIXIR', 'ELIXIR_OSCURO', 'GEMA'

  @Column({ name: 'descripcion', type: 'text', nullable: true })
  descripcion: string;
}

