import { useEffect, useState } from 'react';
import { initializeRNStorage } from './Storage';
import { AuthEvents } from './events/AuthEvents';

type UseConfiguracionOptions = {
  onLogout?: () => void;
  autoInitStorage?: boolean;
};

/**
 * Hook para inicializar y gestionar la configuración de la app
 * Úsalo en tu RootLayout o componente principal
 */
export function useConfiguracion(options: UseConfiguracionOptions = {}) {
  const { onLogout, autoInitStorage = true } = options;
  const [storageReady, setStorageReady] = useState(false);

  useEffect(() => {
    let unsubscribe: (() => void) | undefined;

    const init = async () => {
      if (autoInitStorage) {
        await initializeRNStorage();
        setStorageReady(true);
      }

      if (onLogout) {
        unsubscribe = AuthEvents.on('logout', onLogout);
      }
    };

    init();

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [autoInitStorage, onLogout]);

  return { storageReady };
}

