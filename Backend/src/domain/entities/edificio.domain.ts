import { TipoEdificio } from '../../infrastructure/persistence/entities/edificio.entity';
import { Tropa } from '../../infrastructure/persistence/entities/tropa.entity';

/**
 * Entidad de dominio para Edificio
 */
export class EdificioDomain {
  constructor(
    public readonly id: number,
    public readonly nombre: string,
    public readonly tipo: TipoEdificio | null,
    public readonly descripcion: string | null,
    public readonly portada: string | null,
    public readonly fechaCreacion: Date,
    public readonly fechaActualizacion: Date,
    public readonly tropas?: Tropa[],
  ) {}

  /**
   * Lógica de negocio: Verifica si es un edificio de defensa
   */
  esDefensa(): boolean {
    return this.tipo === TipoEdificio.DEFENSA;
  }

  /**
   * Lógica de negocio: Verifica si es un edificio de recursos
   */
  esRecurso(): boolean {
    return this.tipo === TipoEdificio.RECURSO;
  }

  /**
   * Lógica de negocio: Verifica si puede albergar tropas
   */
  puedeAlbergarTropas(): boolean {
    return this.tipo === TipoEdificio.TROPAS;
  }

  /**
   * Lógica de negocio: Obtiene la cantidad de tropas asociadas
   */
  obtenerCantidadTropas(): number {
    return this.tropas?.length || 0;
  }
}

