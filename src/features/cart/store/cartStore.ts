import { create } from "zustand";
import {
  fetchCart,
  addCartItem,
  updateCartItem,
  deleteCartItem,
  clearCart,
} from "../services/cartService";
import type { Product } from "../../products/store/productStore";

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  loadCart: () => Promise<void>;
  addItem: (product: Product, quantity?: number) => Promise<void>;
  updateQuantity: (productId: number, quantity: number) => Promise<void>;
  removeItem: (productId: number) => Promise<void>;
  clearCart: () => Promise<void>;
  total: number;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  loadCart: async () => {
    try {
      const cart = await fetchCart();
      // Mapear el response si es necesario
      set({ items: cart });
    } catch (error) {
      console.error("Error al cargar el carrito:", error);
    }
  },
  addItem: async (product, quantity = 1) => {
    try {
      const newItem = await addCartItem({ productId: product.id, quantity });
      set((state) => ({
        items: [...state.items, newItem],
      }));
    } catch (error) {
      console.error("Error al agregar al carrito:", error);
    }
  },
  updateQuantity: async (productId, quantity) => {
    if (quantity < 1) return;
    try {
      const updatedItem = await updateCartItem(productId, quantity);
      set((state) => ({
        items: state.items.map((item) =>
          item.product.id === updatedItem.product.id ? updatedItem : item
        ),
      }));
    } catch (error) {
      console.error("Error al actualizar cantidad:", error);
    }
  },
  removeItem: async (productId) => {
    try {
      await deleteCartItem(productId);
      set((state) => ({
        items: state.items.filter((item) => item.product.id !== productId),
      }));
    } catch (error) {
      console.error("Error al eliminar del carrito:", error);
    }
  },
  clearCart: async () => {
    try {
      await clearCart();
      set({ items: [] });
    } catch (error) {
      console.error("Error al limpiar el carrito:", error);
    }
  },
  // La propiedad total se actualiza a partir del estado actual
  get total() {
    return get().items.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
  },
}));
