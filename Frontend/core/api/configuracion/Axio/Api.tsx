 import { AxiosInstance } from 'axios';
import { ApiConfig } from './types';
import { ApiFactory } from './ApiFactory';
import { TokenManager } from './TokenManager';

export const Api = ApiFactory.createInstance({ 
  contentType: "application/json", 
  withAuth: true 
});

export const ApiConArchivo = ApiFactory.createInstance({ 
  contentType: "multipart/form-data", 
  withAuth: true 
});

export const ApiSinAuth = ApiFactory.createInstance({ 
  contentType: "application/json", 
  withAuth: false 
});

export const configurarTokens = (accessToken: string, refreshToken?: string): void => {
  TokenManager.setTokens({ access_token: accessToken, refresh_token: refreshToken });
};

export const limpiarTokens = (): void => {
  TokenManager.clearTokens();
};

export const estaAutenticado = (): boolean => {
  return TokenManager.hasValidToken();
};

export const crearApiPersonalizada = (config: ApiConfig): AxiosInstance => {
  return ApiFactory.createInstance(config);
};


export { ApiFactory } from './ApiFactory';
export { TokenManager } from './TokenManager';
export { ErrorHandler } from './ErrorHandler';
export { RefreshTokenHandler } from './RefreshTokenHandler';
export type { ApiConfig, ApiError, TokenData } from './types';
