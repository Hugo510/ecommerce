import { Injectable, NotFoundException, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Order } from "./interfaces/order.interface";
import { CreateOrderDto } from "./dto/create-order.dto";
import { UpdateOrderDto } from "./dto/update-order.dto";
import { Order as OrderModel } from "./schemas/order.schema";

@Injectable()
export class OrdersService {
  private readonly logger = new Logger(OrdersService.name);

  constructor(@InjectModel(OrderModel.name) private orderModel: Model<Order>) {}

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    this.logger.log("Creando nueva orden");
    const order = new this.orderModel(createOrderDto);
    // Posible cálculo o validación adicional antes de guardar
    return order.save();
  }

  async findAll(): Promise<Order[]> {
    this.logger.log("Obteniendo todas las órdenes");
    return this.orderModel.find().exec();
  }

  async findOne(id: string): Promise<Order> {
    const order = await this.orderModel.findById(id).exec();
    if (!order) {
      this.logger.warn(`Orden no encontrada con id: ${id}`);
      throw new NotFoundException("Orden no encontrada");
    }
    return order;
  }

  async update(id: string, updateOrderDto: UpdateOrderDto): Promise<Order> {
    const updatedOrder = await this.orderModel
      .findByIdAndUpdate(id, updateOrderDto, { new: true })
      .exec();
    if (!updatedOrder) {
      this.logger.warn(`Orden no encontrada para actualizar: ${id}`);
      throw new NotFoundException("Orden no encontrada");
    }
    this.logger.log(`Orden actualizada: ${id}`);
    return updatedOrder;
  }

  async remove(id: string): Promise<Order> {
    const deletedOrder = await this.orderModel.findByIdAndDelete(id).exec();
    if (!deletedOrder) {
      this.logger.warn(`Orden no encontrada para eliminar: ${id}`);
      throw new NotFoundException("Orden no encontrada");
    }
    this.logger.log(`Orden eliminada: ${id}`);
    return deletedOrder;
  }
}
