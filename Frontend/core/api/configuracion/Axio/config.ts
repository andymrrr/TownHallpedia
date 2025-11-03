export const CONFIG = {
  BASE_URL: ((typeof process !== 'undefined' ? (process as any)?.env : {})?.EXPO_PUBLIC_API_URL) || 'http://localhost:5169',
  DEFAULT_TIMEOUT: 30000,
          
} as const; 