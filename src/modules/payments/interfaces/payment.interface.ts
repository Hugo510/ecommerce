import { Document, Types } from "mongoose";

// Interface para representar pagos.
// paymentMethod se limita a los métodos soportados actualmente.
export interface Payment extends Document {
  readonly order: Types.ObjectId;
  readonly amount: number;
  readonly status: "pending" | "completed" | "failed" | "refunded";
  readonly paymentMethod: "credit_card" | "paypal" | "stripe";
  readonly transactionId: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}
