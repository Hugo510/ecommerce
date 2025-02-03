import {
  IsString,
  IsNumber,
  IsArray,
  Min,
  MaxLength,
  IsUrl,
} from "class-validator";

export class CreateProductDto {
  @IsString()
  @MaxLength(100)
  name: string;

  @IsString()
  @MaxLength(1000)
  description: string;

  @IsNumber()
  @Min(0)
  price: number;

  @IsNumber()
  @Min(0)
  stock: number;

  @IsString()
  category: string;

  @IsArray()
  @IsUrl({}, { each: true })
  images: string[];
}
