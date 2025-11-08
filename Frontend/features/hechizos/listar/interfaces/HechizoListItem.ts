/**
 * Representa un item de hechizo en la lista
 */
export interface HechizoListItem {
  id: number;
  nombre: string;
  descripcion?: string;
  tipo?: 'Elixir' | 'Oscuro' | 'Super';
  imagenUrl?: string;
  nivelRequeridoTH?: number;
  nivelMaximo?: number;
  costoMejora?: number;
  tiempoMejoraHoras?: number;
  espacioHechizo?: number;
}

