# 🌱 Módulo de Seed

Módulo profesional para la ejecución de seeds de datos iniciales en la base de datos.

## 📋 Características

- ✅ **Transacciones**: Todas las operaciones se ejecutan dentro de transacciones para garantizar consistencia
- ✅ **Validación de datos**: Validación completa antes de insertar registros
- ✅ **Logging profesional**: Sistema de logs estructurado con NestJS Logger
- ✅ **Manejo de errores robusto**: Excepciones personalizadas y manejo granular de errores
- ✅ **Idempotencia**: No crea duplicados si los datos ya existen
- ✅ **Métricas**: Estadísticas detalladas de la ejecución
- ✅ **Tipado completo**: 100% tipado con TypeScript estricto
- ✅ **Documentación Swagger**: Documentación completa de la API

## 🏗️ Estructura

```
seed/
├── dto/                    # Data Transfer Objects
│   └── seed-result.dto.ts
├── exceptions/             # Excepciones personalizadas
│   └── seed.exception.ts
├── interfaces/             # Interfaces TypeScript
│   └── seed-execution.interface.ts
├── utils/                  # Utilidades y validadores
│   └── seed-validators.ts
├── seed-data.ts            # Datos de seed (constantes)
├── seed.service.ts         # Lógica de negocio
├── seed.controller.ts      # Controlador REST
├── seed.module.ts          # Módulo NestJS
└── index.ts                # Exportaciones principales
```

## 🚀 Uso

### Ejecutar Seed vía API

```bash
POST http://localhost:3000/seed
```

**Respuesta exitosa:**
```json
{
  "completado": true,
  "mensaje": "Seed ejecutado exitosamente",
  "datos": {
    "ayuntamientos": 15,
    "edificios": 9,
    "heroes": 4,
    "hechizos": 12,
    "tropas": 23,
    "desbloqueos": 4,
    "nivelesDetalle": 12,
    "total": 79,
    "tiempoEjecucion": 1250
  }
}
```

### Uso programático

```typescript
import { SeedService } from './seed/seed.service';

// Inyectar el servicio
constructor(private readonly seedService: SeedService) {}

// Ejecutar con opciones personalizadas
const resultado = await this.seedService.ejecutarSeed({
  validarDatos: true,
  continuarConErrores: false,
  logging: true,
});
```

## ⚙️ Opciones de Configuración

```typescript
interface SeedOptions {
  validarDatos?: boolean;        // Validar datos antes de insertar (default: true)
  continuarConErrores?: boolean; // Continuar aunque haya errores (default: false)
  batchSize?: number;            // Tamaño de lote (default: 50)
  logging?: boolean;             // Habilitar logging (default: true)
}
```

## 🔍 Validaciones Implementadas

- **Nombres**: No pueden estar vacíos
- **Niveles**: Deben estar en rangos válidos
- **Números**: Deben ser positivos o cero según corresponda
- **URLs**: Validación de formato cuando se proporcionan

## 📊 Datos que se Sembran

1. **Ayuntamientos**: Niveles 1-15 con capacidades y costos
2. **Edificios**: 9 edificios base (Cuartel, Laboratorio, Almacenes, etc.)
3. **Héroes**: 4 héroes principales (Rey Bárbaro, Reina Arquera, etc.)
4. **Hechizos**: 12 hechizos (Normal y Oscuro)
5. **Tropas**: 23 tropas del juego
6. **Desbloqueos**: Relaciones entre ayuntamientos y entidades
7. **Niveles de Detalle**: Niveles iniciales para tropas, hechizos, héroes y edificios

## 🛡️ Manejo de Errores

El módulo incluye excepciones personalizadas:

- `SeedException`: Excepción base
- `SeedEntityException`: Error al crear/validar una entidad
- `SeedDatabaseException`: Error crítico de base de datos

## 📝 Logging

El servicio utiliza NestJS Logger con diferentes niveles:

- `log()`: Información general del proceso
- `debug()`: Detalles técnicos
- `warn()`: Advertencias no críticas
- `error()`: Errores críticos

## 🔒 Seguridad

- ✅ Operaciones idempotentes (no crea duplicados)
- ✅ Transacciones para consistencia
- ✅ Validación de datos de entrada
- ✅ Manejo seguro de errores sin exponer información sensible

## 📚 Documentación API

La documentación completa está disponible en Swagger UI:

```
http://localhost:3000/api/docs
```

Busca el tag "Seed" para ver todos los endpoints disponibles.


