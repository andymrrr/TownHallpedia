/**
 * Utilidades para el componente HeroCard
 */

/**
 * Formatea un número para mostrarlo de forma compacta
 */
export function formatNumber(num?: number): string {
  if (!num) return '—';
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
  return String(num);
}

/**
 * Obtiene el color del rol del héroe
 */
export function getRoleColor(rol: string): string {
  if (rol === 'Tanque') return '#2ECC71';
  if (rol === 'Ofensivo') return '#E74C3C';
  return '#3498DB'; // Soporte por defecto
}

/**
 * Obtiene los colores del gradiente para el héroe basado en su rol
 */
export function getHeroGradient(roleColor: string, colorScheme?: 'light' | 'dark' | null): string[] {
  // Crear variaciones del color del rol para el gradiente
  const baseColor = roleColor;
  
  // Para modo oscuro, usar colores más oscuros
  if (colorScheme === 'dark') {
    return [
      baseColor + '40', // Más transparente
      baseColor + '20', // Menos transparente
    ];
  }
  
  // Para modo claro, usar colores más vibrantes
  return [
    baseColor + '30',
    baseColor + '15',
  ];
}

