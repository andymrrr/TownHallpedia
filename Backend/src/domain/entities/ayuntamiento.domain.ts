import { Recurso } from '../../infrastructure/persistence/entities/recurso.entity';

/**
 * Entidad de dominio para Ayuntamiento
 * Representa la lógica de negocio sin dependencias de infraestructura
 */
export class AyuntamientoDomain {
  constructor(
    public readonly id: number,
    public readonly nivel: number,
    public readonly capacidadAlmacenOro: number | null,
    public readonly capacidadAlmacenElixir: number | null,
    public readonly capacidadAlmacenOscuro: number | null,
    public readonly tiempoConstruccionHoras: number | null,
    public readonly costoMejora: number | null,
    public readonly tipoRecursoId: number | null,
    public readonly portada: string | null,
    public readonly fechaCreacion: Date,
    public readonly fechaActualizacion: Date,
    public readonly tipoRecurso?: Recurso,
  ) {}

  /**
   * Lógica de negocio: Verifica si puede almacenar una cantidad de recurso
   */
  puedeAlmacenar(recurso: 'oro' | 'elixir' | 'elixirOscuro', cantidad: number): boolean {
    switch (recurso) {
      case 'oro':
        return this.capacidadAlmacenOro !== null && cantidad <= this.capacidadAlmacenOro;
      case 'elixir':
        return this.capacidadAlmacenElixir !== null && cantidad <= this.capacidadAlmacenElixir;
      case 'elixirOscuro':
        return this.capacidadAlmacenOscuro !== null && cantidad <= this.capacidadAlmacenOscuro;
      default:
        return false;
    }
  }

  /**
   * Lógica de negocio: Verifica si es el nivel máximo
   */
  esNivelMaximo(): boolean {
    return this.nivel === 15;
  }

  /**
   * Lógica de negocio: Obtiene la capacidad total de almacenamiento
   */
  obtenerCapacidadTotal(): number {
    const oro = this.capacidadAlmacenOro || 0;
    const elixir = this.capacidadAlmacenElixir || 0;
    const elixirOscuro = this.capacidadAlmacenOscuro || 0;
    return oro + elixir + elixirOscuro;
  }

  /**
   * Lógica de negocio: Verifica si tiene todos los recursos configurados
   */
  tieneTodosLosRecursos(): boolean {
    return (
      this.capacidadAlmacenOro !== null &&
      this.capacidadAlmacenElixir !== null &&
      this.capacidadAlmacenOscuro !== null
    );
  }
}

