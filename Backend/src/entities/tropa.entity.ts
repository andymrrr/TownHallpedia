import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Edificio } from './edificio.entity';
import { Parametro } from './parametro.entity';

@Entity('tropa')
export class Tropa extends BaseEntity {
  @Column({ name: 'nombre', type: 'varchar', length: 100, nullable: false })
  nombre: string;

  @Column({ name: 'tipo_parametro_id', type: 'int', nullable: true })
  tipoParametroId: number;

  @ManyToOne(() => Parametro)
  @JoinColumn({ name: 'tipo_parametro_id' })
  tipoParametro: Parametro;

  @Column({ name: 'espacio_ejercito', type: 'int', nullable: true })
  espacioEjercito: number;

  @Column({ name: 'descripcion', type: 'text', nullable: true })
  descripcion: string;

  @Column({ name: 'portada', type: 'varchar', length: 300, nullable: true })
  portada: string;

  @Column({ name: 'desbloquea_en_cuartel', type: 'int', nullable: true })
  desbloqueaEnCuartelId: number;

  @ManyToOne(() => Edificio, (edificio) => edificio.tropas)
  @JoinColumn({ name: 'desbloquea_en_cuartel' })
  desbloqueaEnCuartel: Edificio;
}
