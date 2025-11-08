# 📱 TownHallpedia Frontend

Aplicación móvil para TownHallpedia construida con React Native, Expo y TypeScript. Proporciona una interfaz nativa para consultar información detallada de Clash of Clans.

## 🚀 Características

- 📱 **Aplicación Móvil Nativa** - iOS y Android con React Native/Expo
- 🎨 **UI Moderna** - Interfaz intuitiva y responsive
- 🔍 **Búsqueda Avanzada** - Búsqueda rápida y filtrado de contenido
- 📊 **Información Detallada** - Visualización completa de estadísticas
- 🔓 **Sistema de Desbloqueos** - Visualización de requisitos por nivel
- ⚡ **Performance Optimizada** - Caché inteligente y lazy loading
- 🎯 **TypeScript Completo** - 100% tipado

## 🛠️ Tecnologías

- **React Native** - Framework para aplicaciones móviles
- **Expo** - Plataforma de desarrollo y despliegue
- **TypeScript** - Tipado estático
- **Expo Router** - Navegación basada en archivos
- **React Query (@tanstack/react-query)** - Gestión de estado del servidor
- **Axios** - Cliente HTTP
- **AsyncStorage** - Almacenamiento local

## 📋 Prerrequisitos

- **Node.js** (v18 o superior)
- **npm** o **yarn**
- **Expo CLI** (opcional, se puede usar `npx expo`)
- **Backend ejecutándose** (ver [Backend README](../Backend/README.md))

## 🚀 Instalación

1. **Instalar dependencias**

```bash
cd Frontend
npm install
```

2. **Configurar variables de entorno**

Crear un archivo `.env` en la raíz del Frontend (si es necesario):

```env
API_BASE_URL=http://localhost:3000
```

3. **Iniciar la aplicación**

```bash
# Desarrollo
npm start

# Android
npm run android

# iOS
npm run ios

# Web
npm run web
```

## 📁 Estructura del Proyecto

```
Frontend/
├── app/                          # Expo Router - Screens y navegación
│   ├── (tabs)/                  # Tabs principales
│   │   ├── index.tsx            # Screen de Ayuntamientos
│   │   ├── buscar.tsx           # Screen de Búsqueda
│   │   ├── heroes.tsx           # Screen de Héroes
│   │   ├── hechizos.tsx         # Screen de Hechizos
│   │   └── _layout.tsx          # Layout de tabs
│   ├── ayuntamientos/           # Detalle de ayuntamientos
│   │   └── [nivel].tsx
│   ├── edificios/               # Detalle de edificios
│   │   └── [id].tsx
│   ├── heroes/                  # Detalle de héroes
│   │   └── [id].tsx
│   └── hechizos/                # Detalle de hechizos
│       └── [id].tsx
│
├── components/                   # Componentes UI reutilizables
│   ├── common/                  # Componentes comunes
│   │   ├── header/              # Header personalizado
│   │   ├── ImageWithFallback.tsx
│   │   └── states/              # Estados de carga/error
│   ├── layout/                  # Componentes de layout
│   │   └── tabs/                # Componentes de tabs
│   └── CategoryCard.tsx
│
├── core/                         # Lógica de negocio (Clean Architecture)
│   ├── Domain/                  # Capa de Dominio
│   │   ├── Model/               # Modelos de dominio
│   │   └── CasoUso/             # Casos de uso
│   └── api/                     # Capa de API
│       ├── Interfaz/            # Interfaces de API
│       ├── Implementacion/      # Implementación de API
│       └── configuracion/       # Configuración de API
│
├── features/                     # Features organizadas por funcionalidad
│   ├── ayuntamientos/
│   │   ├── detalle/             # Feature de detalle
│   │   │   ├── components/
│   │   │   ├── viewModels/
│   │   │   └── hooks/
│   │   └── listar/              # Feature de listado
│   │       ├── components/
│   │       ├── viewModels/
│   │       └── hooks/
│   ├── edificios/
│   ├── heroes/
│   ├── hechizos/
│   └── buscar/
│
├── hooks/                        # Custom hooks compartidos
│   ├── ayuntamiento/
│   ├── edificio/
│   ├── heroe/
│   └── hechizo/
│
├── utils/                        # Utilidades
│   ├── Api/
│   │   └── ManejoErrores.ts
│   └── images/
│       └── defaultImages.ts
│
├── constants/                    # Constantes
│   └── Colors.ts
│
└── assets/                       # Recursos estáticos
    ├── images/
    └── fonts/
```

## 🏗️ Arquitectura

El frontend implementa una **arquitectura Clean** con organización por features:

### Capas

1. **Presentation Layer** (`app/`, `components/`)
   - Screens y componentes UI
   - ViewModels para lógica de presentación
   - Hooks de presentación

2. **Application Layer** (`features/`)
   - Features organizadas por funcionalidad
   - ViewModels específicos de cada feature
   - Componentes específicos

3. **Domain Layer** (`core/Domain/`)
   - Modelos de dominio
   - Casos de uso
   - Lógica de negocio

4. **Infrastructure Layer** (`core/api/`)
   - Implementación de API
   - Configuración de cliente HTTP
   - Manejo de errores

### Principios

- **Feature-Based Organization**: Cada feature agrupa sus componentes, ViewModels y hooks
- **MVVM Pattern**: ViewModels separan la lógica de presentación de la UI
- **Separation of Concerns**: Cada capa tiene responsabilidades claras
- **Type Safety**: 100% tipado en TypeScript
- **Reusabilidad**: Componentes y hooks compartidos

## 📱 Features Principales

### 🏛️ Ayuntamientos

- Listado de todos los niveles de ayuntamiento
- Detalle por nivel con capacidades y costos
- Visualización de desbloqueos por nivel

### 🏗️ Edificios

- Listado de edificios por tipo
- Detalle de edificio con mejoras
- Tropas desbloqueables por edificio

### ⚔️ Tropas

- Listado de tropas
- Filtrado por tipo (Normal/Oscura)
- Estadísticas por nivel

### 🦸 Héroes

- Listado de héroes
- Detalle con habilidades
- Niveles de mejora

### 🔮 Hechizos

- Listado de hechizos
- Filtrado por tipo
- Estadísticas por nivel

### 🔍 Búsqueda

- Búsqueda global de todas las entidades
- Filtrado avanzado
- Resultados en tiempo real

## 🎨 Componentes Principales

### Componentes Comunes

- `AppHeader` - Header personalizado
- `ImageWithFallback` - Imagen con fallback
- `CategoryCard` - Tarjeta de categoría
- Estados de carga/error/vacío

### Componentes de Features

- `TownHallCard` - Tarjeta de ayuntamiento
- Componentes específicos por feature

## 🔌 Hooks Personalizados

### Hooks de Datos

- `useAyuntamientos` - Obtener ayuntamientos
- `useAyuntamientoPorId` - Obtener por ID
- `useAyuntamientoPorNivel` - Obtener por nivel
- `useEdificios` - Obtener edificios
- `useHeroes` - Obtener héroes
- `useHechizos` - Obtener hechizos

### Hooks de Presentación

- `useAyuntamientosScreen` - Lógica de screen de ayuntamientos
- ViewModels específicos por feature

## 📦 Scripts Disponibles

```bash
# Desarrollo
npm start                 # Inicia Expo
npm run android          # Ejecuta en Android
npm run ios              # Ejecuta en iOS
npm run web              # Ejecuta en web

# Testing
npm test                 # Ejecuta tests
```

## 🧪 Testing

```bash
npm test
```

## 🎯 Características Técnicas

### Gestión de Estado

- **React Query** para datos del servidor
- Caché automático e inteligente
- Refetch automático
- Optimistic updates

### Navegación

- **Expo Router** para navegación basada en archivos
- Navegación tipo-stack y tabs
- Deep linking support

### Manejo de Errores

- Manejo centralizado de errores
- Estados de error en UI
- Retry automático

### Performance

- Lazy loading de imágenes
- Caché de datos
- Optimización de renders

## 🔗 Integración con Backend

El frontend se conecta al backend mediante:

- **API RESTful** - Endpoints documentados en Swagger
- **Axios** - Cliente HTTP configurado
- **React Query** - Gestión de estado del servidor

Ver [Backend README](../Backend/README.md) para más información sobre la API.

## 📝 Convenciones de Código

- **TypeScript**: Todo el código está tipado
- **Naming**: PascalCase para componentes, camelCase para funciones
- **Imports**: Usar alias `@/` para imports absolutos
- **Components**: Un componente por archivo
- **Hooks**: Prefijo `use` para custom hooks

## 🚀 Despliegue

### Desarrollo

```bash
npm start
```

### Producción

```bash
# Build para producción
expo build:android
expo build:ios

# O usar EAS Build
eas build --platform android
eas build --platform ios
```

## 📚 Documentación Adicional

- [Expo Documentation](https://docs.expo.dev)
- [React Native Documentation](https://reactnative.dev)
- [Expo Router Documentation](https://docs.expo.dev/router/introduction/)
- [React Query Documentation](https://tanstack.com/query/latest)

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia **UNLICENSED**.

## 🔗 Enlaces

- **Backend**: [Backend README](../Backend/README.md)
- **Proyecto Principal**: [README Principal](../README.md)
- **API Docs**: http://localhost:3000/api/docs (cuando el backend esté ejecutándose)

