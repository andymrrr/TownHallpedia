# Componentes Comunes

Esta carpeta contiene componentes reutilizables que se usan en toda la aplicación.

## Header Components

### AppHeader

Header principal de la aplicación con SafeAreaView integrado. Ideal para pantallas principales.

#### Props

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `title` | `string` | **requerido** | Título principal del header |
| `subtitle` | `string?` | - | Subtítulo opcional |
| `showBackButton` | `boolean` | `false` | Mostrar botón de retroceso |
| `onBackPress` | `() => void?` | - | Función llamada al presionar el botón de retroceso |
| `rightAction` | `ReactNode?` | - | Acción o componente a mostrar a la derecha |
| `variant` | `'default' \| 'compact' \| 'large'` | `'large'` | Tamaño del header |
| `centered` | `boolean` | `true` | Centrar el contenido del header |
| `style` | `ViewStyle?` | - | Estilos adicionales |

#### Ejemplo de uso

```tsx
import { AppHeader } from '@/components/common';

// Header simple
<AppHeader title="TownHallpedia" />

// Header con subtítulo
<AppHeader
  title="TownHallpedia"
  subtitle="Explora los niveles de Ayuntamiento"
  variant="large"
/>

// Header con botón de retroceso
<AppHeader
  title="Detalles"
  showBackButton
  onBackPress={() => router.back()}
/>

// Header con acción derecha
<AppHeader
  title="Ayuntamiento"
  rightAction={
    <Pressable onPress={handleSettings}>
      <FontAwesome name="cog" size={24} color={colors.text} />
    </Pressable>
  }
/>
```

### Header

Header más simple sin SafeAreaView. Útil cuando ya estás dentro de un SafeAreaView o en contextos específicos.

#### Props

Mismas props que `AppHeader` excepto que no incluye SafeAreaView.

#### Ejemplo de uso

```tsx
import { Header } from '@/components/common';

<SafeAreaView>
  <Header
    title="Mi Pantalla"
    subtitle="Descripción"
    variant="default"
  />
  {/* Resto del contenido */}
</SafeAreaView>
```

## Variantes

- **large**: Título grande (36px), ideal para pantallas principales
- **default**: Tamaño medio (28px), uso general
- **compact**: Tamaño pequeño (20px), para espacios reducidos

## Características

- ✅ Soporte para tema claro/oscuro automático
- ✅ SafeAreaView integrado en AppHeader
- ✅ Botón de retroceso opcional
- ✅ Acción personalizada a la derecha
- ✅ Múltiples variantes de tamaño
- ✅ Centrado o alineado a la izquierda
- ✅ Responsive y adaptable

