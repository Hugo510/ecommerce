import {
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  Min,
  Max,
  IsBoolean,
  IsString,
} from "class-validator";

export class CreateReviewDto {
  @IsMongoId()
  user: string;

  @IsMongoId()
  product: string;

  @IsNumber()
  @Min(1)
  @Max(5)
  rating: number;

  @IsString()
  @IsNotEmpty()
  comment: string;

  @IsBoolean()
  isVerifiedPurchase: boolean;
}
