/**
 * Helper para convertir nombres de recursos del seed a nombres en BD
 */
export class RecursoConverterHelper {
  private static readonly MAPEO: Record<string, string> = {
    'Oro': 'ORO',
    'Elixir': 'ELIXIR',
    'Elixir Oscuro': 'ELIXIR_OSCURO',
    'Gema': 'GEMA',
  };

  /**
   * Convierte nombre de recurso del seed a nombre de recurso en BD
   */
  static convertir(nombre: string): string {
    return this.MAPEO[nombre] || nombre.toUpperCase();
  }
}

