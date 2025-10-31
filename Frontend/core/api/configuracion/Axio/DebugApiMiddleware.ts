import { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { DebugAPI } from '../SistemaDebug/debugSystem';
import { ApiError } from './types';
import { ApiDiagnostics } from './ApiDiagnostics';

export class DebugApiMiddleware {
    
  static logRequest(config: AxiosRequestConfig): void {
    const method = config.method?.toUpperCase() || 'UNKNOWN';
    const url = config.url || 'unknown-url';
    const fullUrl = config.baseURL ? `${config.baseURL}${url}` : url;
    
    const sanitizedHeaders = this.sanitizeHeaders(config.headers);
    
    DebugAPI.request(`${method} ${fullUrl}`, {
      headers: sanitizedHeaders,
      data: config.data,
      params: config.params,
      timeout: config.timeout,
      timestamp: new Date().toISOString()
    });
  }

  static logResponse(response: AxiosResponse): void {
    const method = response.config.method?.toUpperCase() || 'UNKNOWN';
    const url = response.config.url || 'unknown-url';
    const fullUrl = response.config.baseURL ? `${response.config.baseURL}${url}` : url;
    const duration = this.calculateDuration(response.config);
    
    DebugAPI.response(`${method} ${fullUrl} - ${response.status}`, {
      status: response.status,
      statusText: response.statusText,
      data: response.data,
      headers: response.headers,
      duration,
      timestamp: new Date().toISOString()
    });
  }

  static logError(error: AxiosError, apiError: ApiError): void {
    const method = error.config?.method?.toUpperCase() || 'UNKNOWN';
    const url = error.config?.url || 'unknown-url';
    const fullUrl = error.config?.baseURL ? `${error.config.baseURL}${url}` : url;
    const duration = this.calculateDuration(error.config);
    
    const errorDetails = {
      originalError: {
        message: error.message,
        code: error.code,
        status: error.response?.status,
        statusText: error.response?.statusText
      },
      apiError,
      requestConfig: {
        url: fullUrl,
        method,
        params: error.config?.params,
        data: error.config?.data
      },
      responseData: error.response?.data,
      duration,
      timestamp: new Date().toISOString(),
      // Siempre incluir stack si existe; en RN y Node suele estar disponible
      stack: (error as any).stack
    };
    
    DebugAPI.error(`${method} ${fullUrl} - Error ${error.response?.status || 'Network'}`, errorDetails);
    
    if (error.response?.status) {
      ApiDiagnostics.diagnoseHttpError(error.response.status, error.response.data, fullUrl);
    } else {  
      ApiDiagnostics.diagnoseNetworkError(error, fullUrl);
    }
  }

  static logTokenRefresh(success: boolean, error?: any): void {
    if (success) {
      DebugAPI.response('Token refresh successful', {
        timestamp: new Date().toISOString()
      });
    } else {
      DebugAPI.error('Token refresh failed', {
        error,
        timestamp: new Date().toISOString()
      });
    }
  }

  private static sanitizeHeaders(headers: any): any {
    if (!headers) return headers;
    
    const sensitiveKeys = ['authorization', 'cookie', 'x-api-key', 'x-auth-token'];
    const sanitized = { ...headers };
    
    Object.keys(sanitized).forEach(key => {
      if (sensitiveKeys.some(sk => key.toLowerCase().includes(sk))) {
          sanitized[key] = '***HIDDEN***';
      }
    });
    
    return sanitized;
  }

  private static calculateDuration(config?: AxiosRequestConfig): string {
    if (!config || !(config as any).metadata?.startTime) {
      return 'unknown';
    }
    
    const startTime = (config as any).metadata.startTime;
    const duration = Date.now() - startTime;
    return `${duration}ms`;
  }

  static addRequestMetadata(config: AxiosRequestConfig): AxiosRequestConfig {
    (config as any).metadata = {
      startTime: Date.now()
    };
    return config;
  }
} 