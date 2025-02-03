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
  @Prop({
    required: true,
    trim: true,
    maxlength: 200,
    validate: {
      validator: (name: string) => name.length >= 3,
      message: "El nombre del producto debe tener al menos 3 caracteres",
    },
  })
  name: string;

  @Prop({
    required: true,
    trim: true,
    minlength: 10,
    maxlength: 2000,
  })
  description: string;

  @Prop({
    required: true,
    min: 0,
    max: 999999.99,
    get: (v: number) => Math.round(v * 100) / 100,
  })
  price: number;

  @Prop({ required: true, min: 0 })
  stock: number;

  @Prop({ required: true })
  category: string;

  @Prop({
    required: true,
    validate: {
      validator: function (images: string[]) {
        return images.every((url) =>
          /^https?:\/\/.+\.(jpg|jpeg|png|webp)$/i.test(url)
        );
      },
      message: "Las URLs de las imágenes deben ser válidas",
    },
  })
  images: string[];

  @Prop({ type: Number, default: 0 })
  averageRating: number;

  @Prop({ type: Number, default: 0 })
  reviewCount: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);

// Índices compuestos para búsquedas frecuentes
ProductSchema.index({ category: 1, price: 1 });
ProductSchema.index({ category: 1, stock: 1 });
