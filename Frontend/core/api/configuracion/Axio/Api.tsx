 import { AxiosInstance } from 'axios';
import { ApiConfig } from './types';
import { ApiFactory } from './ApiFactory';

export const Api = ApiFactory.createInstance({ 
  contentType: "application/json", 
  withAuth: false 
});

export const ApiConArchivo = ApiFactory.createInstance({ 
  contentType: "multipart/form-data", 
  withAuth: false 
});

export const ApiSinAuth = ApiFactory.createInstance({ 
  contentType: "application/json", 
  withAuth: false 
});

// Manejo de tokens eliminado

export const crearApiPersonalizada = (config: ApiConfig): AxiosInstance => {
  return ApiFactory.createInstance(config);
};


export { ApiFactory } from './ApiFactory';
export { ErrorHandler } from './ErrorHandler';
export type { ApiConfig, ApiError } from './types';
