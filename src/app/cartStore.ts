import { create } from 'zustand';

export interface CartItem {
  id: string;
  name: string;
  price: string;
  image: string;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  totalItems: number;
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  getItemQuantity: (itemId: string) => number;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  totalItems: 0,

  addToCart: (item) => {
    set((state) => {
      const existingItem = state.items.find((i) => i.id === item.id);

      if (existingItem) {
        // Update quantity if item already exists
        const updatedItems = state.items.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
        return {
          items: updatedItems,
          totalItems: state.totalItems + 1,
        };
      } else {
        // Add new item
        const newItem = { ...item, quantity: 1 };
        return {
          items: [...state.items, newItem],
          totalItems: state.totalItems + 1,
        };
      }
    });
  },

  removeFromCart: (itemId) => {
    set((state) => {
      const item = state.items.find((i) => i.id === itemId);
      if (!item) return state;

      const updatedItems = state.items.filter((i) => i.id !== itemId);
      return {
        items: updatedItems,
        totalItems: state.totalItems - item.quantity,
      };
    });
  },

  updateQuantity: (itemId, quantity) => {
    set((state) => {
      const item = state.items.find((i) => i.id === itemId);
      if (!item) return state;

      const quantityDifference = quantity - item.quantity;
      const updatedItems = state.items.map((i) =>
        i.id === itemId ? { ...i, quantity } : i
      );

      return {
        items: updatedItems,
        totalItems: state.totalItems + quantityDifference,
      };
    });
  },

  clearCart: () => {
    set({ items: [], totalItems: 0 });
  },

  getItemQuantity: (itemId) => {
    const state = get();
    const item = state.items.find((i) => i.id === itemId);
    return item ? item.quantity : 0;
  },
}));
