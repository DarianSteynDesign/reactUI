import create from 'zustand';

interface LazyState {
  isVisible: boolean;
  setIsVisible: (visible: boolean) => void;
}

export const useLazyStore = create<LazyState>((set) => ({
  isVisible: false,
  setIsVisible: (visible) => set({ isVisible: visible })
}));
