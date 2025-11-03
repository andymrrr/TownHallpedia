import { AxiosError } from 'axios';
import { ApiError } from './types';
import { AuthEvents } from '../events/AuthEvents';

export class ErrorHandler {
  static createApiError(error: AxiosError): ApiError {
    const responseData = error.response?.data as any;
    
    return {
      message: responseData?.message || error.message || 'Error desconocido',
      status: error.response?.status,
      data: error.response?.data,
      code: responseData?.code || error.code
    };
  }

  static shouldRetryWithRefresh(_error: AxiosError, _originalRequest: any): boolean {
    // Refresh deshabilitado
    return false;
  }

  static dispatchLogoutEvent(): void {
    try {
      AuthEvents.emit('logout');
    } catch {}
  }
} 