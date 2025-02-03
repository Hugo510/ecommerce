import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  ValidationPipe,
} from "@nestjs/common";
import { ReviewsService } from "./reviews.service";
import { CreateReviewDto } from "./dto/create-review.dto";
import { UpdateReviewDto } from "./dto/update-review.dto";
import { Review } from "./interfaces/review.interface";

@Controller("reviews")
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post()
  create(
    @Body(new ValidationPipe({ whitelist: true }))
    createReviewDto: CreateReviewDto
  ): Promise<Review> {
    return this.reviewsService.create(createReviewDto);
  }

  @Get()
  findAll(): Promise<Review[]> {
    return this.reviewsService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string): Promise<Review> {
    return this.reviewsService.findOne(id);
  }

  @Put(":id")
  update(
    @Param("id") id: string,
    @Body(new ValidationPipe({ whitelist: true }))
    updateReviewDto: UpdateReviewDto
  ): Promise<Review> {
    return this.reviewsService.update(id, updateReviewDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string): Promise<Review> {
    return this.reviewsService.remove(id);
  }
}
