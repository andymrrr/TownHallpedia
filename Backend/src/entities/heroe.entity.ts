import { Entity, Column } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity('heroe')
export class Heroe extends BaseEntity {
  @Column({ name: 'nombre', type: 'varchar', length: 100, nullable: false })
  nombre: string;

  @Column({ name: 'descripcion', type: 'text', nullable: true })
  descripcion: string;

  @Column({ name: 'tipo_recurso', type: 'varchar', length: 20, nullable: true })
  tipoRecurso: string;

  @Column({ name: 'portada', type: 'varchar', length: 300, nullable: true })
  portada: string;
}
