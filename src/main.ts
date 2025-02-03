import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import { AppModule } from "./app.module";
import * as helmet from "helmet";
import * as csurf from "csurf";
import { rateLimit } from "express-rate-limit";
import { ConfigService } from "@nestjs/config";
import { Logger } from "nestjs-pino";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  const configService = app.get(ConfigService);

  // Validación global
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  // Seguridad
  app.use(helmet());
  app.use(csurf());
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutos
      max: 100, // límite de solicitudes por windowMs
    })
  );

  // Logger
  app.useLogger(app.get(Logger));

  // CORS
  app.enableCors({
    origin: configService.get("ALLOWED_ORIGINS").split(","),
    credentials: true,
  });

  await app.listen(configService.get("PORT") || 3000);
}
bootstrap();
