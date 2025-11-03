import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Parametro } from './parametro.entity';

@Entity('animal')
export class Animal extends BaseEntity {
  @Column({ name: 'nombre', type: 'varchar', length: 100, nullable: false })
  nombre: string;

  @Column({ name: 'descripcion', type: 'text', nullable: true })
  descripcion: string;

  @Column({ name: 'tipo_parametro_id', type: 'int', nullable: true })
  tipoParametroId: number;

  @ManyToOne(() => Parametro)
  @JoinColumn({ name: 'tipo_parametro_id' })
  tipoParametro: Parametro;

  @Column({ name: 'portada', type: 'varchar', length: 300, nullable: true })
  portada: string;
}


