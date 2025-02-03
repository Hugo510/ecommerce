import { Injectable, NotFoundException, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Payment } from "./interfaces/payment.interface";
import { CreatePaymentDto } from "./dto/create-payment.dto";
import { UpdatePaymentDto } from "./dto/update-payment.dto";
import { PaymentModel } from "./schemas/payment.schema";

@Injectable()
export class PaymentsService {
  private readonly logger = new Logger(PaymentsService.name);

  constructor(
    @InjectModel(PaymentModel.name) private paymentModel: Model<Payment>
  ) {}

  async create(createPaymentDto: CreatePaymentDto): Promise<Payment> {
    this.logger.log("Creando nuevo pago");
    const payment = new this.paymentModel(createPaymentDto);
    return payment.save();
  }

  async findAll(): Promise<Payment[]> {
    this.logger.log("Obteniendo todos los pagos");
    return this.paymentModel.find().exec();
  }

  async findOne(id: string): Promise<Payment> {
    const payment = await this.paymentModel.findById(id).exec();
    if (!payment) {
      this.logger.warn(`Pago no encontrado con id: ${id}`);
      throw new NotFoundException("Pago no encontrado");
    }
    return payment;
  }

  async update(
    id: string,
    updatePaymentDto: UpdatePaymentDto
  ): Promise<Payment> {
    const updatedPayment = await this.paymentModel
      .findByIdAndUpdate(id, updatePaymentDto, { new: true })
      .exec();
    if (!updatedPayment) {
      this.logger.warn(`Pago no encontrado para actualizar: ${id}`);
      throw new NotFoundException("Pago no encontrado");
    }
    this.logger.log(`Pago actualizado: ${id}`);
    return updatedPayment;
  }

  async remove(id: string): Promise<Payment> {
    const deletedPayment = await this.paymentModel.findByIdAndDelete(id).exec();
    if (!deletedPayment) {
      this.logger.warn(`Pago no encontrado para eliminar: ${id}`);
      throw new NotFoundException("Pago no encontrado");
    }
    this.logger.log(`Pago eliminado: ${id}`);
    return deletedPayment;
  }
}
