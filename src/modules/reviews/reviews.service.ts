import { Injectable, NotFoundException, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Review } from "./interfaces/review.interface";
import { CreateReviewDto } from "./dto/create-review.dto";
import { UpdateReviewDto } from "./dto/update-review.dto";
import { ReviewModel } from "./schemas/review.schema";

@Injectable()
export class ReviewsService {
  private readonly logger = new Logger(ReviewsService.name);

  constructor(
    @InjectModel(ReviewModel.name) private reviewModel: Model<Review>
  ) {}

  async create(createReviewDto: CreateReviewDto): Promise<Review> {
    this.logger.log("Creando nueva reseña");
    const review = new this.reviewModel(createReviewDto);
    return review.save();
  }

  async findAll(): Promise<Review[]> {
    this.logger.log("Obteniendo todas las reseñas");
    return this.reviewModel.find().exec();
  }

  async findOne(id: string): Promise<Review> {
    const review = await this.reviewModel.findById(id).exec();
    if (!review) {
      this.logger.warn(`Reseña no encontrada con id: ${id}`);
      throw new NotFoundException("Reseña no encontrada");
    }
    return review;
  }

  async update(id: string, updateReviewDto: UpdateReviewDto): Promise<Review> {
    const updatedReview = await this.reviewModel
      .findByIdAndUpdate(id, updateReviewDto, { new: true })
      .exec();
    if (!updatedReview) {
      this.logger.warn(`No se pudo actualizar, reseña no encontrada: ${id}`);
      throw new NotFoundException("Reseña no encontrada");
    }
    this.logger.log(`Reseña actualizada: ${id}`);
    return updatedReview;
  }

  async remove(id: string): Promise<Review> {
    const deletedReview = await this.reviewModel.findByIdAndDelete(id).exec();
    if (!deletedReview) {
      this.logger.warn(`No se pudo eliminar, reseña no encontrada: ${id}`);
      throw new NotFoundException("Reseña no encontrada");
    }
    this.logger.log(`Reseña eliminada: ${id}`);
    return deletedReview;
  }
}
