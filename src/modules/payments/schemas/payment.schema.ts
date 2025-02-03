import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Payment } from "../interfaces/payment.interface";

@Schema({
  timestamps: true,
})
export class PaymentModel {
  @Prop({ required: true, ref: "Order" })
  order: string;

  @Prop({ required: true, min: 0 })
  amount: number;

  @Prop({
    required: true,
    enum: ["pending", "completed", "failed", "refunded"],
  })
  status: string;

  @Prop({ required: true, enum: ["credit_card", "paypal", "stripe"] })
  paymentMethod: string;

  @Prop({ required: true })
  transactionId: string;
}

export const PaymentSchema = SchemaFactory.createForClass(PaymentModel);
