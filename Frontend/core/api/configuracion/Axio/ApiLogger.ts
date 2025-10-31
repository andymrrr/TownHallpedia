import { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { ApiError } from './types';

export class ApiLogger {
  private static isDevMode(): boolean {
    const nodeEnv = typeof process !== 'undefined' && (process as any)?.env?.NODE_ENV === 'development';
    const fromGlobal = (globalThis as any)?.__APP_ENV?.NODE_ENV === 'development';
    return nodeEnv || fromGlobal;
  }

  static logRequest(config: AxiosRequestConfig): void {
    // Los requests se capturan automáticamente por DebugApiMiddleware
    return;
  }

  static logResponse(response: AxiosResponse): void {
    // Los responses se capturan automáticamente por DebugApiMiddleware
    return;
  }

  static logError(error: AxiosError, apiError: ApiError): void {
    // Los errores se capturan automáticamente por DebugApiMiddleware
    return;
  }
} 