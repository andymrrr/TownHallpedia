import { Debug, DebugAPI } from './debugSystem';

export interface GlobalErrorConfig {
  captureUnhandledRejections: boolean;
  captureConsoleErrors: boolean;
  captureNetworkErrors: boolean;
  captureReactErrors: boolean;
  maxStackDepth: number;
  enableStackTrace: boolean;
}

export class GlobalErrorHandler {
  private static instance: GlobalErrorHandler;
  private config: GlobalErrorConfig;
  private originalConsoleError: typeof console.error;
  private originalConsoleWarn: typeof console.warn;
  private isInitialized = false;

  private constructor() {
    this.config = {
      captureUnhandledRejections: true,
      captureConsoleErrors: true,
      captureNetworkErrors: true,
      captureReactErrors: true,
      maxStackDepth: 10,
      enableStackTrace: true
    };

    
    this.originalConsoleError = console.error.bind(console);
    this.originalConsoleWarn = console.warn.bind(console);
  }

  public static getInstance(): GlobalErrorHandler {
    if (!GlobalErrorHandler.instance) {
      GlobalErrorHandler.instance = new GlobalErrorHandler();
    }
    return GlobalErrorHandler.instance;
  }

  public initialize(config?: Partial<GlobalErrorConfig>): void {
    if (this.isInitialized) {
      Debug.warning('GLOBAL_ERROR_HANDLER', 'Ya está inicializado el handler global de errores');
      return;
    }

    this.config = { ...this.config, ...config };
    this.setupGlobalHandlers();
    this.isInitialized = true;

    Debug.success('GLOBAL_ERROR_HANDLER', 'Sistema de captura global de errores inicializado', this.config);
  }

  private setupGlobalHandlers(): void {
    // Capturar errores no manejados
    if (this.config.captureUnhandledRejections) {
      if (typeof window !== 'undefined' && (window as any).addEventListener) {
        window.addEventListener('error', this.handleGlobalError.bind(this));
        window.addEventListener('unhandledrejection', this.handleUnhandledRejection.bind(this));
      } else if (typeof global !== 'undefined') {
        // React Native
        const g: any = global as any;
        if (g.ErrorUtils && typeof g.ErrorUtils.setGlobalHandler === 'function') {
          const prev = g.ErrorUtils.getGlobalHandler && g.ErrorUtils.getGlobalHandler();
          g.ErrorUtils.setGlobalHandler((error: any, isFatal?: boolean) => {
            Debug.error('GLOBAL_ERROR', `RN Global Error${isFatal ? ' (Fatal)' : ''}`, {
              message: error?.message,
              stack: error?.stack,
              isFatal,
              timestamp: new Date().toISOString()
            });
            if (prev) try { prev(error, isFatal); } catch {}
          });
        }
        // Promesas no manejadas (fallback)
        if (g.addEventListener) {
          try {
            g.addEventListener('unhandledrejection', (event: any) => this.handleUnhandledRejection(event));
          } catch {}
        }
      }
    }

    // Interceptar console.error y console.warn
    if (this.config.captureConsoleErrors) {
      this.interceptConsole();
    }

    // Interceptar fetch para errores de red
    if (this.config.captureNetworkErrors) {
      this.interceptFetch();
      this.interceptXHR();
    }
  }

  private handleGlobalError(event: ErrorEvent): void {
    const errorInfo = {
      message: event.message,
      filename: event.filename,
      lineno: event.lineno,
      colno: event.colno,
      stack: (event as any).error?.stack,
      timestamp: new Date().toISOString(),
      type: 'uncaught_error',
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : undefined,
      url: typeof window !== 'undefined' ? window.location.href : undefined
    };

    Debug.error('GLOBAL_ERROR', `Error no capturado: ${event.message}`, errorInfo);
  }

  private handleUnhandledRejection(event: PromiseRejectionEvent): void {
    const reason: any = (event as any)?.reason;
    const errorInfo = {
      reason,
      stack: reason?.stack,
      timestamp: new Date().toISOString(),
      type: 'unhandled_promise_rejection',
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : undefined,
      url: typeof window !== 'undefined' ? window.location.href : undefined
    };

    Debug.error('GLOBAL_ERROR', `Promise rechazada no manejada: ${reason}`, errorInfo);
  }

  private interceptConsole(): void {
    console.error = (...args: any[]) => {
      this.originalConsoleError(...args);
      const message = args.map(arg => 
        typeof arg === 'object' ? safeStringify(arg) : String(arg)
      ).join(' ');
      Debug.error('CONSOLE_ERROR', message, {
        originalArgs: args,
        timestamp: new Date().toISOString(),
        stack: this.config.enableStackTrace ? new Error().stack : undefined
      });
    };

    console.warn = (...args: any[]) => {
      const message = args.map(arg => 
        typeof arg === 'object' ? safeStringify(arg) : String(arg)
      ).join(' ');
      if (message.includes('[antd: compatible]') && message.includes('React is 16 ~ 18')) {
        return;
      }
      this.originalConsoleWarn(...args);
      Debug.warning('CONSOLE_WARN', message, {
        originalArgs: args,
        timestamp: new Date().toISOString(),
        stack: this.config.enableStackTrace ? new Error().stack : undefined
      });
    };
  }

  private interceptFetch(): void {
    const hasWindow = typeof window !== 'undefined';
    const originalFetch = (hasWindow ? (window as any).fetch : (global as any).fetch) as typeof fetch | undefined;
    if (!originalFetch) return;

    const assignTarget: any = hasWindow ? window : global;

    assignTarget.fetch = async (...args: Parameters<typeof fetch>) => {
      const [url, options] = args;
      const startTime = Date.now();
      try {
        DebugAPI.request(`FETCH ${options?.method || 'GET'} ${url}`, {
          url: String(url),
          method: options?.method || 'GET',
          headers: (options as any)?.headers,
          body: (options as any)?.body,
          timestamp: new Date().toISOString()
        });

        const response = await originalFetch(...args);
        const duration = Date.now() - startTime;

        if ((response as any).ok) {
          DebugAPI.response(`FETCH ${options?.method || 'GET'} ${url} - ${(response as any).status}`, {
            status: (response as any).status,
            statusText: (response as any).statusText,
            headers: response && (response as any).headers && (response as any).headers.entries ? Object.fromEntries((response as any).headers.entries()) : undefined,
            duration: `${duration}ms`,
            timestamp: new Date().toISOString()
          });
        } else {
          let errorBody: string | undefined;
          try {
            errorBody = await (response as any).text?.();
          } catch {}
          DebugAPI.error(`FETCH ${options?.method || 'GET'} ${url} - ${(response as any).status}`, {
            status: (response as any).status,
            statusText: (response as any).statusText,
            headers: response && (response as any).headers && (response as any).headers.entries ? Object.fromEntries((response as any).headers.entries()) : undefined,
            body: errorBody,
            duration: `${duration}ms`,
            timestamp: new Date().toISOString()
          });
        }

        return response as any;
      } catch (error) {
        const duration = Date.now() - startTime;
        DebugAPI.error(`FETCH ${options?.method || 'GET'} ${url} - Network Error`, {
          error: error instanceof Error ? error.message : String(error),
          stack: error instanceof Error ? error.stack : undefined,
          duration: `${duration}ms`,
          timestamp: new Date().toISOString()
        });
        throw error;
      }
    };
  }

  private interceptXHR(): void {
    const XHR = (typeof window !== 'undefined' ? (window as any).XMLHttpRequest : (global as any).XMLHttpRequest) as any;
    if (!XHR || !XHR.prototype) return;

    const originalXHROpen = XHR.prototype.open;
    const originalXHRSend = XHR.prototype.send;

    XHR.prototype.open = function(method: string, url: string | URL, async?: boolean, username?: string | null, password?: string | null) {
      (this as any)._debugInfo = {
        method,
        url: url.toString(),
        startTime: Date.now()
      };
      return originalXHROpen.call(this, method, url, async ?? true, username, password);
    };

    XHR.prototype.send = function(body?: any) {
      const debugInfo = (this as any)._debugInfo;
      if (debugInfo) {
        DebugAPI.request(`XHR ${debugInfo.method} ${debugInfo.url}`, {
          method: debugInfo.method,
          url: debugInfo.url,
          body,
          timestamp: new Date().toISOString()
        });

        const originalOnReadyStateChange = this.onreadystatechange;
        this.onreadystatechange = function(event: any) {
          if (this.readyState === 4 /* DONE */) {
            const duration = Date.now() - debugInfo.startTime;
            if (this.status >= 200 && this.status < 300) {
              DebugAPI.response(`XHR ${debugInfo.method} ${debugInfo.url} - ${this.status}`, {
                status: this.status,
                statusText: this.statusText,
                responseText: this.responseText,
                duration: `${duration}ms`,
                timestamp: new Date().toISOString()
              });
            } else {
              DebugAPI.error(`XHR ${debugInfo.method} ${debugInfo.url} - ${this.status}`, {
                status: this.status,
                statusText: this.statusText,
                responseText: this.responseText,
                duration: `${duration}ms`,
                timestamp: new Date().toISOString()
              });
            }
          }
          if (originalOnReadyStateChange) {
            originalOnReadyStateChange.call(this, event);
          }
        };
      }
      return originalXHRSend.call(this, body);
    };
  }

  public captureException(error: Error, context?: Record<string, any>): void {
    Debug.error('MANUAL_CAPTURE', error.message, {
      name: error.name,
      stack: error.stack,
      context,
      timestamp: new Date().toISOString(),
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : undefined,
      url: typeof window !== 'undefined' ? window.location.href : undefined
    });
  }

  public captureMessage(message: string, level: 'info' | 'warning' | 'error' = 'info', context?: Record<string, any>): void {
    const debugMethod = level === 'error' ? Debug.error : level === 'warning' ? Debug.warning : Debug.info;
    
    debugMethod('MANUAL_MESSAGE', message, {
      context,
      timestamp: new Date().toISOString(),
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : undefined,
      url: typeof window !== 'undefined' ? window.location.href : undefined
    });
  }

  public setContext(key: string, value: any): void {
    Debug.info('CONTEXT_UPDATE', `Contexto actualizado: ${key}`, { [key]: value });
  }

  public dispose(): void {
    if (!this.isInitialized) return;

    console.error = this.originalConsoleError;
    console.warn = this.originalConsoleWarn;

    // TODO: Restaurar fetch y XHR originales (requiere más trabajo)
    
    this.isInitialized = false;
    Debug.info('GLOBAL_ERROR_HANDLER', 'Sistema de captura global de errores desactivado');
  }
}

// Helpers
function safeStringify(value: any): string {
  try { return JSON.stringify(value, null, 2); } catch { return String(value); }
}

// Instancia singleton
export const globalErrorHandler = GlobalErrorHandler.getInstance();

// Inicialización automática controlada por el sistema de debug (sin import.meta.env)
try {
	const { Debug } = require('./debugSystem');
	if (Debug?.isDebugEnabled()) {
		globalErrorHandler.initialize();
	}
} catch {
	// Silenciar si el Debug no está disponible en este entorno
} 