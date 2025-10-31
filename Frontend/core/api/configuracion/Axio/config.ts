function getEnvValue(key: string, defaultValue: string, fallbacks: string[] = []): string {
  const env = (globalThis as any)?.__APP_ENV ?? (typeof process !== 'undefined' ? (process as any)?.env : {}) ?? {};
  const keys = [key, ...fallbacks];
  for (const k of keys) {
    if (env && typeof env[k] === 'string' && env[k]) return env[k] as string;
  }
  return defaultValue;
}

export const CONFIG = {
  BASE_URL: getEnvValue('EXPO_PUBLIC_API_URL', 'http://localhost:5169', ['VITE_API_URL', 'API_URL']),
  DEFAULT_TIMEOUT: 30000,
          
  TOKEN_KEYS: {
    ACCESS: 'access_token',
    REFRESH: 'refresh_token'
  },
  ENDPOINTS: {
    REFRESH: '/auth/refresh-token'
  }
} as const; 