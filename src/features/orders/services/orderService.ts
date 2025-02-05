import axiosInstance from "../../../api/axios";
import type { Order } from "../store/orderStore";

export interface OrderPayload extends Omit<Order, "id" | "createdAt"> {}

export interface OrderResponse extends Order {}

export const createOrder = async (
  order: OrderPayload
): Promise<OrderResponse> => {
  const response = await axiosInstance.post("/orders", order);
  return response.data;
};

export const updateOrderStatus = async (
  orderId: string,
  status: Order["status"]
): Promise<OrderResponse> => {
  const response = await axiosInstance.put(`/orders/${orderId}`, { status });
  return response.data;
};
