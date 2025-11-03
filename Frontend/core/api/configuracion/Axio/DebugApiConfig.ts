import { Debug } from '../SistemaDebug/debugSystem';
import { DebugLevel } from '../SistemaDebug/types';

export class DebugApiConfig {  
  static configure() {
    Debug.configure({
      enabled: true,
      consoleOutput: this.shouldShowInConsole(),
      logLevels: this.getApiLogLevels(),
      categories: this.getApiCategories(),
      maxLogs: 2000 
    });
  }

  private static getEnv(): Record<string, string | undefined> {
    // Expo: los valores EXPO_PUBLIC_* se reemplazan en build si se acceden literalmente
    return {
      EXPO_PUBLIC_DEBUG_CONSOLE: (typeof process !== 'undefined' ? (process as any)?.env?.EXPO_PUBLIC_DEBUG_CONSOLE : undefined),
      EXPO_PUBLIC_DEBUG_API_CONSOLE: (typeof process !== 'undefined' ? (process as any)?.env?.EXPO_PUBLIC_DEBUG_API_CONSOLE : undefined),
      EXPO_PUBLIC_DEBUG_API_LEVELS: (typeof process !== 'undefined' ? (process as any)?.env?.EXPO_PUBLIC_DEBUG_API_LEVELS : undefined),
      EXPO_PUBLIC_DEBUG_API_CATEGORIES: (typeof process !== 'undefined' ? (process as any)?.env?.EXPO_PUBLIC_DEBUG_API_CATEGORIES : undefined),
      NODE_ENV: (typeof process !== 'undefined' ? (process as any)?.env?.NODE_ENV : undefined),
    };
  }

  private static shouldShowInConsole(): boolean {
    const env = this.getEnv();
    const flags = [
      env.EXPO_PUBLIC_DEBUG_CONSOLE,
      env.EXPO_PUBLIC_DEBUG_API_CONSOLE,
    ];
    const enabledByFlag = flags.some(v => String(v).toLowerCase() === 'true');
    // En desarrollo, si no hay flags, habilitar por defecto
    if (!enabledByFlag && (env.NODE_ENV === 'development' || (globalThis as any).__DEV__)) {
      return true;
    }
    return enabledByFlag;
  }

  private static getApiLogLevels(): DebugLevel[] {
    const env = this.getEnv();
    const levels = env.EXPO_PUBLIC_DEBUG_API_LEVELS;
    if (levels) {
      return levels.split(',')
        .map((level: string) => level.trim().toUpperCase())
        .filter((level: string) => Object.values(DebugLevel).includes(level as DebugLevel))
        .map((level: string) => level as DebugLevel);
    }
    
    return Object.values(DebugLevel);
  }

  private static getApiCategories(): string[] {
    const env = this.getEnv();
    const cats = env.EXPO_PUBLIC_DEBUG_API_CATEGORIES;
    if (cats) {
      return cats.split(',')
        .map((cat: string) => cat.trim());
    }
    
    return ['API_REQUEST', 'API_RESPONSE', 'API_ERROR'];
  }

  static getApiStats() {
    const allLogs = Debug.getLogs();
    const apiLogs = allLogs.filter(log => 
      log.category.startsWith('API_')
    );
    
    const stats = {
      total: apiLogs.length,
      requests: Debug.getLogs('API_REQUEST').length,
      responses: Debug.getLogs('API_RESPONSE').length,
      errors: Debug.getLogs('API_ERROR').length,
      lastHour: apiLogs.filter(log => {
        const logTime = new Date(log.timestamp);
        const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
        return logTime > oneHourAgo;
      }).length
    };
    
    return stats;
  }

  static clearApiLogs() {
    // Los warnings se capturan automáticamente por globalErrorHandler
  }
} 