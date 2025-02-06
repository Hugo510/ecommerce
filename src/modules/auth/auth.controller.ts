import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Req,
  ValidationPipe,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";
import { JwtAuthGuard } from "./guards/jwt-auth.guard";
import { Public } from "./decorators/public.decorator";
import { Request } from "express";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post("login")
  async login(@Body(new ValidationPipe()) loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get("profile")
  getProfile(@Req() req) {
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Get("verify")
  verifyToken(@Req() req) {
    const token = req.headers.authorization?.split(" ")[1];
    return this.authService.verifyToken(token);
  }

  // Comentar la ruta CSRF ya que no se está usando CSRF temporalmente
  // @Get("csrf")
  // getCsrfToken(@Req() req: Request): { csrfToken: string } {
  //   return { csrfToken: req.csrfToken() };
  // }
}
