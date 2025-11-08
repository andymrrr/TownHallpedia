/**
 * Representa un item de edificio en la lista
 */
export interface EdificioListItem {
  id: number;
  nombre: string;
  descripcion?: string;
  tipo?: string;
  imagenUrl?: string;
  nivelRequeridoTH?: number;
  nivelMaximo?: number;
  costoMejora?: number;
  tiempoMejoraHoras?: number;
}

