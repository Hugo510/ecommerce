import { create } from "zustand";

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
}

interface ProductState {
  products: Product[];
  addProduct: (product: Omit<Product, "id">) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (id: number) => void;
}

export const useProductStore = create<ProductState>((set) => ({
  products: [
    {
      id: 1,
      name: "Fender Stratocaster",
      price: 1299.99,
      image:
        "https://images.unsplash.com/photo-1564186763535-ebb21ef5277f?auto=format&fit=crop&w=600&q=80",
      category: "Guitars",
    },
    {
      id: 2,
      name: "Audio-Technica ATH-M50x",
      price: 149.99,
      image:
        "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=600&q=80",
      category: "Headphones",
    },
    {
      id: 3,
      name: "Roland Digital Piano",
      price: 899.99,
      image:
        "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?auto=format&fit=crop&w=600&q=80",
      category: "Pianos",
    },
    {
      id: 4,
      name: "Shure SM58 Microphone",
      price: 99.99,
      image:
        "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=600&q=80",
      category: "Microphones",
    },
  ],
  addProduct: (product) =>
    set((state) => ({
      products: [
        ...state.products,
        { ...product, id: state.products.length + 1 },
      ],
    })),
  updateProduct: (updatedProduct) =>
    set((state) => ({
      products: state.products.map((p) =>
        p.id === updatedProduct.id ? updatedProduct : p
      ),
    })),
  deleteProduct: (id) =>
    set((state) => ({
      products: state.products.filter((p) => p.id !== id),
    })),
}));
