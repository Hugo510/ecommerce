import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Review } from "../interfaces/review.interface";

@Schema({
  timestamps: true,
})
export class ReviewModel {
  @Prop({ required: true, ref: "User" })
  user: string;

  @Prop({ required: true, ref: "Product" })
  product: string;

  @Prop({ required: true, min: 1, max: 5 })
  rating: number;

  @Prop({ required: true })
  comment: string;

  @Prop({ required: true })
  isVerifiedPurchase: boolean;
}

export const ReviewSchema = SchemaFactory.createForClass(ReviewModel);
