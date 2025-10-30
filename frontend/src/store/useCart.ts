import { create } from 'zustand';

interface CartState {
  experienceId?: string;
  date?: string;
  time?: string;
  qty: number;
  set: (p: Partial<CartState>) => void;
  clear: () => void;
}

export const useCart = create<CartState>((set) => ({
  qty: 1,
  set: (p) => set((s) => ({ ...s, ...p })),
  clear: () => set({ experienceId: undefined, date: undefined, time: undefined, qty: 1 })
}));
