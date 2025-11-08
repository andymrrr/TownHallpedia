/**
 * Entidad de dominio para Hechizo
 */
export class HechizoDomain {
  constructor(
    public readonly id: number,
    public readonly nombre: string,
    public readonly tipo: string | null,
    public readonly espacioHechizo: number | null,
    public readonly descripcion: string | null,
    public readonly portada: string | null,
    public readonly fechaCreacion: Date,
    public readonly fechaActualizacion: Date,
  ) {}

  /**
   * Lógica de negocio: Verifica si ocupa espacio en la fábrica de hechizos
   */
  ocupaEspacio(): boolean {
    return this.espacioHechizo !== null && this.espacioHechizo > 0;
  }

  /**
   * Lógica de negocio: Verifica si tiene tipo definido
   */
  tieneTipo(): boolean {
    return this.tipo !== null && this.tipo.trim().length > 0;
  }

  /**
   * Lógica de negocio: Obtiene el espacio que ocupa (0 si no ocupa)
   */
  obtenerEspacio(): number {
    return this.espacioHechizo || 0;
  }
}

