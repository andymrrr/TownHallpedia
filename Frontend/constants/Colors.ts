// Colores temáticos estilo PlayStation Store
const tintColorLight = '#0070F3'; // Azul vibrante estilo PS Store
const tintColorDark = '#0070F3'; // Azul vibrante para modo oscuro

export default {
  light: {
    text: '#FFFFFF',
    background: '#0a0a0a', // Fondo casi negro estilo PS Store
    tint: tintColorLight,
    tabIconDefault: '#666666',
    tabIconSelected: tintColorLight,
    card: '#1a1a1a', // Cards oscuras pero más claras que el fondo
    cardBorder: '#2a2a2a', // Bordes sutiles
    primary: '#0070F3', // Azul PS
    secondary: '#4A90E2',
    accent: '#FFD700',
  },
  dark: {
    text: '#FFFFFF',
    background: '#000000', // Fondo negro puro estilo PS Store
    tint: tintColorDark,
    tabIconDefault: '#666666',
    tabIconSelected: tintColorDark,
    card: '#1a1a1a', // Cards con fondo oscuro
    cardBorder: '#2a2a2a', // Bordes sutiles
    primary: '#0070F3', // Azul PS
    secondary: '#4A90E2',
    accent: '#FFD700',
  },
};
