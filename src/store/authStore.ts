import { create } from 'zustand';

interface AuthState {
  protectedData: any | null;
  setProtectedData: (data: any) => void;
}

const useAuthStore = create<AuthState>()((set) => ({
  protectedData: null,
  setProtectedData: (data) => set({ protectedData: data }),
}));

export default useAuthStore;
