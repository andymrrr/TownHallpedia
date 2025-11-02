# 📁 Guía de Organización: Expo Router + Clean Architecture + MVVM

## 🎯 Problema Identificado

Al usar Clean Architecture/MVVM con Expo Router, si colocas todos los archivos relacionados (ViewModel, Repository, UseCase, Services, etc.) dentro de `app/`, Expo Router intentará interpretarlos como rutas, causando "ruido" y problemas de navegación.

## ✅ Solución: Separación de Responsabilidades

### Principio Fundamental
**`app/` solo debe contener archivos de pantalla (screens) que Expo Router necesita para el enrutamiento.**

## 🏗️ Estructura Recomendada

```
Frontend/
├── app/                          # ⚠️ SOLO PANTALLAS Y LAYOUTS
│   ├── _layout.tsx              # Layout raíz
│   ├── (tabs)/                  # Grupo de tabs (no afecta URL)
│   │   ├── _layout.tsx          # Layout de tabs
│   │   ├── index.tsx            # Pantalla principal
│   │   ├── heroes.tsx           # Pantalla de héroes
│   │   ├── hechizos.tsx         # Pantalla de hechizos
│   │   ├── buscar.tsx           # Pantalla de búsqueda
│   │   └── (features)/          # Grupo para features anidadas
│   │       ├── ayuntamientos/
│   │       │   ├── _layout.tsx  # Layout del feature
│   │       │   ├── index.tsx    # Lista de ayuntamientos
│   │       │   ├── [id].tsx     # Detalle dinámico
│   │       │   └── crear.tsx    # Crear ayuntamiento
│   │       └── heroes/
│   │           ├── index.tsx
│   │           └── [id].tsx
│   └── +not-found.tsx
│
├── core/                         # ✅ CAPA DE DOMINIO (Clean Architecture)
│   ├── Domain/                   # Entidades y casos de uso
│   │   ├── Model/                # Modelos de dominio
│   │   │   ├── Ayuntamiento/
│   │   │   ├── Heroe/
│   │   │   └── ...
│   │   └── CasoUso/              # Casos de uso por dominio
│   │       ├── Ayuntamiento/
│   │       ├── Heroe/
│   │       └── ...
│   └── api/                      # Capa de datos
│       ├── Interfaz/             # Interfaces/Contratos
│       └── Implementacion/       # Implementaciones concretas
│
├── features/                     # ✅ FEATURE-BASED ORGANIZATION (NUEVO)
│   ├── ayuntamientos/            # Feature completo
│   │   ├── presentation/         # Capa de presentación (MVVM)
│   │   │   ├── screens/          # Referencias a app/ (opcional)
│   │   │   ├── viewmodels/       # ViewModels específicos del feature
│   │   │   │   ├── AyuntamientosListViewModel.ts
│   │   │   │   ├── AyuntamientoDetailViewModel.ts
│   │   │   │   └── index.ts
│   │   │   ├── components/       # Componentes específicos del feature
│   │   │   │   ├── AyuntamientoCard/
│   │   │   │   ├── AyuntamientoForm/
│   │   │   │   └── index.ts
│   │   │   └── hooks/            # Hooks específicos del feature (opcional)
│   │   │       └── useAyuntamientosScreen.ts
│   │   ├── domain/               # Casos de uso específicos (opcional, si no están en core/)
│   │   │   └── usecases/
│   │   └── data/                 # Repositories específicos (opcional)
│   │       └── repositories/
│   │
│   ├── heroes/
│   │   ├── presentation/
│   │   │   ├── viewmodels/
│   │   │   └── components/
│   │   └── ...
│   │
│   └── hechizos/
│       └── ...
│
├── hooks/                        # ✅ HOOKS COMPARTIDOS (mantener actual)
│   ├── ayuntamiento/
│   ├── heroe/
│   └── ...
│
├── components/                   # ✅ COMPONENTES UI REUTILIZABLES
│   ├── common/                   # Componentes comunes
│   ├── ayuntamiento/             # Componentes específicos (mover a features/)
│   └── ...
│
└── utils/                        # Utilidades generales
```

## 📋 Reglas de Organización

### ✅ HACER:
1. **Solo screens en `app/`**: Archivos `.tsx` que Expo Router interpreta como rutas
2. **Lógica de negocio en `core/`**: Domain, UseCases, Services (ya lo tienes ✅)
3. **ViewModels en `features/[feature]/presentation/viewmodels/`**: Lógica de presentación
4. **Componentes específicos en `features/[feature]/presentation/components/`**
5. **Hooks compartidos en `hooks/`**: Hooks que conectan casos de uso con UI
6. **Componentes UI genéricos en `components/`**: Botones, inputs, cards reutilizables

### ❌ NO HACER:
1. **No poner ViewModels en `app/`**: Causan ruido en Expo Router
2. **No poner UseCases en `app/`**: Ya están en `core/`
3. **No poner Services/Repositories en `app/`**: Ya están en `core/api/`
4. **No crear carpetas profundas innecesarias**: Mantén estructura simple

## 🔄 Patrón de Trabajo

### Para una nueva pantalla:

**1. Crear la pantalla en `app/` (solo UI):**
```typescript
// app/(tabs)/(features)/ayuntamientos/index.tsx
import { AyuntamientosListViewModel } from '@/features/ayuntamientos/presentation/viewmodels';
import { useAyuntamientos } from '@/hooks/ayuntamiento';

export default function AyuntamientosScreen() {
  const viewModel = new AyuntamientosListViewModel(useAyuntamientos());
  
  return (
    <View>
      {/* UI simple, sin lógica */}
    </View>
  );
}
```

**2. Crear ViewModel en `features/` (lógica de presentación):**
```typescript
// features/ayuntamientos/presentation/viewmodels/AyuntamientosListViewModel.ts
export class AyuntamientosListViewModel {
  constructor(private useAyuntamientos: ReturnType<typeof useAyuntamientos>) {}
  
  // Lógica de presentación, estado local, etc.
}
```

**3. Usar hooks existentes en `hooks/` (conectan con casos de uso):**
```typescript
// hooks/ayuntamiento/useAyuntamientos.ts (ya existe ✅)
// Conecta con core/Domain/CasoUso/Ayuntamiento/
```

**4. Componentes específicos en `features/`:**
```typescript
// features/ayuntamientos/presentation/components/AyuntamientoCard/
```

## 🎯 Ventajas de Esta Estructura

1. ✅ **Expo Router limpio**: Solo rutas en `app/`
2. ✅ **Organización por feature**: Fácil encontrar todo relacionado
3. ✅ **Reutilización**: Core compartido entre features
4. ✅ **Escalable**: Agregar nuevas features es sencillo
5. ✅ **Separación clara**: Presentación vs Domain vs Data

## 📚 Referencias Consultadas

- [Expo Router Best Practices](https://docs.expo.dev/router/advanced/root-layout/)
- [React Native Feature Folder Structure](https://www.robinwieruch.de/react-folder-structure/)
- [Clean Architecture for React Native](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)

## 🔄 Migración Sugerida

### Paso 1: Crear estructura de features
```
features/
  └── ayuntamientos/
      └── presentation/
          └── viewmodels/
```

### Paso 2: Mover ViewModels (si existen)
Desde donde estén → `features/[feature]/presentation/viewmodels/`

### Paso 3: Mover componentes específicos
Desde `components/[feature]/` → `features/[feature]/presentation/components/`

### Paso 4: Limpiar `app/`
Asegurar que solo haya screens y layouts

---

**Nota**: Esta estructura es compatible con tu arquitectura actual. Los hooks en `hooks/` y el core en `core/` se mantienen como están.

