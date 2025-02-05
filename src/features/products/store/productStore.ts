import { create } from "zustand";
import {
  fetchProducts,
  createProduct,
  updateProduct as updateProductAPI,
  deleteProduct as deleteProductAPI,
  ProductResponse,
} from "../services/productService";

export interface Product extends ProductResponse {}

interface ProductState {
  products: Product[];
  loadProducts: () => Promise<void>;
  addProduct: (product: Omit<Product, "id">) => Promise<void>;
  updateProduct: (product: Product) => Promise<void>;
  deleteProduct: (id: number) => Promise<void>;
}

export const useProductStore = create<ProductState>((set) => ({
  products: [],
  loadProducts: async () => {
    try {
      const products = await fetchProducts();
      set({ products });
    } catch (error) {
      console.error("Error al cargar productos:", error);
    }
  },
  addProduct: async (product) => {
    try {
      const newProduct = await createProduct(product);
      set((state) => ({ products: [...state.products, newProduct] }));
    } catch (error) {
      console.error("Error al agregar producto:", error);
    }
  },
  updateProduct: async (updatedProduct) => {
    try {
      const product = await updateProductAPI(updatedProduct);
      set((state) => ({
        products: state.products.map((p) =>
          p.id === product.id ? product : p
        ),
      }));
    } catch (error) {
      console.error("Error al actualizar producto:", error);
    }
  },
  deleteProduct: async (id) => {
    try {
      await deleteProductAPI(id);
      set((state) => ({
        products: state.products.filter((p) => p.id !== id),
      }));
    } catch (error) {
      console.error("Error al eliminar producto:", error);
    }
  },
}));
