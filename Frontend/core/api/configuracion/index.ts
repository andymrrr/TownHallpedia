export { 
  Api, 
  ApiConArchivo, 
  ApiSinAuth,
  ApiFactory,
  crearApiPersonalizada
} from './Axio';

export type { ApiConfig, ApiError } from './Axio';

// Storage y tokens removidos

// Eventos cross-platform
export { AuthEvents } from './events/AuthEvents';
export { useConfiguracion } from './useConfiguracion';