import { useAyuntamientosListViewModel } from '@/features/ayuntamientos/viewModels';

export function useAyuntamientosScreen() {
  const vm = useAyuntamientosListViewModel({ page: 1, limit: 20, withCount: true });
  return {
    viewModel: vm,
    isLoading: vm.isLoading,
    error: vm.errorMessage,
  };
}

