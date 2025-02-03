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
import { OrdersService } from "./orders.service";
import { CreateOrderDto } from "./dto/create-order.dto";
import { UpdateOrderDto } from "./dto/update-order.dto";
import { Order } from "./interfaces/order.interface";

@Controller("orders")
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  create(
    @Body(new ValidationPipe({ whitelist: true }))
    createOrderDto: CreateOrderDto
  ): Promise<Order> {
    return this.ordersService.create(createOrderDto);
  }

  @Get()
  findAll(): Promise<Order[]> {
    return this.ordersService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string): Promise<Order> {
    return this.ordersService.findOne(id);
  }

  @Put(":id")
  update(
    @Param("id") id: string,
    @Body(new ValidationPipe({ whitelist: true }))
    updateOrderDto: UpdateOrderDto
  ): Promise<Order> {
    return this.ordersService.update(id, updateOrderDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string): Promise<Order> {
    return this.ordersService.remove(id);
  }
}
