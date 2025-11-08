import { Entity, Column, ManyToOne, JoinColumn, Index } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Edificio } from './edificio.entity';

export enum TipoTropa {
  TIERRA = 'TIERRA',
  AIRE = 'AIRE',
  ESPECIAL = 'ESPECIAL',
  SUPER = 'SUPER',
}

@Entity('tropa')
export class Tropa extends BaseEntity {
  @Column({ name: 'nombre', type: 'varchar', length: 100, nullable: false })
  nombre: string;

  @Column({
    name: 'tipo',
    type: 'enum',
    enum: TipoTropa,
    nullable: true,
  })
  tipo: TipoTropa;

  @Column({ name: 'espacio_ejercito', type: 'int', nullable: true })
  espacioEjercito: number;

  @Column({ name: 'descripcion', type: 'text', nullable: true })
  descripcion: string;

  @Column({ name: 'portada', type: 'varchar', length: 300, nullable: true })
  portada: string;

  @Column({ name: 'desbloquea_en_cuartel', type: 'int', nullable: true })
  desbloqueaEnCuartelId: number;

  @ManyToOne(() => Edificio, (edificio) => edificio.tropas, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'desbloquea_en_cuartel' })
  desbloqueaEnCuartel: Edificio;
}
