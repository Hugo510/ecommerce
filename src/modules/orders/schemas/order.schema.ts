import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as MongooseSchema } from "mongoose";

@Schema({
  timestamps: true,
})
export class Order extends Document {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: "User", required: true })
  user: MongooseSchema.Types.ObjectId;

  @Prop({
    required: true,
    validate: {
      validator: function (products: any[]) {
        return products.length > 0 && products.every((p) => p.quantity > 0);
      },
      message:
        "La orden debe contener al menos un producto con cantidad válida",
    },
  })
  products: Array<{
    product: MongooseSchema.Types.ObjectId;
    quantity: number;
    price: number; // Precio al momento de la compra
  }>;

  @Prop({ required: true, min: 0 })
  totalPrice: number;

  @Prop({
    type: String,
    enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
    default: "pending",
  })
  status: string;

  // Se actualiza para definir explícitamente la estructura del objeto
  @Prop({
    type: {
      street: String,
      city: String,
      zipCode: String,
    },
    required: true,
  })
  shippingAddress: {
    street: string;
    city: string;
    zipCode: string;
  };

  @Prop()
  trackingNumber: string;

  @Prop({ type: Date })
  estimatedDeliveryDate: Date;
}

export const OrderSchema = SchemaFactory.createForClass(Order);

// Definir índices fuera del decorador
OrderSchema.index({ user: 1 });
OrderSchema.index({ status: 1 });
OrderSchema.index({ createdAt: -1 });
OrderSchema.index({ user: 1, status: 1 });
OrderSchema.index({ user: 1, createdAt: -1 });

// Añadir middleware para validación de stock
OrderSchema.pre("save", async function (next) {
  // Aquí iría la lógica de validación de stock
  next();
});
