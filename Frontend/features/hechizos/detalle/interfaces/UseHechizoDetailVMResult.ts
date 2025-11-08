import { HechizoDetailData } from './HechizoDetailData';

export interface UseHechizoDetailVMResult {
  data?: HechizoDetailData;
  isLoading: boolean;
  errorMessage?: string;
  refetch: () => void;
}

