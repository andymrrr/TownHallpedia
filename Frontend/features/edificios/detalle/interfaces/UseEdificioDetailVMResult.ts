import { EdificioDetailData } from './EdificioDetailData';

export interface UseEdificioDetailVMResult {
  data?: EdificioDetailData;
  isLoading: boolean;
  errorMessage?: string;
  refetch: () => void;
}

