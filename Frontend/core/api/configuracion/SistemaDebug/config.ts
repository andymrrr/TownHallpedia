import { DebugConfig, DebugLevel } from './types';

export class DebugConfigManager {
  private static externalConfig: Partial<DebugConfig> | null = null;

  static setExternalConfig(config: Partial<DebugConfig>): void {
    this.externalConfig = { ...config };
  }

  static loadConfiguration(): DebugConfig {
    const env = this.getEnv();

    const enabled = this.externalConfig?.enabled ?? this.parseBoolean(env.VITE_DEBUG_ENABLED) ?? this.detectDevMode();
    const consoleOutput = this.externalConfig?.consoleOutput ?? this.parseBoolean(env.VITE_DEBUG_CONSOLE) ?? false;

    const parsedMaxLogs = parseInt(env.VITE_DEBUG_MAX_LOGS || '');
    const maxLogs = this.externalConfig?.maxLogs ?? (Number.isFinite(parsedMaxLogs) && parsedMaxLogs > 0 ? parsedMaxLogs : 1000);

    const parsedLevels = this.parseDebugLevels(env.VITE_DEBUG_LEVELS);
    const logLevels = this.externalConfig?.logLevels ?? (parsedLevels || Object.values(DebugLevel));

    const parsedCategories = this.parseArray(env.VITE_DEBUG_CATEGORIES);
    const categories = this.externalConfig?.categories ?? (parsedCategories || []);

    return { enabled, consoleOutput, maxLogs, logLevels, categories };
  }

  private static getEnv(): Record<string, string> {
    // Prioridad: globalThis.__APP_ENV (inyectable), process.env, RN Config si se registra manualmente
    const fromGlobal = (globalThis as any)?.__APP_ENV ?? {};
    const fromProcess = typeof process !== 'undefined' && (process as any)?.env ? (process as any).env : {};
    return { ...fromProcess, ...fromGlobal } as Record<string, string>;
  }

  private static parseBoolean(value: string | undefined): boolean | null {
    if (value === undefined) return null;
    return String(value).toLowerCase() === 'true';
  }

  private static parseArray(value: string | undefined): string[] | null {
    if (!value) return null;
    return value.split(',').map(v => v.trim()).filter(Boolean);
  }

  private static parseDebugLevels(value: string | undefined): DebugLevel[] | null {
    if (!value) return null;
    return value.split(',')
      .map(v => v.trim().toUpperCase())
      .filter(v => Object.values(DebugLevel).includes(v as DebugLevel))
      .map(v => v as DebugLevel);
  }

  private static detectDevMode(): boolean {
    const nodeEnv = typeof process !== 'undefined' && (process as any)?.env?.NODE_ENV === 'development';
    const hostname = typeof window !== 'undefined' && (
      window.location.hostname === 'localhost' || 
      window.location.hostname === '127.0.0.1' ||
      window.location.hostname.includes('dev')
    );
    return nodeEnv || hostname;
  }
} 