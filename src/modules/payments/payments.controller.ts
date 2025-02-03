import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  ValidationPipe,
} from "@nestjs/common";
import { PaymentsService } from "./payments.service";
import { CreatePaymentDto } from "./dto/create-payment.dto";
import { UpdatePaymentDto } from "./dto/update-payment.dto";
import { Payment } from "./interfaces/payment.interface";

@Controller("payments")
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post()
  create(
    @Body(new ValidationPipe({ whitelist: true }))
    createPaymentDto: CreatePaymentDto
  ): Promise<Payment> {
    return this.paymentsService.create(createPaymentDto);
  }

  @Get()
  findAll(): Promise<Payment[]> {
    return this.paymentsService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string): Promise<Payment> {
    return this.paymentsService.findOne(id);
  }

  @Put(":id")
  update(
    @Param("id") id: string,
    @Body(new ValidationPipe({ whitelist: true }))
    updatePaymentDto: UpdatePaymentDto
  ): Promise<Payment> {
    return this.paymentsService.update(id, updatePaymentDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string): Promise<Payment> {
    return this.paymentsService.remove(id);
  }
}
