import { Injectable, NotFoundException, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Product } from "./interfaces/product.interface";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { Product as ProductModel } from "./schemas/product.schema";

@Injectable()
export class ProductsService {
  private readonly logger = new Logger(ProductsService.name);

  constructor(
    @InjectModel(ProductModel.name) private productModel: Model<Product>
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    this.logger.log("Creando nuevo producto");
    const product = new this.productModel(createProductDto);
    return product.save();
  }

  async findAll(): Promise<Product[]> {
    this.logger.log("Obteniendo todos los productos");
    return this.productModel.find().exec();
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.productModel.findById(id).exec();
    if (!product) {
      this.logger.warn(`Producto no encontrado con id: ${id}`);
      throw new NotFoundException("Producto no encontrado");
    }
    return product;
  }

  async update(
    id: string,
    updateProductDto: UpdateProductDto
  ): Promise<Product> {
    const updatedProduct = await this.productModel
      .findByIdAndUpdate(id, updateProductDto, { new: true })
      .exec();
    if (!updatedProduct) {
      this.logger.warn(`Producto no encontrado para actualizar: ${id}`);
      throw new NotFoundException("Producto no encontrado");
    }
    this.logger.log(`Producto actualizado: ${id}`);
    return updatedProduct;
  }

  async remove(id: string): Promise<Product> {
    const deletedProduct = await this.productModel.findByIdAndDelete(id).exec();
    if (!deletedProduct) {
      this.logger.warn(`Producto no encontrado para eliminar: ${id}`);
      throw new NotFoundException("Producto no encontrado");
    }
    this.logger.log(`Producto eliminado: ${id}`);
    return deletedProduct;
  }
}
