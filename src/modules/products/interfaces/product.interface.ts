import { Document } from "mongoose";

/**
 * Interfaz para un producto.
 * @property name - Nombre del producto.
 * @property description - Descripción detallada.
 * @property price - Precio del producto.
 * @property stock - Stock disponible.
 * @property category - Categoría del producto.
 * @property images - URLs de las imágenes.
 * @property averageRating - Promedio de valoraciones.
 * @property reviewCount - Número de reseñas.
 */
export interface Product extends Document {
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  images: string[];
  averageRating: number;
  reviewCount: number;
}
