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

  /**
   * Crea una nueva reseña.
   * @param {CreateReviewDto} createReviewDto - Datos para crear la reseña.
   * @returns {Promise<Review>} Reseña creada.
   */
  @Post()
  create(
    @Body(new ValidationPipe({ whitelist: true }))
    createReviewDto: CreateReviewDto
  ): Promise<Review> {
    return this.reviewsService.create(createReviewDto);
  }

  /**
   * Obtiene todas las reseñas.
   * @returns {Promise<Review[]>} Lista de reseñas.
   */
  @Get()
  findAll(): Promise<Review[]> {
    return this.reviewsService.findAll();
  }

  /**
   * Obtiene una reseña por su ID.
   * @param {string} id - Identificador de la reseña.
   * @returns {Promise<Review>} Reseña encontrada.
   */
  @Get(":id")
  findOne(@Param("id") id: string): Promise<Review> {
    return this.reviewsService.findOne(id);
  }

  /**
   * Actualiza una reseña.
   * @param {string} id - Identificador de la reseña.
   * @param {UpdateReviewDto} updateReviewDto - Datos para actualizar la reseña.
   * @returns {Promise<Review>} Reseña actualizada.
   */
  @Put(":id")
  update(
    @Param("id") id: string,
    @Body(new ValidationPipe({ whitelist: true }))
    updateReviewDto: UpdateReviewDto
  ): Promise<Review> {
    return this.reviewsService.update(id, updateReviewDto);
  }

  /**
   * Elimina una reseña.
   * @param {string} id - Identificador de la reseña.
   * @returns {Promise<Review>}
   */
  @Delete(":id")
  remove(@Param("id") id: string): Promise<Review> {
    return this.reviewsService.remove(id);
  }
}
