import { Injectable, UnauthorizedException, Logger } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "../users/users.service";
import { LoginDto } from "./dto/login.dto";
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user.toObject();
      return result;
    }
    return null;
  }

  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto.email, loginDto.password);
    if (!user) {
      this.logger.warn(
        `Intento de inicio de sesión fallido para: ${loginDto.email}`
      );
      throw new UnauthorizedException("Credenciales inválidas");
    }

    const payload = { email: user.email, sub: user._id, role: user.role };

    this.logger.log(`Usuario autenticado exitosamente: ${user.email}`);

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
      },
    };
  }

  verifyToken(token: string) {
    try {
      return this.jwtService.verify(token);
    } catch (error) {
      this.logger.error(
        `Error al verificar token: ${(error as Error).message}`
      );
      throw new UnauthorizedException("Token inválido");
    }
  }
}
