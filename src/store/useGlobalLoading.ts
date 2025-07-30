import { create } from 'zustand';

interface GlobalLoadingState {
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
}

const useGlobalLoading = create<GlobalLoadingState>((set) => ({
  isLoading: false,
  setLoading: (isLoading) => set({ isLoading }),
}));

export default useGlobalLoading;
