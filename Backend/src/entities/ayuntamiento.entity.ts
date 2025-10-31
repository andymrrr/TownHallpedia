import { Entity, Column, OneToMany, Unique } from 'typeorm';
import { BaseEntity } from './base.entity';
import { NivelDetalle } from './nivel-detalle.entity';
import { DesbloqueosAyuntamiento } from './desbloqueos-ayuntamiento.entity';

@Entity('ayuntamiento')
@Unique(['nivel'])
export class Ayuntamiento extends BaseEntity {
  @Column({ name: 'nivel', type: 'int', nullable: false })
  nivel: number;

  @Column({ name: 'capacidad_almacen_oro', type: 'int', nullable: true })
  capacidadAlmacenOro: number;

  @Column({ name: 'capacidad_almacen_elixir', type: 'int', nullable: true })
  capacidadAlmacenElixir: number;

  @Column({ name: 'capacidad_almacen_oscuro', type: 'int', nullable: true })
  capacidadAlmacenOscuro: number;

  @Column({ name: 'tiempo_construccion_horas', type: 'int', nullable: true })
  tiempoConstruccionHoras: number;

  @Column({ name: 'costo_mejora', type: 'int', nullable: true })
  costoMejora: number;

  @Column({ name: 'tipo_recurso', type: 'varchar', length: 20, nullable: true })
  tipoRecurso: string;

  @Column({ name: 'portada', type: 'varchar', length: 300, nullable: true })
  portada: string;

  @OneToMany(() => NivelDetalle, (nivelDetalle) => nivelDetalle.desbloqueaEnAyuntamiento)
  nivelesDetalle: NivelDetalle[];

  @OneToMany(() => DesbloqueosAyuntamiento, (desbloqueo) => desbloqueo.ayuntamiento)
  desbloqueos: DesbloqueosAyuntamiento[];
}
