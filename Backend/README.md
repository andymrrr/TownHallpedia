# TownHallpedia Backend

Backend API RESTful para TownHallpedia construido con NestJS, TypeORM y PostgreSQL. Proporciona una base de datos integral de información del juego Clash of Clans.

## 🚀 Características

- **Arquitectura Clean Code**: Implementación de principios SOLID y patrones de diseño
- **TypeORM**: ORM robusto con soporte para PostgreSQL
- **Validación de Datos**: DTOs con class-validator para validación automática
- **Migraciones**: Sistema de migraciones para control de versiones de base de datos
- **Documentación Swagger**: Documentación automática e interactiva de la API
- **CORS**: Configuración de CORS para desarrollo y producción
- **Validación Global**: Validación automática de datos de entrada con transformación
- **Paginación**: Sistema de paginación estandarizado para todos los endpoints
- **Respuestas Estandarizadas**: Formato de respuesta consistente en toda la API
- **Sistema de Seed**: Carga inicial de datos de referencia del juego
- **Gestión de Relaciones**: Endpoints especializados para obtener entidades con sus relaciones

## 📋 Entidades del Sistema

### 🏛️ Ayuntamiento

- Niveles de ayuntamiento (1-15)
- Capacidades de almacenamiento (oro, elixir, oscuro)
- Tiempos de construcción y costos
- Relación con desbloqueos de todas las entidades

### 🏗️ Edificios

- Tipos: Defensa, Recurso, Tropas, Especial, Hechizos, Almacén, Otro
- Relación con tropas desbloqueables
- Niveles de mejora
- Descripción y portada

### ⚔️ Tropas

- Tropas normales y oscuras
- Espacio en ejército
- Desbloqueo por cuartel (edificio)
- Estadísticas por nivel

### 🦸 Héroes

- Héroes del juego
- Tipos de recurso requerido (oro, elixir oscuro)
- Niveles de mejora
- Habilidades asociadas
- Nivel de ayuntamiento de desbloqueo

### 🔮 Hechizos

- Hechizos normales y oscuros
- Espacio en hechizos
- Niveles de mejora
- Tipos de hechizo

### 🐾 Animales

- Animales del juego
- Tipos y descripciones
- Portadas

### ⚡ Habilidades

- Habilidades de héroes
- Relación con héroes
- Descripciones y efectos

### 📊 Nivel Detalle

- Detalles específicos por nivel para cada entidad
- Entidades separadas por tipo:
  - `NivelDetalleHeroe`
  - `NivelDetalleTropa`
  - `NivelDetalleHechizo`
  - `NivelDetalleEdificio`
  - `NivelDetalleAnimal`
- Costos, tiempos, estadísticas
- Desbloqueos por ayuntamiento

### 🔓 Desbloqueos Ayuntamiento

- Relación entre ayuntamientos y entidades
- Entidades separadas por tipo:
  - `DesbloqueosAyuntamientoHeroe`
  - `DesbloqueosAyuntamientoTropa`
  - `DesbloqueosAyuntamientoHechizo`
  - `DesbloqueosAyuntamientoEdificio`
  - `DesbloqueosAyuntamientoAnimal`
- Control de desbloqueos por nivel de ayuntamiento

### 💎 Recursos

- Tipos de recursos del juego
- Referencia para entidades que requieren recursos

## 🛠️ Instalación

### Prerrequisitos

- Node.js (v18+)
- PostgreSQL (v12+)
- npm o yarn

### Configuración

1. **Clonar el repositorio**

```bash
git clone <repository-url>
cd TownHallpedia/Backend
```

2. **Instalar dependencias**

```bash
npm install
```

3. **Configurar variables de entorno**

Crear un archivo `.env` en la raíz del proyecto con la siguiente configuración:

```env
# Entorno
NODE_ENV=development
PORT=3000

# Base de datos PostgreSQL
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=tu_password_seguro
DB_DATABASE=townhallpedia

# TypeORM (IMPORTANTE: NO usar synchronize=true en producción)
DB_SYNCHRONIZE=false
DB_LOGGING=false
DB_MIGRATIONS_RUN=false
```

> ⚠️ **IMPORTANTE**:
>
> - `DB_SYNCHRONIZE` debe estar en `false` en producción. Usa migraciones en su lugar.
> - `DB_MIGRATIONS_RUN` controla si las migraciones se ejecutan automáticamente al iniciar.

4. **Ejecutar migraciones**

```bash
npm run migration:run
```

5. **Iniciar el servidor**

```bash
# Desarrollo (con hot-reload)
npm run start:dev

# Producción
npm run build
npm run start:prod
```

6. **Acceder a la documentación**

- **API**: http://localhost:3000
- **Swagger UI**: http://localhost:3000/api/docs

## 📚 API Endpoints

Todos los endpoints devuelven respuestas en el formato estandarizado `Respuesta<T>`:

```typescript
{
  completado: boolean;
  mensaje?: string;
  datos?: T;
  errorTecnico?: string;
  errores?: string[] | null;
  tipoError?: string;
}
```

### 🏛️ Ayuntamientos

- `GET /ayuntamientos` - Listar todos los ayuntamientos
- `GET /ayuntamientos/paginacion` - Listar con paginación
  - Query params: `page`, `limit`, `sort`, `search`, `withCount`
- `GET /ayuntamientos/:id` - Obtener ayuntamiento por ID
- `GET /ayuntamientos/nivel/:nivel` - Obtener por nivel (1-15)
- `GET /ayuntamientos/nivel/:nivel/desbloqueos` - Obtener por nivel con desbloqueos
- `GET /ayuntamientos/:id/desbloqueos` - Obtener con desbloqueos
- `POST /ayuntamientos` - Crear ayuntamiento
- `PUT /ayuntamientos/:id` - Actualizar ayuntamiento
- `DELETE /ayuntamientos/:id` - Eliminar ayuntamiento

### 🏗️ Edificios

- `GET /edificios` - Listar todos los edificios
- `GET /edificios/paginacion` - Listar con paginación
- `GET /edificios/:id` - Obtener edificio por ID
- `GET /edificios/tipo/:tipo` - Obtener por tipo (DEFENSA, RECURSO, TROPAS, etc.)
- `GET /edificios/:id/tropas` - Obtener edificio con tropas desbloqueables
- `POST /edificios` - Crear edificio
- `PUT /edificios/:id` - Actualizar edificio
- `DELETE /edificios/:id` - Eliminar edificio

### ⚔️ Tropas

- `GET /tropas` - Listar todas las tropas
- `GET /tropas/paginacion` - Listar con paginación
- `GET /tropas/:id` - Obtener tropa por ID
- `GET /tropas/tipo/:tipo` - Obtener por tipo (NORMAL, OSCURA)
- `GET /tropas/cuartel/:cuartelId` - Obtener por cuartel (edificio)
- `GET /tropas/:id/relaciones` - Obtener tropa con relaciones
- `POST /tropas` - Crear tropa
- `PUT /tropas/:id` - Actualizar tropa
- `DELETE /tropas/:id` - Eliminar tropa

### 🦸 Héroes

- `GET /heroes` - Listar todos los héroes
- `GET /heroes/paginacion` - Listar con paginación
- `GET /heroes/:id` - Obtener héroe por ID
- `GET /heroes/tipo-recurso/:tipoRecurso` - Obtener por tipo de recurso
- `GET /heroes/:id/relaciones` - Obtener héroe con relaciones (habilidades, niveles, etc.)
- `POST /heroes` - Crear héroe
- `PUT /heroes/:id` - Actualizar héroe
- `DELETE /heroes/:id` - Eliminar héroe

### 🔮 Hechizos

- `GET /hechizos` - Listar todos los hechizos
- `GET /hechizos/paginacion` - Listar con paginación
- `GET /hechizos/:id` - Obtener hechizo por ID
- `GET /hechizos/tipo/:tipo` - Obtener por tipo
- `GET /hechizos/espacio/:espacioHechizo` - Obtener por espacio requerido
- `GET /hechizos/:id/relaciones` - Obtener hechizo con relaciones
- `POST /hechizos` - Crear hechizo
- `PUT /hechizos/:id` - Actualizar hechizo
- `DELETE /hechizos/:id` - Eliminar hechizo

### 🌱 Seed (Datos Iniciales)

- `POST /seed` - Ejecutar seed de datos iniciales
  - Carga datos de referencia: ayuntamientos, edificios, héroes, hechizos, tropas, animales, desbloqueos y niveles
  - Proceso idempotente (no crea duplicados)
  - Ejecuta dentro de una transacción para garantizar consistencia
  - Retorna estadísticas detalladas de la ejecución

## 📄 Paginación

Todos los módulos principales soportan paginación mediante el endpoint `/paginacion`:

**Query Parameters:**

- `page` (opcional, default: 1): Número de página
- `limit` (opcional, default: 10): Cantidad de registros por página
- `sort` (opcional): Ordenamiento (ej: `nombre:ASC,createdAt:DESC`)
- `search` (opcional): Búsqueda básica
- `withCount` (opcional, default: true): Incluir conteo total (mejora performance si es false)

**Ejemplo de respuesta:**

```json
{
  "completado": true,
  "datos": {
    "data": [...],
    "meta": {
      "page": 1,
      "limit": 10,
      "totalItems": 50,
      "totalPages": 5,
      "hasNextPage": true,
      "hasPrevPage": false
    }
  }
}
```

## 🔧 Scripts Disponibles

```bash
# Desarrollo
npm run start:dev          # Inicia con hot-reload
npm run start:debug        # Inicia en modo debug

# Construcción
npm run build              # Compila TypeScript a JavaScript

# Producción
npm run start:prod         # Inicia la aplicación compilada

# Migraciones
npm run migration:generate -- src/migrations/NombreMigracion  # Genera migración
npm run migration:run      # Ejecuta migraciones pendientes
npm run migration:revert   # Revierte última migración
npm run migration:create   # Crea archivo de migración vacío

# Testing
npm run test               # Ejecuta tests unitarios
npm run test:watch         # Ejecuta tests en modo watch
npm run test:cov           # Ejecuta tests con coverage
npm run test:e2e           # Ejecuta tests end-to-end
npm run test:debug         # Ejecuta tests en modo debug

# Calidad de código
npm run lint               # Ejecuta ESLint
npm run format             # Formatea código con Prettier
```

## 🏗️ Arquitectura

```
src/
├── common/                # Utilidades compartidas
│   ├── pagination/        # Sistema de paginación
│   │   ├── pagination.dto.ts
│   │   ├── pagination.pipe.ts
│   │   └── paginate-typeorm.ts
│   └── respuesta/         # Formato de respuesta estandarizado
│       └── respuesta.ts
├── config/                # Configuraciones
│   ├── database.config.ts # Configuración de TypeORM
│   ├── env.config.ts      # Configuración de variables de entorno
│   ├── env.validation.ts  # Validación de variables de entorno
│   └── swagger.config.ts  # Configuración de Swagger
├── controllers/           # Controladores REST
│   ├── ayuntamiento.controller.ts
│   ├── edificio.controller.ts
│   ├── hechizo.controller.ts
│   ├── heroe.controller.ts
│   └── tropa.controller.ts
├── dto/                   # Data Transfer Objects
│   ├── base.dto.ts
│   ├── ayuntamiento.dto.ts
│   ├── edificio.dto.ts
│   ├── habilidad.dto.ts
│   ├── hechizo.dto.ts
│   ├── heroe.dto.ts
│   └── tropa.dto.ts
├── entities/              # Entidades TypeORM
│   ├── base.entity.ts
│   ├── ayuntamiento.entity.ts
│   ├── edificio.entity.ts
│   ├── tropa.entity.ts
│   ├── heroe.entity.ts
│   ├── hechizo.entity.ts
│   ├── animal.entity.ts
│   ├── habilidad.entity.ts
│   ├── recurso.entity.ts
│   ├── nivel-detalle-*.entity.ts  # Entidades de nivel detalle
│   └── desbloqueos-ayuntamiento-*.entity.ts  # Entidades de desbloqueos
├── migrations/            # Migraciones de base de datos
│   └── 1762191053941-InitialSchema.ts
├── modules/               # Módulos de NestJS
│   ├── ayuntamiento.module.ts
│   ├── edificio.module.ts
│   ├── hechizo.module.ts
│   ├── heroe.module.ts
│   └── tropa.module.ts
├── seed/                  # Sistema de seed de datos
│   ├── seed.controller.ts
│   ├── seed.service.ts
│   ├── seed.module.ts
│   ├── dto/
│   ├── exceptions/
│   ├── helpers/
│   ├── interfaces/
│   ├── seed-data/
│   ├── services/
│   └── utils/
├── services/              # Lógica de negocio
│   ├── base.service.ts
│   ├── ayuntamiento.service.ts
│   ├── edificio.service.ts
│   ├── hechizo.service.ts
│   ├── heroe.service.ts
│   └── tropa.service.ts
├── app.module.ts          # Módulo principal
├── app.controller.ts      # Controlador principal
├── app.service.ts         # Servicio principal
└── main.ts                # Punto de entrada
```

## 🎯 Características Técnicas

### Validación de Datos

- Validación automática con `class-validator`
- Transformación automática de tipos con `class-transformer`
- Validación global mediante `ValidationPipe`
- Whitelist activado (solo propiedades permitidas)
- Rechazo de propiedades no permitidas

### Manejo de Errores

- Respuestas estandarizadas con información de error
- Tipos de error categorizados
- Mensajes técnicos para debugging
- Códigos HTTP apropiados

### Base de Datos

- TypeORM como ORM
- PostgreSQL como base de datos
- Migraciones para control de versiones
- Entidades con relaciones bien definidas
- Índices para optimización de consultas

### Documentación

- Swagger/OpenAPI integrado
- Documentación automática de endpoints
- Ejemplos de request/response
- Interfaz interactiva en `/api/docs`

## 🧪 Testing

```bash
# Tests unitarios
npm run test

# Tests e2e
npm run test:e2e

# Coverage
npm run test:cov
```

## 🌱 Sistema de Seed

El sistema de seed permite cargar datos iniciales de referencia del juego. Incluye:

- **Ayuntamientos**: Niveles 1-15 con capacidades y costos
- **Edificios**: Edificios base del juego
- **Héroes**: Héroes principales con estadísticas
- **Hechizos**: Hechizos disponibles
- **Tropas**: Tropas del juego
- **Animales**: Animales disponibles
- **Desbloqueos**: Relaciones de desbloqueo por ayuntamiento
- **Niveles**: Niveles de detalle iniciales

**Características:**

- Proceso idempotente (no crea duplicados)
- Ejecución transaccional (todo o nada)
- Validación de datos antes de insertar
- Estadísticas detalladas de ejecución
- Manejo de errores robusto

**Uso:**

```bash
# Ejecutar seed mediante API
POST http://localhost:3000/seed
```

## 📝 Contribución

1. Fork el proyecto
2. Crear una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia UNLICENSED.

## 🤝 Soporte

Para soporte, contacta a [tu-email@ejemplo.com](mailto:tu-email@ejemplo.com)

## 🔗 Enlaces Útiles

- **Swagger UI**: http://localhost:3000/api/docs
- **API Base**: http://localhost:3000
- **Documentación NestJS**: https://docs.nestjs.com
- **Documentación TypeORM**: https://typeorm.io
