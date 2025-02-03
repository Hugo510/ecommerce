import { Document } from "mongoose";

/**
 * Interfaz para representar una orden.
 * @property user - ID del usuario que realiza la orden.
 * @property products - Lista de productos con cantidad y precio al momento de la compra.
 * @property totalPrice - Total a pagar.
 * @property status - Estado de la orden.
 * @property shippingAddress - Dirección de envío.
 * @property trackingNumber - Número de rastreo (opcional).
 * @property estimatedDeliveryDate - Fecha estimada de entrega (opcional).
 * @property createdAt - Fecha de creación.
 * @property updatedAt - Fecha de última actualización.
 */
export interface Order extends Document {
  user: string;
  products: {
    product: string;
    quantity: number;
    price: number;
  }[];
  totalPrice: number;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  shippingAddress: {
    street: string;
    city: string;
    zipCode: string;
  };
  trackingNumber?: string;
  estimatedDeliveryDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}
