/**
 * Representa un item de héroe en la lista
 */
export interface HeroListItem {
  id: number;
  nombre: string;
  descripcion?: string;
  tipoRecursoNombre?: string;
  imagenUrl?: string;
  nivelMaximo?: number;
  nivelAyuntamientoDesbloqueo?: number;
  // Características adicionales (pueden venir de otra fuente o calcularse)
  danoPorSegundo?: number;
  vida?: number;
  habilidad?: string;
  rol?: 'Tanque' | 'Ofensivo' | 'Soporte';
}

