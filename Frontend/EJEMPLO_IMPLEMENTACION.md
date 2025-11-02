# 🚀 Ejemplo Práctico: Implementación con Feature-Based + MVVM

## 📝 Antes vs Después

### ❌ ANTES (Problema - Todo mezclado en app/)

```
app/(tabs)/
├── ayuntamientos/
│   ├── index.tsx              # ✅ Screen (OK)
│   ├── AyuntamientosViewModel.ts  # ❌ ViewModel (causa ruido)
│   ├── AyuntamientosRepository.ts # ❌ Repository (causa ruido)
│   ├── useAyuntamientosScreen.ts  # ❌ Hook específico (causa ruido)
│   └── components/
│       └── AyuntamientoCard.tsx   # ❌ Componente (mejor en features/)
```

**Problema**: Expo Router intenta crear rutas para TODOS estos archivos.

### ✅ DESPUÉS (Solución - Separación clara)

```
app/(tabs)/
└── ayuntamientos/
    └── index.tsx              # ✅ SOLO el screen

features/ayuntamientos/
└── presentation/
    ├── viewmodels/
    │   └── AyuntamientosListViewModel.ts
    ├── components/
    │   └── AyuntamientoCard/
    └── hooks/
        └── useAyuntamientosScreen.ts

hooks/ayuntamiento/            # ✅ Hooks compartidos (mantener)
└── useAyuntamientos.ts

core/                          # ✅ Domain y casos de uso (mantener)
└── Domain/
    └── CasoUso/
        └── Ayuntamiento/
```

## 🔨 Implementación Paso a Paso

### 1. Screen en `app/` (Solo UI, sin lógica)

```typescript
// app/(tabs)/ayuntamientos/index.tsx
import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { AyuntamientosListViewModel } from '@/features/ayuntamientos/presentation/viewmodels';
import { AyuntamientoCard } from '@/features/ayuntamientos/presentation/components';
import { useAyuntamientosScreen } from '@/features/ayuntamientos/presentation/hooks';
import { AppHeader } from '@/components/common';

export default function AyuntamientosScreen() {
  const { viewModel, isLoading, error } = useAyuntamientosScreen();
  
  if (isLoading) return <View><Text>Cargando...</Text></View>;
  if (error) return <View><Text>Error: {error.message}</Text></View>;
  
  return (
    <View style={styles.container}>
      <AppHeader title="Ayuntamientos" variant="compact" />
      <ScrollView style={styles.scrollView}>
        {viewModel.ayuntamientos.map((ayuntamiento) => (
          <AyuntamientoCard
            key={ayuntamiento.id}
            ayuntamiento={ayuntamiento}
            onPress={() => viewModel.navigateToDetail(ayuntamiento.id)}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollView: { flex: 1 },
});
```

### 2. Hook de Presentación (conecta con hooks compartidos)

```typescript
// features/ayuntamientos/presentation/hooks/useAyuntamientosScreen.ts
import { useMemo } from 'react';
import { AyuntamientosListViewModel } from '../viewmodels';
import { useAyuntamientos } from '@/hooks/ayuntamiento';

export function useAyuntamientosScreen() {
  const { data, isLoading, error } = useAyuntamientos();
  
  const viewModel = useMemo(() => {
    return new AyuntamientosListViewModel(data?.data || []);
  }, [data]);
  
  return {
    viewModel,
    isLoading,
    error,
  };
}
```

### 3. ViewModel (lógica de presentación)

```typescript
// features/ayuntamientos/presentation/viewmodels/AyuntamientosListViewModel.ts
import { Ayuntamiento } from '@/core/Domain/Model/Ayuntamiento';
import { router } from 'expo-router';

export class AyuntamientosListViewModel {
  constructor(private _ayuntamientos: Ayuntamiento[]) {}
  
  get ayuntamientos(): Ayuntamiento[] {
    return this._ayuntamientos;
  }
  
  get filteredAyuntamientos(): Ayuntamiento[] {
    // Lógica de filtrado local
    return this._ayuntamientos.filter(/* ... */);
  }
  
  navigateToDetail(id: number): void {
    router.push(`/(tabs)/ayuntamientos/${id}`);
  }
  
  search(query: string): void {
    // Lógica de búsqueda local
  }
  
  sortBy(property: keyof Ayuntamiento): void {
    // Lógica de ordenamiento local
  }
}
```

### 4. Componente Específico del Feature

```typescript
// features/ayuntamientos/presentation/components/AyuntamientoCard/AyuntamientoCard.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ayuntamiento } from '@/core/Domain/Model/Ayuntamiento';

interface Props {
  ayuntamiento: Ayuntamiento;
  onPress: () => void;
}

export function AyuntamientoCard({ ayuntamiento, onPress }: Props) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Text style={styles.title}>Nivel {ayuntamiento.nivel}</Text>
      <Text>Oro: {ayuntamiento.capacidadOro}</Text>
      <Text>Elixir: {ayuntamiento.capacidadElixir}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: { padding: 16, margin: 8, backgroundColor: '#fff', borderRadius: 8 },
  title: { fontSize: 18, fontWeight: 'bold' },
});

// features/ayuntamientos/presentation/components/index.ts
export * from './AyuntamientoCard/AyuntamientoCard';
```

### 5. Exportación del Feature

```typescript
// features/ayuntamientos/presentation/viewmodels/index.ts
export * from './AyuntamientosListViewModel';

// features/ayuntamientos/index.ts (opcional, barrel export)
export * from './presentation/viewmodels';
export * from './presentation/components';
```

## 🔄 Flujo de Datos

```
┌─────────────────────────────────────────────────────────┐
│  app/(tabs)/ayuntamientos/index.tsx                     │
│  (Screen - Solo UI)                                     │
└─────────────────┬───────────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────────────┐
│  features/.../hooks/useAyuntamientosScreen.ts          │
│  (Hook de Presentación)                                 │
└────────────┬───────────────────────┬────────────────────┘
             │                       │
             ▼                       ▼
┌────────────────────────┐  ┌─────────────────────────────┐
│  ViewModel             │  │  hooks/ayuntamiento/        │
│  (Lógica presentación) │  │  useAyuntamientos.ts        │
└────────────────────────┘  └──────────┬──────────────────┘
                                       │
                                       ▼
                          ┌─────────────────────────────┐
                          │  core/Domain/CasoUso/       │
                          │  ObtenerAyuntamientos...    │
                          └──────────┬──────────────────┘
                                     │
                                     ▼
                          ┌─────────────────────────────┐
                          │  core/api/Implementacion/   │
                          │  AyuntamientoService.ts     │
                          └─────────────────────────────┘
```

## 📦 Estructura de Archivos Final

```
Frontend/
├── app/
│   └── (tabs)/
│       └── ayuntamientos/
│           └── index.tsx                    # 1 archivo ✅
│
├── features/
│   └── ayuntamientos/
│       └── presentation/
│           ├── viewmodels/
│           │   ├── AyuntamientosListViewModel.ts
│           │   └── index.ts
│           ├── components/
│           │   ├── AyuntamientoCard/
│           │   │   ├── AyuntamientoCard.tsx
│           │   │   └── index.ts
│           │   └── index.ts
│           └── hooks/
│               ├── useAyuntamientosScreen.ts
│               └── index.ts
│
├── hooks/                                    # Mantener ✅
│   └── ayuntamiento/
│       └── useAyuntamientos.ts
│
└── core/                                     # Mantener ✅
    └── Domain/
        └── CasoUso/
            └── Ayuntamiento/
```

## ✅ Ventajas de Esta Estructura

1. **Expo Router limpio**: Solo 1 archivo por pantalla en `app/`
2. **Organización clara**: Todo lo relacionado con ayuntamientos está junto
3. **Reutilización**: Core y hooks compartidos se mantienen
4. **Escalable**: Fácil agregar nuevas pantallas/features
5. **Testeable**: ViewModels y componentes separados son fáciles de testear

## 🎯 Regla de Oro

> **Si Expo Router puede crear una ruta para un archivo, está en el lugar equivocado.**

Solo archivos `.tsx` que sean **screens** deben estar en `app/`. Todo lo demás va fuera.

