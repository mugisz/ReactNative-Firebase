import { IProduct } from "@/type";
import { create } from "zustand";

interface ICartStore {
  cart: IProduct[];
  setCart: (cart: IProduct[]) => void;
  addToCart: (product: IProduct) => void;
  removeFromCart: (product: IProduct) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const useCartStore = create<ICartStore>((set) => ({
  cart: [],
  setCart: (cart) => set({ cart }),
  addToCart: (product) =>
    set((state) => {
      const existingItemIndex = state.cart.findIndex(
        (item) => item.id === product.id
      );

      if (existingItemIndex !== -1) {
        const updatedCart = [...state.cart];
        updatedCart[existingItemIndex] = product;
        return { cart: updatedCart };
      } else {
        return { cart: [...state.cart, product] };
      }
    }),
  removeFromCart: (product) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.id !== product.id),
    })),
  isOpen: false,
  setIsOpen: (isOpen) => set({ isOpen }),
}));
