# Componentes de Ayuntamiento

Esta carpeta contiene los componentes relacionados con la visualización de ayuntamientos (Town Halls) en la aplicación.

## Estructura

- `TownHallCard.tsx` - Componente principal para mostrar tarjetas de ayuntamientos
- `townHallImages.ts` - Utilidades para manejar imágenes de ayuntamientos
- `index.ts` - Exportaciones del módulo

## Uso

```tsx
import { TownHallCard } from '@/components/ayuntamiento';

<TownHallCard
  nivel={10}
  capacidadOro={3000000}
  capacidadElixir={3000000}
  capacidadOscuro={30000}
  tiempoConstruccion={120}
  costoMejora={6000000}
  tipoRecurso="Oro"
  imagenUrl="https://ejemplo.com/imagen-th10.png"
  onPress={() => console.log('Ayuntamiento presionado')}
/>
```

## Agregar Imágenes Locales

Para agregar imágenes locales de ayuntamientos:

1. Crea una carpeta en `assets/images/townhalls/`
2. Guarda las imágenes con el formato: `th1.png`, `th2.png`, ..., `th15.png`
3. Actualiza `townHallImages.ts`:

```typescript
export function getTownHallImage(nivel: number, imagenUrl?: string) {
  if (imagenUrl) {
    return { uri: imagenUrl };
  }

  try {
    // Requiere la imagen local según el nivel
    const images: Record<number, ImageSourcePropType> = {
      1: require('@/assets/images/townhalls/th1.png'),
      2: require('@/assets/images/townhalls/th2.png'),
      // ... etc
    };
    return images[nivel] || null;
  } catch {
    return null;
  }
}
```

## Propiedades del TownHallCard

| Propiedad | Tipo | Descripción |
|-----------|------|-------------|
| `nivel` | `number` | Nivel del ayuntamiento (1-15) |
| `capacidadOro` | `number?` | Capacidad de almacenamiento de oro |
| `capacidadElixir` | `number?` | Capacidad de almacenamiento de elixir |
| `capacidadOscuro` | `number?` | Capacidad de almacenamiento de elixir oscuro |
| `tiempoConstruccion` | `number?` | Tiempo de construcción en horas |
| `costoMejora` | `number?` | Costo de mejora |
| `tipoRecurso` | `string?` | Tipo de recurso requerido |
| `imagenUrl` | `string?` | URL de la imagen del ayuntamiento |
| `onPress` | `() => void?` | Función llamada al presionar la tarjeta |
| `style` | `ViewStyle?` | Estilos adicionales |

