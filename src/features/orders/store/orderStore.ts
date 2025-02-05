import { create } from "zustand";
import {
  createOrder as createOrderAPI,
  updateOrderStatus as updateOrderStatusAPI,
} from "../services/orderService";
import type { CartItem } from "../../cart/store/cartStore";

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: "pending" | "shipped" | "delivered";
  createdAt: string;
  trackingNumber?: string;
  estimatedDelivery?: string;
}

interface OrderState {
  orders: Order[];
  addOrder: (order: Omit<Order, "id" | "createdAt">) => Promise<void>;
  updateOrderStatus: (
    orderId: string,
    status: Order["status"]
  ) => Promise<void>;
}

export const useOrderStore = create<OrderState>((set) => ({
  orders: [],
  addOrder: async (order) => {
    try {
      const newOrder = await createOrderAPI(order);
      set((state) => ({
        orders: [...state.orders, newOrder],
      }));
    } catch (error) {
      console.error("Error al agregar orden:", error);
    }
  },
  updateOrderStatus: async (orderId, status) => {
    try {
      const updatedOrder = await updateOrderStatusAPI(orderId, status);
      set((state) => ({
        orders: state.orders.map((order) =>
          order.id === updatedOrder.id ? updatedOrder : order
        ),
      }));
    } catch (error) {
      console.error("Error al actualizar el estado de la orden:", error);
    }
  },
}));
