import { HeroeDetailData } from './HeroeDetailData';

export interface UseHeroeDetailVMResult {
  data?: HeroeDetailData;
  isLoading: boolean;
  errorMessage?: string;
  refetch: () => void;
}

