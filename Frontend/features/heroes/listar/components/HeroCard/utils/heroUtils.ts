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
 * Estilo PlayStation Store
 */
export function getRoleColor(rol: string): string {
  if (rol === 'Tanque') return '#2ECC71';
  if (rol === 'Ofensivo') return '#E74C3C';
  return '#0070F3'; // Soporte - Azul PlayStation
}

/**
 * Obtiene los colores del gradiente para el héroe basado en su rol
 * Estilo PlayStation Store con gradientes sutiles
 */
export function getHeroGradient(roleColor: string, colorScheme?: 'light' | 'dark' | null): string[] {
  // Crear variaciones del color del rol para el gradiente estilo PS Store
  const baseColor = roleColor;
  
  // Para modo oscuro (PS Store style), usar gradientes más sutiles
  return [
    baseColor + '25', // Más transparente
    baseColor + '10', // Menos transparente
  ];
}

