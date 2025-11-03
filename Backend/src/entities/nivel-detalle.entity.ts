import { Entity, Column, ManyToOne, JoinColumn, Index } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Ayuntamiento } from './ayuntamiento.entity';
import { Parametro } from './parametro.entity';

export enum TipoEntidad {
  EDIFICIO = 'EDIFICIO',
  TROPA = 'TROPA',
  HECHIZO = 'HECHIZO',
  HEROE = 'HEROE',
  ANIMAL = 'ANIMAL',
}

@Entity('nivel_detalle')
@Index(['tipoEntidadParametroId', 'entidadId', 'nivel'], { unique: true })
export class NivelDetalle extends BaseEntity {
  @Column({ name: 'tipo_entidad_parametro_id', type: 'int', nullable: false })
  tipoEntidadParametroId: number;

  @ManyToOne(() => Parametro)
  @JoinColumn({ name: 'tipo_entidad_parametro_id' })
  tipoEntidadParametro: Parametro;

  @Column({ name: 'entidad_id', type: 'int', nullable: false })
  entidadId: number;

  @Column({ name: 'nivel', type: 'int', nullable: false })
  nivel: number;

  @Column({ name: 'costo_mejora', type: 'int', nullable: true })
  costoMejora: number;

  @Column({ name: 'tipo_recurso_parametro_id', type: 'int', nullable: true })
  tipoRecursoParametroId: number;

  @ManyToOne(() => Parametro)
  @JoinColumn({ name: 'tipo_recurso_parametro_id' })
  tipoRecursoParametro: Parametro;

  @Column({ name: 'tiempo_horas', type: 'int', nullable: true })
  tiempoHoras: number;

  @Column({ name: 'dano_por_segundo', type: 'float', nullable: true })
  danoPorSegundo: number;

  @Column({ name: 'vida', type: 'int', nullable: true })
  vida: number;

  @Column({ name: 'capacidad', type: 'int', nullable: true })
  capacidad: number;

  @Column({ name: 'desbloquea_en_ayuntamiento', type: 'int', nullable: true })
  desbloqueaEnAyuntamientoId: number;

  @ManyToOne(() => Ayuntamiento, (ayuntamiento) => ayuntamiento.nivelesDetalle)
  @JoinColumn({ name: 'desbloquea_en_ayuntamiento' })
  desbloqueaEnAyuntamiento: Ayuntamiento;
}
