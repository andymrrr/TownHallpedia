import { TipoTropa } from '../../infrastructure/persistence/entities/tropa.entity';
import { Edificio } from '../../infrastructure/persistence/entities/edificio.entity';

/**
 * Entidad de dominio para Tropa
 */
export class TropaDomain {
  constructor(
    public readonly id: number,
    public readonly nombre: string,
    public readonly tipo: TipoTropa | null,
    public readonly espacioEjercito: number | null,
    public readonly descripcion: string | null,
    public readonly portada: string | null,
    public readonly desbloqueaEnCuartelId: number | null,
    public readonly fechaCreacion: Date,
    public readonly fechaActualizacion: Date,
    public readonly desbloqueaEnCuartel?: Edificio,
  ) {}

  /**
   * Lógica de negocio: Verifica si es una tropa de tierra
   */
  esTierra(): boolean {
    return this.tipo === TipoTropa.TIERRA;
  }

  /**
   * Lógica de negocio: Verifica si es una tropa aérea
   */
  esAire(): boolean {
    return this.tipo === TipoTropa.AIRE;
  }

  /**
   * Lógica de negocio: Verifica si es una tropa especial
   */
  esEspecial(): boolean {
    return this.tipo === TipoTropa.ESPECIAL || this.tipo === TipoTropa.SUPER;
  }

  /**
   * Lógica de negocio: Verifica si ocupa espacio en el ejército
   */
  ocupaEspacio(): boolean {
    return this.espacioEjercito !== null && this.espacioEjercito > 0;
  }
}

