import {
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  Min,
  IsEnum,
  IsString,
} from "class-validator";

export class CreatePaymentDto {
  @IsMongoId()
  order: string;

  @IsNumber()
  @Min(0)
  amount: number;

  @IsEnum(["pending", "completed", "failed", "refunded"], {
    message: "El estado debe ser: pending, completed, failed o refunded",
  })
  status: "pending" | "completed" | "failed" | "refunded";

  @IsEnum(["credit_card", "paypal", "stripe"], {
    message: "El método de pago debe ser: credit_card, paypal o stripe",
  })
  paymentMethod: "credit_card" | "paypal" | "stripe";

  @IsString()
  @IsNotEmpty()
  transactionId: string;
}
