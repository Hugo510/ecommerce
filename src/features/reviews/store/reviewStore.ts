import { create } from "zustand";
import {
  addReview as addReviewAPI /*, fetchReviews as fetchReviewsAPI */,
} from "../services/reviewService";

export interface Review {
  id: string;
  productId: number;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

interface ReviewState {
  reviews: Review[];
  // loadReviews?: () => Promise<void>; // Opcional
  addReview: (review: Omit<Review, "id">) => Promise<void>;
}

export const useReviewStore = create<ReviewState>((set) => ({
  reviews: [],
  // loadReviews: async () => {
  //   try {
  //     const reviews = await fetchReviewsAPI();
  //     set({ reviews });
  //   } catch (error) {
  //     console.error("Error al cargar reseñas:", error);
  //   }
  // },
  addReview: async (review) => {
    try {
      const newReview = await addReviewAPI(review);
      set((state) => ({
        reviews: [...state.reviews, newReview],
      }));
    } catch (error) {
      console.error("Error al agregar reseña:", error);
    }
  },
}));
