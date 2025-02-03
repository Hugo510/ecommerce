import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsIP,
  IsObject,
} from "class-validator";

export class CreateSecurityLogDto {
  @IsNotEmpty()
  @IsString()
  user: string;

  @IsNotEmpty()
  @IsString()
  @IsEnum([
    "login",
    "logout",
    "password_change",
    "profile_update",
    "order_created",
    "payment_processed",
    "failed_login_attempt",
  ])
  action: string;

  @IsNotEmpty()
  @IsIP()
  ip: string;

  @IsOptional()
  @IsString()
  userAgent?: string;

  @IsNotEmpty()
  @IsString()
  @IsEnum(["success", "failure", "warning", "error"])
  status: string;

  @IsOptional()
  @IsObject()
  metadata?: Record<string, any>;
}
