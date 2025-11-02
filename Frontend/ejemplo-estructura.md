# Ejemplo: Cómo Organizar 20+ Pantallas

## ❌ MAL - Todo en `app/(tabs)/`

Si tienes 20 pantallas y las pones todas ahí:
```
app/(tabs)/
├── index.tsx
├── heroes.tsx
├── heroes-detalle-1.tsx
├── heroes-detalle-2.tsx
├── heroes-lista.tsx
├── ayuntamientos.tsx
├── ayuntamientos-detalle.tsx
├── ayuntamientos-crear.tsx
... (20 archivos mezclados 😱)
```

## ✅ BIEN - Con Grupos `(features)`

```
app/(tabs)/
├── _layout.tsx              # Solo 4 tabs principales
├── index.tsx                # Tab 1: Ayuntamientos
├── heroes.tsx               # Tab 2: Héroes
├── hechizos.tsx             # Tab 3: Hechizos
└── buscar.tsx               # Tab 4: Buscar

app/(tabs)/(features)/       # 🎯 Grupo (no aparece en URL)
    ├── ayuntamientos/
    │   ├── _layout.tsx      # Stack Navigator para este feature
    │   ├── lista.tsx        # /(tabs)/ayuntamientos/lista
    │   ├── [id].tsx         # /(tabs)/ayuntamientos/123
    │   ├── crear.tsx        # /(tabs)/ayuntamientos/crear
    │   ├── editar/
    │   │   └── [id].tsx     # /(tabs)/ayuntamientos/editar/123
    │   └── niveles/
    │       └── [nivel].tsx  # /(tabs)/ayuntamientos/niveles/5
    │
    ├── heroes/
    │   ├── _layout.tsx
    │   ├── lista.tsx        # /(tabs)/heroes/lista
    │   ├── [id].tsx         # /(tabs)/heroes/123
    │   ├── comparar.tsx     # /(tabs)/heroes/comparar
    │   └── habilidades/
    │       └── [heroeId].tsx
    │
    ├── hechizos/
    │   ├── _layout.tsx
    │   ├── lista.tsx
    │   ├── [id].tsx
    │   └── por-tipo/
    │       └── [tipo].tsx
    │
    ├── edificios/
    │   ├── _layout.tsx
    │   ├── lista.tsx
    │   ├── [id].tsx
    │   └── por-tipo/
    │       └── [tipo].tsx
    │
    └── tropas/
        ├── _layout.tsx
        ├── lista.tsx
        └── [id].tsx
```

## 🎯 Resultado

**En `app/(tabs)/` solo tienes 5 archivos** (4 tabs + layout)  
**Las otras 20 pantallas están organizadas en `(features)/`**

## 📱 Navegación

Desde tu tab principal (`index.tsx`):
```typescript
import { router } from 'expo-router';

// Navegar a detalle
router.push('/(tabs)/ayuntamientos/123');

// Navegar a crear
router.push('/(tabs)/ayuntamientos/crear');
```

