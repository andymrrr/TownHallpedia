import { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { TokenManager } from './TokenManager';
import { DebugApiMiddleware } from './DebugApiMiddleware';
import { ErrorHandler } from './ErrorHandler';
import { RefreshTokenHandler } from './RefreshTokenHandler';

export class RequestInterceptor {
  static setup(instance: AxiosInstance, withAuth: boolean): void {
    instance.interceptors.request.use(
      (config) => {
        if (withAuth) {
          const token = TokenManager.getToken();
          if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
          }
        }
        
        const isCriticalEndpoint = config.url?.includes('crearjob') || config.url?.includes('Programados');
        if (!isCriticalEndpoint) {
          DebugApiMiddleware.addRequestMetadata(config);
          DebugApiMiddleware.logRequest(config);
        } else {
          // Los requests se capturan automáticamente por DebugApiMiddleware
        }
        
        return config;
      },
      (error) => Promise.reject(error)
    );
  }
}

export class ResponseInterceptor {
  static setup(instance: AxiosInstance, withAuth: boolean): void {
    instance.interceptors.response.use(
      (response: AxiosResponse) => {
        const isCriticalEndpoint = response.config.url?.includes('crearjob') || response.config.url?.includes('Programados');
        if (!isCriticalEndpoint) {
          DebugApiMiddleware.logResponse(response);
        } else {
          // Los responses se capturan automáticamente por DebugApiMiddleware
        }
        
        return response;
      },
      async (error: AxiosError) => {
        const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };
        const isCriticalEndpoint = error.config?.url?.includes('crearjob') || error.config?.url?.includes('Programados');
        
        if (!isCriticalEndpoint && ErrorHandler.shouldRetryWithRefresh(error, originalRequest) && withAuth) {
          originalRequest._retry = true;
          
          try {
            return await RefreshTokenHandler.handleTokenRefresh(instance, originalRequest);
          } catch (refreshError) {
          }
        }

        const apiError = ErrorHandler.createApiError(error);
        
        if (!isCriticalEndpoint) {
          DebugApiMiddleware.logError(error, apiError);
        } else {
          // Los errores se capturan automáticamente por DebugApiMiddleware
        }
        
        return Promise.reject(apiError);
      }
    );
  }
} 