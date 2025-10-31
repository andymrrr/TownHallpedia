import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { CONFIG } from './config';
import { TokenData } from './types';
import { TokenManager } from './TokenManager';
import { ErrorHandler } from './ErrorHandler';
import { DebugApiMiddleware } from './DebugApiMiddleware';

export class RefreshTokenHandler {
  static async refreshToken(): Promise<TokenData> {
    const refreshToken = TokenManager.getRefreshToken();
    
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    const response = await axios.post(`${CONFIG.BASE_URL}${CONFIG.ENDPOINTS.REFRESH}`, {
      Token: TokenManager.getAccessToken(),
      RefreshToken: refreshToken
    });

    return response.data;
  }

  static async handleTokenRefresh(
    instance: AxiosInstance, 
    originalRequest: AxiosRequestConfig & { _retry?: boolean }
  ): Promise<AxiosResponse> {
    try {
      const tokenData = await this.refreshToken();
      
      // Actualizar tokens
      TokenManager.setTokens(tokenData);
      
      // Log del refresh exitoso
      DebugApiMiddleware.logTokenRefresh(true);
      
      // Reintentar request original
      if (originalRequest.headers) {
        originalRequest.headers.Authorization = `Bearer ${tokenData.access_token}`;
      }
      
      return instance(originalRequest);
    } catch (refreshError) {
      // Log del refresh fallido
      DebugApiMiddleware.logTokenRefresh(false, refreshError);
      
      // Si falla el refresh, limpiar tokens y disparar logout
      TokenManager.clearTokens();
      ErrorHandler.dispatchLogoutEvent();
      
      throw refreshError;
    }
  }
} 