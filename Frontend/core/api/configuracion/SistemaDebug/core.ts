import { DebugEntry, DebugLevel, DebugConfig } from './types';
import { DebugConfigManager } from './config';
import { ConsoleManager } from './console';
import { DebugUtils } from './utils';

export class DebugSystem {
  private logs: DebugEntry[] = [];
  private config: DebugConfig;
  private initialized: boolean = false;

  constructor() {
    this.config = DebugConfigManager.loadConfiguration();
    this.initialize();
  }

  private initialize() {
    if (this.initialized) return;
    this.initialized = true;
    
    if (this.config.enabled && this.config.consoleOutput) {
      console.log('🔍 Sistema de Debug inicializado', {
        config: this.config,
        timestamp: new Date().toISOString()
      });
    }
  }

  configure(options: { 
    enabled?: boolean; 
    consoleOutput?: boolean; 
    maxLogs?: number; 
    logLevels?: DebugLevel[]; 
    categories?: string[] 
  }) {
    this.config = {
      ...this.config,
      enabled: options.enabled ?? this.config.enabled,
      consoleOutput: options.consoleOutput ?? this.config.consoleOutput,
      maxLogs: options.maxLogs ?? this.config.maxLogs,
      logLevels: options.logLevels ?? this.config.logLevels,
      categories: options.categories ?? this.config.categories
    };
    
    if (this.config.enabled && this.config.consoleOutput) {
      this.info('SYSTEM', 'Configuración actualizada', options);
    }
  }

  info(category: string, message: string, data?: any) {
    this.log(DebugLevel.INFO, category, message, data);
  }

  warning(category: string, message: string, data?: any) {
    this.log(DebugLevel.WARNING, category, message, data);
  }

  error(category: string, message: string, data?: any) {
    this.log(DebugLevel.ERROR, category, message, data);
  }

  success(category: string, message: string, data?: any) {
    this.log(DebugLevel.SUCCESS, category, message, data);
  }

  private log(level: DebugLevel, category: string, message: string, data?: any) {
    if (!this.config.enabled) return;
    
    if (this.config.logLevels.length > 0 && !this.config.logLevels.includes(level)) return;
    
    if (this.config.categories.length > 0 && !this.config.categories.includes(category)) return;

    const entry: DebugEntry = {
      timestamp: new Date().toISOString(),
      level,
      category,
      message,
      data: data ? DebugUtils.sanitizeData(data) : undefined,
      trace: level === DebugLevel.ERROR ? new Error().stack : undefined
    };

    this.logs.push(entry);
    this.cleanupLogs();
    
    if (this.config.consoleOutput) {
      ConsoleManager.printToConsole(entry);
    }
  }

  private cleanupLogs() {
    if (this.logs.length > this.config.maxLogs) {
      this.logs = this.logs.slice(-this.config.maxLogs);
    }
  }

  getLogs(category?: string, level?: DebugLevel): DebugEntry[] {
    return DebugUtils.filterLogs(this.logs, category, level);
  }

  getLastLogs(count: number = 10): DebugEntry[] {
    return this.logs.slice(-count);
  }

  clearLogs() {
    this.logs = [];
    if (this.config.consoleOutput) {
      console.clear();
    }
    this.info('SYSTEM', 'Logs limpiados');
  }

  getStats() {
    return DebugUtils.generateStats(this.logs);
  }

  exportLogs(): string {
    return DebugUtils.exportLogs(this.logs);
  }

  isDebugEnabled(): boolean {
    return this.config.enabled;
  }

  getConfig(): DebugConfig {
    return { ...this.config };
  }

  test() {
    this.info('TEST', 'Prueba de sistema de debug');
    this.success('TEST', 'Sistema funcionando correctamente');
    this.warning('TEST', 'Advertencia de prueba');
    this.error('TEST', 'Error de prueba (no es real)');
  }
} 