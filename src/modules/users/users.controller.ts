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
import { Public } from "../auth/decorators/public.decorator"; // Importar decorador Public
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./schemas/user.schema";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /**
   * Crea un nuevo usuario.
   * @param {CreateUserDto} createUserDto - Datos para crear el usuario.
   * @returns {Promise<User>} Usuario creado.
   */
  @Public() // Marca este endpoint como público
  @Post()
  create(
    @Body(new ValidationPipe({ whitelist: true }))
    createUserDto: CreateUserDto
  ): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  /**
   * Obtiene la lista de usuarios.
   * @returns {Promise<User[]>} Lista de usuarios.
   */
  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  /**
   * Obtiene un usuario por su ID.
   * @param {string} id - Identificador del usuario.
   * @returns {Promise<User>} Usuario encontrado.
   */
  @Get(":id")
  findOne(@Param("id") id: string): Promise<User> {
    return this.usersService.findOne(id);
  }

  /**
   * Actualiza un usuario existente.
   * @param {string} id - Identificador del usuario.
   * @param {UpdateUserDto} updateUserDto - Datos para la actualización.
   * @returns {Promise<User>} Usuario actualizado.
   */
  @Put(":id")
  update(
    @Param("id") id: string,
    @Body(new ValidationPipe({ whitelist: true })) updateUserDto: UpdateUserDto
  ): Promise<User> {
    return this.usersService.update(id, updateUserDto);
  }

  /**
   * Elimina un usuario.
   * @param {string} id - Identificador del usuario.
   * @returns {Promise<User>}
   */
  @Delete(":id")
  remove(@Param("id") id: string): Promise<User> {
    return this.usersService.remove(id);
  }
}
