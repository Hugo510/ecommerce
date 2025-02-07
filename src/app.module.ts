import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { LoggerModule } from "nestjs-pino";
import configuration from "./config/configuration";
import * as Joi from "joi";
import { AuthModule } from "./modules/auth/auth.module";
import { UsersModule } from "./modules/users/users.module";
import { ProductsModule } from "./modules/products/products.module";
import { OrdersModule } from "./modules/orders/orders.module";
import { ReviewsModule } from "./modules/reviews/reviews.module";
import { PaymentsModule } from "./modules/payments/payments.module";
import { APP_INTERCEPTOR, APP_GUARD } from "@nestjs/core";
import { LoggingInterceptor } from "./common/interceptors/logging.interceptor";
import { JwtAuthGuard } from "./modules/auth/guards/jwt-auth.guard";

/**
 * Módulo raíz de la aplicación.
 * Configura la aplicación, incluyendo módulos, configuración global, logging y seguridad.
 */
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      validationSchema: Joi.object({
        PORT: Joi.number().default(3000),
        MONGO_URI: Joi.string().required(),
        JWT_SECRET: Joi.string().required(),
        ALLOWED_ORIGINS: Joi.string().required(),
      }),
    }),
    LoggerModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>("config.database.uri"),
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    UsersModule,
    ProductsModule,
    OrdersModule,
    ReviewsModule, // Módulo para reseñas
    PaymentsModule, // Módulo para pagos
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    // **** MODO VULNERABLE: Se comenta el guard global para desactivar la protección JWT ****
    // {
    //   provide: APP_GUARD,
    //   useClass: JwtAuthGuard,
    // },
  ],
})
export class AppModule {}
