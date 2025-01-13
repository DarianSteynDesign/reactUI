import { create } from 'zustand';
import { CartService } from '../../services/CartService';

export interface CartItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

interface CartState {
  items: { id: string; name: string; quantity: number; price: number }[];
  shouldSaveCart: boolean;
  addItem: (item: { id: string; name: string; price: number }) => void;
  removeItem: (id: string) => void;
  saveCart: () => Promise<void>; 
  setItems: (items: { id: string; name: string; quantity: number; price: number }[]) => void;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  shouldSaveCart: false,
  addItem: (item) => {
    const existingItem = get().items.find((i) => i.id === item.id);
    if (existingItem) {
      set((state) => ({
        items: state.items.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        ),
        shouldSaveCart: true,
      }));
    } else {
      set((state) => ({
        items: [...state.items, { ...item, quantity: 1 }],
        shouldSaveCart: true,
      }));
    }
  },
  removeItem: (id) =>
    set((state) => {
      const existingItem = state.items.find((item) => item.id === id);
      if (existingItem) {
        if (existingItem.quantity > 1) {
          return {
            items: state.items.map((item) =>
              item.id === id ? { ...item, quantity: item.quantity - 1 } : item
            ),
            shouldSaveCart: true,
          };
        } else {
          return {
            items: state.items.filter((item) => item.id !== id),
            shouldSaveCart: true,
          };
        }
      }
      return state;
    }),
  saveCart: async () => {
    const cartItems = get().items;
    try {
        await CartService.postCart(cartItems); 

        set({ shouldSaveCart: false }); 
    } catch (error) {
      console.error('Failed to save cart:', error);
    }
  },
  setItems: (items) => set({ items })
}));
