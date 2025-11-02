# 📊 Comparación: Estructura Actual vs Recomendada

## 🔴 PROBLEMA: Estructura Actual (Todo mezclado)

```
app/(tabs)/
├── index.tsx
├── buscar.tsx
├── hechizos.tsx
├── heroes.tsx
├── ayuntamientos/                    ❌ ¿Qué hay aquí?
│   └── (vacío)
├── buscar/
│   └── (vacío)
├── hechizos/
│   └── (vacío)
└── heroes/
    └── (vacío)

❓ Si agrego Clean Architecture completa:
app/(tabs)/ayuntamientos/
├── index.tsx                         ✅ Screen
├── AyuntamientosViewModel.ts         ❌ ViewModel (Expo Router lo interpreta como ruta)
├── AyuntamientosRepository.ts        ❌ Repository (ruido)
├── useAyuntamientosScreen.ts         ❌ Hook (ruido)
├── components/
│   ├── AyuntamientoCard.tsx          ❌ Componente (ruido)
│   ├── AyuntamientoForm.tsx          ❌ Componente (ruido)
│   └── AyuntamientoDetail.tsx        ❌ Componente (ruido)
├── services/
│   └── AyuntamientoService.ts        ❌ Service (ruido, ya está en core/)
└── usecases/
    └── ObtenerAyuntamientos.ts       ❌ UseCase (ruido, ya está en core/)

Resultado: 30-50 archivos mezclados causando ruido en Expo Router 😱
```

## 🟢 SOLUCIÓN: Estructura Recomendada (Separación clara)

```
app/(tabs)/
├── index.tsx                         ✅ Screen
├── buscar.tsx                        ✅ Screen
├── hechizos.tsx                      ✅ Screen
├── heroes.tsx                        ✅ Screen
└── (features)/                       ✅ Grupo (no afecta URL)
    └── ayuntamientos/
        ├── _layout.tsx               ✅ Layout del feature
        ├── index.tsx                 ✅ Screen lista
        ├── [id].tsx                  ✅ Screen detalle
        └── crear.tsx                 ✅ Screen crear

features/                             ✅ NUEVA CARPETA
└── ayuntamientos/
    └── presentation/                 ✅ Capa de presentación (MVVM)
        ├── viewmodels/
        │   ├── AyuntamientosListViewModel.ts
        │   ├── AyuntamientoDetailViewModel.ts
        │   └── index.ts
        ├── components/
        │   ├── AyuntamientoCard/
        │   ├── AyuntamientoForm/
        │   └── index.ts
        └── hooks/
            └── useAyuntamientosScreen.ts

hooks/                                ✅ MANTENER (ya está bien)
└── ayuntamiento/
    ├── useAyuntamientos.ts
    ├── useAyuntamientoPorId.ts
    └── index.ts

core/                                 ✅ MANTENER (ya está bien)
├── Domain/
│   ├── Model/Ayuntamiento/
│   └── CasoUso/Ayuntamiento/
└── api/
    ├── Interfaz/IAyuntamientoService.ts
    └── Implementacion/AyuntamientoService.ts

components/                           ✅ MANTENER (componentes genéricos)
└── common/
    └── AppHeader.tsx

Resultado: app/ solo tiene screens, todo organizado y sin ruido ✅
```

## 📈 Comparación Cuantitativa

| Aspecto | Estructura Actual (Problema) | Estructura Recomendada |
|---------|------------------------------|------------------------|
| **Archivos en `app/`** | 30-50 archivos | 1 archivo por pantalla |
| **Rutas generadas por Expo Router** | Muchas rutas incorrectas | Solo rutas válidas |
| **Organización** | Mezclado | Por feature |
| **Reutilización** | Difícil | Fácil |
| **Mantenibilidad** | Compleja | Simple |
| **Escalabilidad** | Limitada | Excelente |

## 🎯 Mapa Mental de la Estructura

```
┌─────────────────────────────────────────────────────────────┐
│                      FRONTEND                               │
└─────────────────────────────────────────────────────────────┘

┌────────────────────┐
│  app/              │  ⚠️ SOLO SCREENS Y LAYOUTS
│  (Expo Router)     │
│  └── (tabs)/       │
│      ├── index.tsx │  ✅ Pantalla principal
│      └── heroes.tsx│  ✅ Pantalla héroes
└────────────────────┘

┌────────────────────┐
│  features/         │  🆕 FEATURES COMPLETOS
│  └── ayuntamientos/│
│      └── presentation/│
│          ├── viewmodels/│  ✅ ViewModels (MVVM)
│          └── components/│  ✅ Componentes específicos
└────────────────────┘

┌────────────────────┐
│  hooks/            │  ✅ HOOKS COMPARTIDOS
│  └── ayuntamiento/ │
│      └── useAyuntamientos.ts│  ✅ Conecta UI con casos de uso
└────────────────────┘

┌────────────────────┐
│  core/             │  ✅ CLEAN ARCHITECTURE
│  ├── Domain/       │
│  │   ├── Model/    │  ✅ Entidades de dominio
│  │   └── CasoUso/  │  ✅ Casos de uso
│  └── api/          │
│      └── Implementacion/│  ✅ Servicios/Repositorios
└────────────────────┘

┌────────────────────┐
│  components/       │  ✅ COMPONENTES UI GENÉRICOS
│  └── common/       │
│      └── AppHeader.tsx│  ✅ Reutilizables en toda la app
└────────────────────┘
```

## 🔄 Flujo de Datos Completo

```
┌──────────────────────────────────────────────────────────────┐
│                    CAPA DE PRESENTACIÓN                      │
│  app/(tabs)/ayuntamientos/index.tsx                         │
│  (Screen - Solo renderiza UI)                               │
└──────────────────────┬───────────────────────────────────────┘
                       │
                       ▼
┌──────────────────────────────────────────────────────────────┐
│                    CAPA DE VIEWMODEL                         │
│  features/ayuntamientos/presentation/viewmodels/            │
│  (Lógica de presentación, estado local, navegación)         │
└──────────────────────┬───────────────────────────────────────┘
                       │
                       ▼
┌──────────────────────────────────────────────────────────────┐
│                    CAPA DE HOOKS                             │
│  hooks/ayuntamiento/useAyuntamientos.ts                     │
│  (Conecta UI con casos de uso, React Query, estado global)  │
└──────────────────────┬───────────────────────────────────────┘
                       │
                       ▼
┌──────────────────────────────────────────────────────────────┐
│                    CAPA DE DOMINIO                           │
│  core/Domain/CasoUso/Ayuntamiento/                          │
│  (Lógica de negocio, reglas de negocio)                     │
└──────────────────────┬───────────────────────────────────────┘
                       │
                       ▼
┌──────────────────────────────────────────────────────────────┐
│                    CAPA DE DATOS                             │
│  core/api/Implementacion/AyuntamientoService.ts             │
│  (Llamadas a API, persistencia)                             │
└──────────────────────────────────────────────────────────────┘
```

## ✅ Checklist de Migración

### Fase 1: Preparación
- [ ] Crear carpeta `features/`
- [ ] Crear estructura base para cada feature
- [ ] Documentar estructura en README

### Fase 2: Migración por Feature
- [ ] Mover ViewModels a `features/[feature]/presentation/viewmodels/`
- [ ] Mover componentes específicos a `features/[feature]/presentation/components/`
- [ ] Limpiar `app/` dejando solo screens
- [ ] Actualizar imports

### Fase 3: Verificación
- [ ] Verificar que Expo Router solo muestre rutas válidas
- [ ] Probar navegación entre pantallas
- [ ] Verificar que los imports funcionen correctamente

## 📚 Recursos Adicionales

- [Expo Router File-based Routing](https://docs.expo.dev/router/introduction/)
- [Feature-Sliced Design](https://feature-sliced.design/)
- [Clean Architecture by Robert C. Martin](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)

