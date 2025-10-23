# TownHallpedia Backend

Backend API para TownHallpedia construido con NestJS, TypeORM y PostgreSQL.

## 🚀 Características

- **Arquitectura Clean Code**: Implementación de principios SOLID y patrones de diseño
- **TypeORM**: ORM robusto con soporte para PostgreSQL
- **Validación de Datos**: DTOs con class-validator para validación automática
- **Migraciones**: Sistema de migraciones para control de versiones de base de datos
- **Documentación Swagger**: Documentación automática e interactiva de la API
- **CORS**: Configuración de CORS para desarrollo y producción
- **Validación Global**: Validación automática de datos de entrada

## 📋 Entidades del Sistema

### 🏛️ Ayuntamiento

- Niveles de ayuntamiento (1-15)
- Capacidades de almacenamiento (oro, elixir, oscuro)
- Tiempos de construcción y costos

### 🏗️ Edificios

- Tipos: Defensa, Recurso, Militar
- Relación con tropas desbloqueables
- Niveles de mejora

### ⚔️ Tropas

- Tropas normales y oscuras
- Espacio en ejército
- Desbloqueo por cuartel

### 🦸 Héroes

- Héroes del juego
- Tipos de recurso requerido
- Niveles de mejora

### 🔮 Hechizos

- Hechizos normales y oscuros
- Espacio en hechizos
- Niveles de mejora

### 📊 Nivel Detalle

- Detalles específicos por nivel
- Costos, tiempos, estadísticas
- Desbloqueos por ayuntamiento

### 🔓 Desbloqueos Ayuntamiento

- Relación entre ayuntamientos y entidades
- Control de desbloqueos

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

```bash
cp .env.example .env
```

Editar `.env` con tus configuraciones:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=tu_password
DB_DATABASE=townhallpedia
DB_SYNCHRONIZE=false
DB_LOGGING=false
```

4. **Ejecutar migraciones**

```bash
npm run migration:run
```

5. **Iniciar el servidor**

```bash
# Desarrollo
npm run start:dev

# Producción
npm run build
npm run start:prod
```

6. **Acceder a la documentación**

- **API**: http://localhost:3000
- **Swagger UI**: http://localhost:3000/api/docs

## 📚 API Endpoints

### Ayuntamientos

- `GET /ayuntamientos` - Listar todos los ayuntamientos
- `GET /ayuntamientos/:id` - Obtener ayuntamiento por ID
- `GET /ayuntamientos/nivel/:nivel` - Obtener por nivel
- `POST /ayuntamientos` - Crear ayuntamiento
- `PUT /ayuntamientos/:id` - Actualizar ayuntamiento
- `DELETE /ayuntamientos/:id` - Eliminar ayuntamiento

### Edificios

- `GET /edificios` - Listar todos los edificios
- `GET /edificios/:id` - Obtener edificio por ID
- `GET /edificios/tipo/:tipo` - Obtener por tipo
- `POST /edificios` - Crear edificio
- `PUT /edificios/:id` - Actualizar edificio
- `DELETE /edificios/:id` - Eliminar edificio

### Tropas

- `GET /tropas` - Listar todas las tropas
- `GET /tropas/:id` - Obtener tropa por ID
- `GET /tropas/tipo/:tipo` - Obtener por tipo
- `GET /tropas/cuartel/:cuartelId` - Obtener por cuartel
- `POST /tropas` - Crear tropa
- `PUT /tropas/:id` - Actualizar tropa
- `DELETE /tropas/:id` - Eliminar tropa

### Héroes

- `GET /heroes` - Listar todos los héroes
- `GET /heroes/:id` - Obtener héroe por ID
- `GET /heroes/tipo-recurso/:tipoRecurso` - Obtener por tipo de recurso
- `POST /heroes` - Crear héroe
- `PUT /heroes/:id` - Actualizar héroe
- `DELETE /heroes/:id` - Eliminar héroe

### Hechizos

- `GET /hechizos` - Listar todos los hechizos
- `GET /hechizos/:id` - Obtener hechizo por ID
- `GET /hechizos/tipo/:tipo` - Obtener por tipo
- `GET /hechizos/espacio/:espacioHechizo` - Obtener por espacio
- `POST /hechizos` - Crear hechizo
- `PUT /hechizos/:id` - Actualizar hechizo
- `DELETE /hechizos/:id` - Eliminar hechizo

### Nivel Detalle

- `GET /nivel-detalle` - Listar todos los niveles
- `GET /nivel-detalle/:id` - Obtener nivel por ID
- `GET /nivel-detalle/entidad/:tipoEntidad/:entidadId` - Obtener por entidad
- `GET /nivel-detalle/ayuntamiento/:ayuntamientoId` - Obtener por ayuntamiento
- `POST /nivel-detalle` - Crear nivel
- `PUT /nivel-detalle/:id` - Actualizar nivel
- `DELETE /nivel-detalle/:id` - Eliminar nivel

### Desbloqueos Ayuntamiento

- `GET /desbloqueos-ayuntamiento` - Listar todos los desbloqueos
- `GET /desbloqueos-ayuntamiento/:id` - Obtener desbloqueo por ID
- `GET /desbloqueos-ayuntamiento/ayuntamiento/:ayuntamientoId` - Obtener por ayuntamiento
- `POST /desbloqueos-ayuntamiento` - Crear desbloqueo
- `PUT /desbloqueos-ayuntamiento/:id` - Actualizar desbloqueo
- `DELETE /desbloqueos-ayuntamiento/:id` - Eliminar desbloqueo

## 🔧 Scripts Disponibles

```bash
# Desarrollo
npm run start:dev

# Construcción
npm run build

# Producción
npm run start:prod

# Migraciones
npm run migration:generate -- src/migrations/NombreMigracion
npm run migration:run
npm run migration:revert

# Testing
npm run test
npm run test:watch
npm run test:cov
npm run test:e2e

# Linting
npm run lint
npm run format
```

## 🏗️ Arquitectura

```
src/
├── config/           # Configuraciones
├── controllers/      # Controladores REST
├── dto/             # Data Transfer Objects
├── entities/        # Entidades TypeORM
├── migrations/      # Migraciones de base de datos
├── modules/         # Módulos de NestJS
├── services/        # Lógica de negocio
└── main.ts          # Punto de entrada
```

## 🧪 Testing

```bash
# Tests unitarios
npm run test

# Tests e2e
npm run test:e2e

# Coverage
npm run test:cov
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
