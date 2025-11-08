import { Recurso } from '../../infrastructure/persistence/entities/recurso.entity';
import { Habilidad } from '../../infrastructure/persistence/entities/habilidad.entity';

/**
 * Entidad de dominio para Heroe
 */
export class HeroeDomain {
  constructor(
    public readonly id: number,
    public readonly nombre: string,
    public readonly descripcion: string | null,
    public readonly tipoRecursoId: number | null,
    public readonly portada: string | null,
    public readonly nivelMaximo: number | null,
    public readonly nivelAyuntamientoDesbloqueo: number | null,
    public readonly vida: number | null,
    public readonly fechaCreacion: Date,
    public readonly fechaActualizacion: Date,
    public readonly tipoRecurso?: Recurso,
    public readonly habilidades?: Habilidad[],
  ) {}

  /**
   * Lógica de negocio: Verifica si el héroe está desbloqueado para un nivel de ayuntamiento
   */
  estaDesbloqueadoParaNivel(nivelAyuntamiento: number): boolean {
    return this.nivelAyuntamientoDesbloqueo !== null && nivelAyuntamiento >= this.nivelAyuntamientoDesbloqueo;
  }

  /**
   * Lógica de negocio: Verifica si tiene nivel máximo
   */
  tieneNivelMaximo(): boolean {
    return this.nivelMaximo !== null;
  }

  /**
   * Lógica de negocio: Obtiene la cantidad de habilidades
   */
  obtenerCantidadHabilidades(): number {
    return this.habilidades?.length || 0;
  }

  /**
   * Lógica de negocio: Verifica si tiene vida configurada
   */
  tieneVida(): boolean {
    return this.vida !== null && this.vida > 0;
  }
}

