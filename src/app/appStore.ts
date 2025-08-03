import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface AuthStore {
  isAuthenticated: boolean;
  isLoading: boolean;
  setAuthenticated: (value: boolean) => void;
  setLoading: (value: boolean) => void;
}

const initialState = {
  isAuthenticated: false,
  isLoading: true,
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      ...initialState,

      setAuthenticated: (value: boolean) => set({ isAuthenticated: value }),
      setLoading: (value: boolean) => set({ isLoading: value }),
    }),
    {
      name: 'auth-store',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
