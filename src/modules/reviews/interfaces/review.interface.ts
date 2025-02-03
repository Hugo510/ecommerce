import { Document, Types } from "mongoose";

// Interface para representar reseñas de productos.
export interface Review extends Document {
  readonly user: Types.ObjectId;
  readonly product: Types.ObjectId;
  readonly rating: number;
  readonly comment: string;
  readonly isVerifiedPurchase: boolean;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}
