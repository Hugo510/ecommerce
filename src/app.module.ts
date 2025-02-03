import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { LoggerModule } from "nestjs-pino";
import configuration from "./config/configuration";
// Ajuste de imports: especificar rutas completas para cada módulo
import { AuthModule } from "./modules/auth/auth.module";
import { UsersModule } from "./modules/users/users.module";
import { ProductsModule } from "./modules/products/products.module";
import { OrdersModule } from "./modules/orders/orders.module";
import { ReviewsModule } from "./modules/reviews/reviews.module";
import { PaymentsModule } from "./modules/payments/payments.module";
import { APP_INTERCEPTOR, APP_GUARD } from "@nestjs/core";
import { LoggingInterceptor } from "./common/interceptors/logging.interceptor";
import { JwtAuthGuard } from "./modules/auth/guards/jwt-auth.guard";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
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
    ReviewsModule, // Nuevo módulo para reseñas
    PaymentsModule, // Nuevo módulo para pagos
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
