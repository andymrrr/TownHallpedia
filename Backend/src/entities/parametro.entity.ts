import { Entity, Column, Index } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity('parametro')
@Index(['tipo', 'clave'], { unique: true })
export class Parametro extends BaseEntity {
  @Column({ name: 'tipo', type: 'varchar', length: 50, nullable: false })
  tipo: string; // Ejemplo: 'tipo_recurso', 'tipo_tropa'

  @Column({ name: 'clave', type: 'varchar', length: 100, nullable: false })
  clave: string; // Ejemplo: 'Oro', 'Elixir', 'Terrestre', 'Aérea'

  @Column({ name: 'valor', type: 'varchar', length: 200, nullable: true })
  valor: string; // Valor opcional del parámetro

  @Column({ name: 'descripcion', type: 'text', nullable: true })
  descripcion: string; // Descripción opcional
}


