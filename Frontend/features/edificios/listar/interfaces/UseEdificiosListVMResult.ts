import { EdificioListItem } from './EdificioListItem';

/**
 * Resultado del ViewModel para la lista de edificios
 */
export interface UseEdificiosListVMResult {
  items: EdificioListItem[];
  isLoading: boolean;
  errorMessage?: string;
  refetch: () => void;
}

