import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({
  timestamps: true,
  indexes: [
    { name: "text", description: "text" },
    { price: 1 },
    { category: 1 },
    { stock: 1 },
    { createdAt: -1 },
  ],
})
export class Product extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true, min: 0 })
  price: number;

  @Prop({ required: true, min: 0 })
  stock: number;

  @Prop({ required: true })
  category: string;

  @Prop([String])
  images: string[];
}

export const ProductSchema = SchemaFactory.createForClass(Product);

// Índices compuestos para búsquedas frecuentes
ProductSchema.index({ category: 1, price: 1 });
ProductSchema.index({ category: 1, stock: 1 });
