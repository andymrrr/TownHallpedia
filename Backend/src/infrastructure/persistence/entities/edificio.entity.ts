import { Entity, Column, OneToMany, ManyToOne, JoinColumn, Index } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Tropa } from './tropa.entity';

export enum TipoEdificio {
  DEFENSA = 'DEFENSA',
  RECURSO = 'RECURSO',
  TROPAS = 'TROPAS',
  ESPECIAL = 'ESPECIAL',
  HECHIZOS = 'HECHIZOS',
  ALMACEN = 'ALMACEN',
  OTRO = 'OTRO',
}

@Entity('edificio')
export class Edificio extends BaseEntity {
  @Column({ name: 'nombre', type: 'varchar', length: 100, nullable: false })
  nombre: string;

  @Column({
    name: 'tipo',
    type: 'enum',
    enum: TipoEdificio,
    nullable: true,
  })
  tipo: TipoEdificio;

  @Column({ name: 'descripcion', type: 'text', nullable: true })
  descripcion: string;

  @Column({ name: 'portada', type: 'varchar', length: 300, nullable: true })
  portada: string;

  @OneToMany(() => Tropa, (tropa) => tropa.desbloqueaEnCuartel)
  tropas: Tropa[];
}
