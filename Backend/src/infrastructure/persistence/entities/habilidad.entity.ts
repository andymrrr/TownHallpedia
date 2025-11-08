import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Heroe } from './heroe.entity';

@Entity('habilidad')
export class Habilidad extends BaseEntity {
  @Column({ name: 'nombre', type: 'varchar', length: 100, nullable: false })
  nombre: string;

  @Column({ name: 'descripcion', type: 'text', nullable: true })
  descripcion: string;

  @Column({ name: 'heroe_id', type: 'int', nullable: false })
  heroeId: number;

  @ManyToOne(() => Heroe, (heroe) => heroe.habilidades, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'heroe_id' })
  heroe: Heroe;

  @Column({ name: 'portada', type: 'varchar', length: 300, nullable: true })
  portada: string;
}

