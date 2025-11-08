import { AyuntamientoDetailData } from './AyuntamientoDetailData';

export interface UseAyuntamientoDetailVMResult {
  data?: AyuntamientoDetailData;
  isLoading: boolean;
  errorMessage?: string;
  refetch: () => void;
  activeTab: 'info' | 'desbloqueos';
  setActiveTab: (tab: 'info' | 'desbloqueos') => void;
  activeSubTab: 'heroes' | 'tropas' | 'hechizos' | 'animales';
  setActiveSubTab: (tab: 'heroes' | 'tropas' | 'hechizos' | 'animales') => void;
}

