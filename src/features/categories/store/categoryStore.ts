import { create } from "zustand";
import {
  fetchCategories,
  createCategory,
  updateCategory,
  deleteCategory /* CategoryResponse */,
} from "../services/categoryService";
import { Guitar, Piano, Headphones, Mic2, Radio } from "lucide-react";

export interface Category {
  id: number;
  name: string;
  icon: any;
}

// Mapea nombres de categoría a íconos por defecto
const defaultIcons: Record<string, any> = {
  Guitars: Guitar,
  Pianos: Piano,
  Audio: Headphones,
  Microphones: Mic2,
  Accessories: Radio,
};

interface CategoryState {
  categories: Category[];
  loadCategories: () => Promise<void>;
  addCategory: (name: string) => Promise<void>;
  updateCategory: (category: Category) => Promise<void>;
  deleteCategory: (id: number) => Promise<void>;
}

export const useCategoryStore = create<CategoryState>((set) => ({
  categories: [],
  loadCategories: async () => {
    try {
      const response = await fetchCategories();
      set({
        categories: response.map((cat) => ({
          id: cat.id,
          name: cat.name,
          icon: defaultIcons[cat.name] || Radio, // Asigna un icono por defecto si no existe
        })),
      });
    } catch (error) {
      console.error("Error al cargar categorías:", error);
    }
  },
  addCategory: async (name) => {
    try {
      const newCat = await createCategory(name);
      set((state) => ({
        categories: [
          ...state.categories,
          {
            id: newCat.id,
            name: newCat.name,
            icon: defaultIcons[newCat.name] || Radio,
          },
        ],
      }));
    } catch (error) {
      console.error("Error al agregar categoría:", error);
    }
  },
  updateCategory: async (updatedCat) => {
    try {
      const cat = await updateCategory({
        id: updatedCat.id,
        name: updatedCat.name,
      });
      set((state) => ({
        categories: state.categories.map((c) =>
          c.id === cat.id
            ? {
                id: cat.id,
                name: cat.name,
                icon: defaultIcons[cat.name] || Radio,
              }
            : c
        ),
      }));
    } catch (error) {
      console.error("Error al actualizar categoría:", error);
    }
  },
  deleteCategory: async (id) => {
    try {
      await deleteCategory(id);
      set((state) => ({
        categories: state.categories.filter((c) => c.id !== id),
      }));
    } catch (error) {
      console.error("Error al eliminar categoría:", error);
    }
  },
}));
