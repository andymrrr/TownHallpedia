import { Entity, Column, ManyToOne, JoinColumn, Index } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Ayuntamiento } from './ayuntamiento.entity';

export enum TipoEntidad {
  EDIFICIO = 'Edificio',
  TROPA = 'Tropa',
  HEROE = 'Heroe',
  HECHIZO = 'Hechizo',
}

@Entity('nivel_detalle')
@Index(['tipoEntidad', 'entidadId', 'nivel'], { unique: true })
export class NivelDetalle extends BaseEntity {
  @Column({ 
    name: 'tipo_entidad', 
    type: 'varchar', 
    length: 20, 
    nullable: false,
    enum: TipoEntidad
  })
  tipoEntidad: TipoEntidad;

  @Column({ name: 'entidad_id', type: 'int', nullable: false })
  entidadId: number;

  @Column({ name: 'nivel', type: 'int', nullable: false })
  nivel: number;

  @Column({ name: 'costo_mejora', type: 'int', nullable: true })
  costoMejora: number;

  @Column({ name: 'tipo_recurso', type: 'varchar', length: 20, nullable: true })
  tipoRecurso: string;

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
