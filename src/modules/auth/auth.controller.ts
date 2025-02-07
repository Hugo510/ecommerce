import {
  Controller,
  Post,
  Body,
  Get,
  // UseGuards,  // Puedes comentar o eliminar la importación si no se usa en otros lugares
  Req,
  ValidationPipe,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";
// import { JwtAuthGuard } from "./guards/jwt-auth.guard";
import { Public } from "./decorators/public.decorator";
import { Request } from "express";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // Ruta pública para el login (ya marcada como pública)
  @Public()
  @Post("login")
  async login(@Body(new ValidationPipe()) loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  // **** MODO VULNERABLE: Se comenta la protección JWT para dejar esta ruta sin restricción ****
  // @UseGuards(JwtAuthGuard)
  @Get("profile")
  getProfile(@Req() req) {
    return req.user;
  }

  // **** MODO VULNERABLE: Se comenta la protección JWT para dejar esta ruta sin restricción ****
  // @UseGuards(JwtAuthGuard)
  @Get("verify")
  verifyToken(@Req() req) {
    const token = req.headers.authorization?.split(" ")[1];
    return this.authService.verifyToken(token);
  }

  // Ruta CSRF comentada; se mantendrá desactivada hasta que se decida implementarla nuevamente
  // @Get("csrf")
  // getCsrfToken(@Req() req: Request): { csrfToken: string } {
  //   return { csrfToken: req.csrfToken() };
  // }
}
