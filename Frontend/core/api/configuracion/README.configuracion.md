# Configuración para React Native (Expo)

## Variables de entorno

Configura en tu `.env` o `app.json` (expo.config.js):

- `EXPO_PUBLIC_API_URL`: URL base del backend (ej. `https://api.midominio.com`)
- `EXPO_PUBLIC_DEBUG_CONSOLE`: `true|false` para mostrar logs en consola
- `EXPO_PUBLIC_DEBUG_API_CONSOLE`: `true|false` para logs de API
- `EXPO_PUBLIC_DEBUG_API_LEVELS`: lista separada por comas (INFO,WARNING,ERROR,SUCCESS)
- `EXPO_PUBLIC_DEBUG_API_CATEGORIES`: categorías permitidas (ej. API_REQUEST,API_RESPONSE)

También puedes inyectarlas en runtime vía `globalThis.__APP_ENV = { EXPO_PUBLIC_API_URL: '...' }`.

## Inicialización en tu app

### Opción 1: Hook en el Layout (Recomendado)

```tsx
// app/_layout.tsx
import { useConfiguracion, Api } from '@/core/configuracion';
import { useRouter } from 'expo-router';

export default function RootLayout() {
  const router = useRouter();

  useConfiguracion({
    onLogout: () => {
      // Navegar a login, limpiar estado, etc.
      router.replace('/login');
    }
  });

  // ... resto de tu layout
}
```

### Opción 2: Inicialización manual (si necesitas más control)

```ts
import { initializeRNStorage, Api, AuthEvents } from '@/core/configuracion';

// En tu punto de entrada (ej: useEffect)
await initializeRNStorage();

AuthEvents.on('logout', () => {
  // Manejar logout
});
```

### Uso de la API

```ts
import { Api } from '@/core/configuracion';

// Ya está listo para usar
const resp = await Api.get('/salud');
const datos = await Api.post('/usuarios', { nombre: 'Juan' });
```

## Almacenamiento de tokens (mejor práctica)

- Se prioriza `expo-secure-store` para tokens.
- Fallback: `@react-native-async-storage/async-storage`.
- Caché en memoria para acceso rápido (compatible con API síncrona existente).

## Eventos

- `AuthEvents`: emite `logout` cuando expira el token y no puede refrescarse.

```ts
import { AuthEvents } from '@/core/configuracion';
const off = AuthEvents.on('logout', () => {/* ... */});
```

## Instalación de dependencias

```bash
npx expo install expo-secure-store @react-native-async-storage/async-storage
```
