# Imágenes por Defecto

Este directorio contiene las imágenes por defecto que se mostrarán cuando una entidad no tenga una imagen (`portada: null`).

## Estructura de Archivos

Cada entidad debe tener su imagen por defecto:

- `heroe-default.png` - Imagen por defecto para héroes
- `hechizo-default.png` - Imagen por defecto para hechizos
- `edificio-default.png` - Imagen por defecto para edificios
- `ayuntamiento-default.png` - Imagen por defecto para ayuntamientos
- `tropa-default.png` - Imagen por defecto para tropas
- `animal-default.png` - Imagen por defecto para animales

## Especificaciones

- **Formato**: PNG (con transparencia recomendada)
- **Tamaño recomendado**: 512x512px o 1024x1024px
- **Estilo**: Debe ser consistente con el diseño de la aplicación
- **Fondo**: Transparente o con el color de fondo de la aplicación

## Uso

Las imágenes se cargan automáticamente a través del componente `ImageWithFallback` cuando `portada` es `null`.

Para activar las imágenes, descomenta las líneas en `utils/images/defaultImages.ts`:

```typescript
case EntityType.HEROE:
  return require('@/assets/images/defaults/heroe-default.png');
```

## Nota

Actualmente, si no hay imágenes en este directorio, se mostrará un icono de FontAwesome como placeholder.

