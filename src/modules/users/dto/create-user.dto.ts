import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  ValidateNested,
  IsArray,
  IsOptional,
  IsEnum,
  Matches,
} from "class-validator";
import { Type } from "class-transformer";

export class AddressDto {
  @IsString()
  @IsNotEmpty()
  street: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @Matches(/^\d{5}$/, {
    message: "zipCode debe ser un código postal de 5 dígitos",
  })
  zipCode: string;

  @IsOptional()
  isDefault?: boolean;
}

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  password: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AddressDto)
  addresses: AddressDto[];

  @IsOptional()
  @IsEnum(["user", "admin", "seller"])
  role?: "user" | "admin" | "seller";

  // ...otros posibles validadores según requerimientos...
}
