import axiosInstance from "../../../api/axios";

export interface CartItemPayload {
  productId: number;
  quantity: number;
}

// Suponiendo que el backend retorna la información completa del producto en el carrito
export interface CartItemResponse {
  product: {
    id: number;
    name: string;
    price: number;
    image: string;
    category: string;
  };
  quantity: number;
}

export const fetchCart = async (): Promise<CartItemResponse[]> => {
  const response = await axiosInstance.get("/cart");
  return response.data;
};

export const addCartItem = async (
  item: CartItemPayload
): Promise<CartItemResponse> => {
  const response = await axiosInstance.post("/cart", item);
  return response.data;
};

export const updateCartItem = async (
  productId: number,
  quantity: number
): Promise<CartItemResponse> => {
  const response = await axiosInstance.put(`/cart/${productId}`, { quantity });
  return response.data;
};

export const deleteCartItem = async (productId: number): Promise<void> => {
  await axiosInstance.delete(`/cart/${productId}`);
};

export const clearCart = async (): Promise<void> => {
  await axiosInstance.delete("/cart");
};
