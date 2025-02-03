import { Document, Types } from "mongoose";

// Interface para representar reseñas de productos.
// Nota: rating se espera que tenga un valor entre 1 y 5.
export interface Review extends Document {
  readonly user: Types.ObjectId;
  readonly product: Types.ObjectId;
  readonly rating: number; // Valor entre 1 y 5
  readonly comment: string;
  readonly isVerifiedPurchase: boolean;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}
