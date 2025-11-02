# 📱 Organización de Múltiples Pantallas en Expo Router

## ❌ MAL - Poner todo en `app/(tabs)/`

```
app/(tabs)/
├── index.tsx
├── heroes.tsx
├── hechizos.tsx
├── buscar.tsx
├── ayuntamientos-lista.tsx
├── ayuntamientos-detalle.tsx
├── ayuntamientos-crear.tsx
├── heroes-lista.tsx
├── heroes-detalle.tsx
├── hechizos-lista.tsx
├── hechizos-detalle.tsx
├── edificios-lista.tsx
├── edificios-detalle.tsx
├── tropas-lista.tsx
├── tropas-detalle.tsx
... (20 archivos mezclados 😱)
```

## ✅ BIEN - Organizar con Grupos de Rutas

### Opción 1: Grupos con Paréntesis (Recomendado)

```
app/(tabs)/
├── _layout.tsx                    # Layout de tabs
├── index.tsx                      # Tab principal (Ayuntamientos)
├── heroes.tsx                     # Tab Héroes
├── hechizos.tsx                   # Tab Hechizos
├── buscar.tsx                     # Tab Buscar
│
└── (features)/                    # 🎯 GRUPO (no afecta URL)
    ├── ayuntamientos/             # Rutas: /(tabs)/ayuntamientos/*
    │   ├── _layout.tsx            # Layout Stack para ayuntamientos
    │   ├── index.tsx              # /(tabs)/ayuntamientos (lista)
    │   ├── [id].tsx               # /(tabs)/ayuntamientos/123 (detalle)
    │   ├── crear.tsx              # /(tabs)/ayuntamientos/crear
    │   └── editar/
    │       └── [id].tsx           # /(tabs)/ayuntamientos/editar/123
    │
    ├── heroes/                    # Rutas: /(tabs)/heroes/*
    │   ├── _layout.tsx
    │   ├── [id].tsx               # /(tabs)/heroes/123
    │   └── comparar.tsx           # /(tabs)/heroes/comparar
    │
    ├── hechizos/                  # Rutas: /(tabs)/hechizos/*
    │   ├── _layout.tsx
    │   ├── [id].tsx
    │   └── tipos/
    │       └── [tipo].tsx         # /(tabs)/hechizos/tipos/fuego
    │
    ├── edificios/                 # Rutas: /(tabs)/edificios/*
    │   ├── _layout.tsx
    │   ├── index.tsx
    │   ├── [id].tsx
    │   └── por-tipo/
    │       └── [tipo].tsx
    │
    └── tropas/                    # Rutas: /(tabs)/tropas/*
        ├── _layout.tsx
        ├── index.tsx
        └── [id].tsx
```

### Opción 2: Fuera de Tabs (Pantallas Modal/Stack)

```
app/
├── _layout.tsx                    # Layout raíz
│
├── (tabs)/                        # Tabs principales (solo 4-5)
│   ├── _layout.tsx
│   ├── index.tsx
│   ├── heroes.tsx
│   ├── hechizos.tsx
│   └── buscar.tsx
│
└── (stack)/                       # 🎯 Stack de navegación
    ├── _layout.tsx                # Stack Navigator
    ├── ayuntamientos/
    │   ├── index.tsx              # /ayuntamientos (lista)
    │   ├── [id].tsx               # /ayuntamientos/123
    │   └── crear.tsx              # /ayuntamientos/crear
    │
    ├── heroes/
    │   ├── index.tsx              # /heroes (lista)
    │   └── [id].tsx               # /heroes/123
    │
    └── edificios/
        ├── index.tsx
        └── [id].tsx
```

## 🎯 Estructura Recomendada para Tu Caso

Si tienes 20+ pantallas, organiza así:

```
app/(tabs)/
├── _layout.tsx                    # Solo tabs principales
├── index.tsx                      # Tab: Ayuntamientos
├── heroes.tsx                     # Tab: Héroes  
├── hechizos.tsx                   # Tab: Hechizos
└── buscar.tsx                     # Tab: Buscar

app/(tabs)/(features)/             # 🎯 Pantallas relacionadas
    ├── ayuntamientos/
    │   ├── _layout.tsx            # Stack para navegación interna
    │   ├── index.tsx              # Redirige o lista
    │   ├── lista.tsx              # Lista completa
    │   ├── [id].tsx               # Detalle
    │   ├── crear.tsx
    │   ├── editar/
    │   │   └── [id].tsx
    │   └── niveles/
    │       └── [nivel].tsx
    │
    ├── heroes/
    │   ├── _layout.tsx
    │   ├── lista.tsx
    │   ├── [id].tsx
    │   └── comparar.tsx
    │
    └── ... (más features)
```

## 📋 Reglas de Organización

1. **`app/(tabs)/`**: Solo 4-5 archivos (tabs principales)
2. **`app/(tabs)/(features)/`**: Pantallas relacionadas organizadas por feature
3. **Paréntesis `()`**: Grupos que NO aparecen en la URL
4. **Sin paréntesis**: Rutas normales que SÍ aparecen en la URL

## 🔗 URLs Resultantes

Con la estructura de arriba:
- Tab principal: `/(tabs)/` → `index.tsx`
- Detalle: `/(tabs)/ayuntamientos/123` → `(features)/ayuntamientos/[id].tsx`
- Crear: `/(tabs)/ayuntamientos/crear` → `(features)/ayuntamientos/crear.tsx`

## ✅ Ventajas

1. ✅ `app/(tabs)/` limpio (solo tabs principales)
2. ✅ Pantallas organizadas por feature
3. ✅ Fácil encontrar pantallas relacionadas
4. ✅ Escalable (puedes agregar más sin saturar)
5. ✅ URLs limpias

