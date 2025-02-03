import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { PaymentModel, PaymentSchema } from "./schemas/payment.schema";
import { PaymentsService } from "./payments.service";
import { PaymentsController } from "./payments.controller";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PaymentModel.name, schema: PaymentSchema },
    ]),
  ],
  controllers: [PaymentsController],
  providers: [PaymentsService],
})
export class PaymentsModule {}
