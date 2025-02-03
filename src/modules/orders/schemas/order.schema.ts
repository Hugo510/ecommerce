import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as MongooseSchema } from "mongoose";

@Schema({
  timestamps: true,
  indexes: [{ user: 1 }, { status: 1 }, { createdAt: -1 }],
})
export class Order extends Document {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: "User", required: true })
  user: MongooseSchema.Types.ObjectId;

  @Prop([
    {
      product: { type: MongooseSchema.Types.ObjectId, ref: "Product" },
      quantity: { type: Number, required: true, min: 1 },
    },
  ])
  products: Array<{
    product: MongooseSchema.Types.ObjectId;
    quantity: number;
  }>;

  @Prop({ required: true, min: 0 })
  totalPrice: number;

  @Prop({
    type: String,
    enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
    default: "pending",
  })
  status: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);

// Índices compuestos para consultas frecuentes
OrderSchema.index({ user: 1, status: 1 });
OrderSchema.index({ user: 1, createdAt: -1 });
