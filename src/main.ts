import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import { AppModule } from "./app.module";
import helmet from "helmet";
import * as csurf from "csurf";
import { rateLimit } from "express-rate-limit";
import { ConfigService } from "@nestjs/config";
import { Logger } from "nestjs-pino";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  const configService = app.get(ConfigService);

  // Validación global
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  // Seguridad: Helmet con opciones extendidas
  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          // ...otras directivas seguras...
        },
      },
    })
  );
  app.use(csurf());
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000,
      max: 100,
    })
  );

  // Logger
  app.useLogger(app.get(Logger));

  // CORS dinámico según configuración
  app.enableCors({
    origin:
      configService.get<string>("config.security.allowedOrigins")?.split(",") ||
      [],
    credentials: true,
  });

  await app.listen(configService.get<number>("PORT") || 3000);
}
bootstrap();
