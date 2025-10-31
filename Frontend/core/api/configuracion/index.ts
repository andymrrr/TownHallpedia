export { 
  Api, 
  ApiConArchivo, 
  ApiSinAuth,
  ApiFactory,
  TokenManager,
  configurarTokens,
  limpiarTokens,
  estaAutenticado,
  crearApiPersonalizada
} from './Axio';

export { 
  FetchClient, 
  FetchClientSinAuth, 
  FetchClientArchivos,
  FetchApi,
  FetchTokenManager,
  configurarTokensFetch,
  limpiarTokensFetch,
  estaAutenticadoFetch,
  crearFetchPersonalizado
} from './Fetch';

export type { ApiConfig, ApiError } from './Axio';
export type { 
  FetchConfig, 
  FetchError, 
  FetchResponse
} from './Fetch';

// Utilidades de storage
export { 
  LocalStorageUtil, 
  SessionStorageUtil, 
  CookieUtil, 
  StorageManager,
  RNStorage,
  initializeRNStorage
} from './Storage'; 

// Eventos cross-platform
export { AuthEvents } from './events/AuthEvents';
export { useConfiguracion } from './useConfiguracion';