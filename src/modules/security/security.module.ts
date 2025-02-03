import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { SecurityLog, SecurityLogSchema } from "./schemas/security-log.schema";
import { SecurityService } from "./security.service";
import { SecurityController } from "./security.controller";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SecurityLog.name, schema: SecurityLogSchema },
    ]),
  ],
  controllers: [SecurityController],
  providers: [SecurityService],
})
export class SecurityModule {}
