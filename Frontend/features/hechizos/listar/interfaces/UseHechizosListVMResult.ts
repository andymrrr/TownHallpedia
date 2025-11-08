import { HechizoListItem } from './HechizoListItem';

/**
 * Resultado del ViewModel para la lista de hechizos
 */
export interface UseHechizosListVMResult {
  items: HechizoListItem[];
  isLoading: boolean;
  errorMessage?: string;
  refetch: () => void;
}

