import {
  Injectable,
  NotFoundException,
  Logger,
  OnModuleInit,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "./schemas/user.schema";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

@Injectable()
export class UsersService implements OnModuleInit {
  private readonly logger = new Logger(UsersService.name);

  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async onModuleInit() {
    try {
      await this.userModel.syncIndexes();
      this.logger.log("Índices de usuario sincronizados correctamente");
    } catch (error) {
      this.logger.error("Error al sincronizar índices:", error);
    }
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    this.logger.log("Creando nuevo usuario");
    return createdUser.save();
  }

  async findAll(): Promise<User[]> {
    this.logger.log("Obteniendo todos los usuarios");
    return this.userModel.find().exec();
  }

  async findOne(email: string): Promise<User | null> {
    return this.userModel.findOne({ email });
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const updatedUser = await this.userModel
      .findByIdAndUpdate(id, updateUserDto, { new: true })
      .exec();
    if (!updatedUser) {
      this.logger.warn(`No se pudo actualizar, usuario no encontrado: ${id}`);
      throw new NotFoundException("Usuario no encontrado");
    }
    this.logger.log(`Usuario actualizado: ${id}`);
    return updatedUser;
  }

  async remove(id: string): Promise<User> {
    const deletedUser = await this.userModel.findByIdAndDelete(id).exec();
    if (!deletedUser) {
      this.logger.warn(`No se pudo eliminar, usuario no encontrado: ${id}`);
      throw new NotFoundException("Usuario no encontrado");
    }
    this.logger.log(`Usuario eliminado: ${id}`);
    return deletedUser;
  }
}
