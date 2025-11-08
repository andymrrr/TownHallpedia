import { HeroListItem } from './HeroListItem';

/**
 * Resultado del ViewModel para la lista de héroes
 */
export interface UseHeroesListVMResult {
  items: HeroListItem[];
  isLoading: boolean;
  errorMessage?: string;
  refetch: () => void;
}

