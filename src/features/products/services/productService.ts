import axiosInstance from "../../../api/axios";

export interface ProductPayload {
  name: string;
  price: number;
  image: string;
  category: string;
}

export interface ProductResponse extends ProductPayload {
  id: number;
}

export const fetchProducts = async (): Promise<ProductResponse[]> => {
  const response = await axiosInstance.get("/products");
  return response.data;
};

export const createProduct = async (
  product: ProductPayload
): Promise<ProductResponse> => {
  const response = await axiosInstance.post("/products", product);
  return response.data;
};

export const updateProduct = async (
  product: ProductResponse
): Promise<ProductResponse> => {
  const response = await axiosInstance.put(`/products/${product.id}`, product);
  return response.data;
};

export const deleteProduct = async (id: number): Promise<void> => {
  await axiosInstance.delete(`/products/${id}`);
};
