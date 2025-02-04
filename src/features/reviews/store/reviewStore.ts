import { create } from 'zustand';

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
  addReview: (review: Omit<Review, 'id'>) => void;
}

export const useReviewStore = create<ReviewState>((set) => ({
  reviews: [],
  addReview: (review) =>
    set((state) => ({
      reviews: [
        ...state.reviews,
        { ...review, id: Math.random().toString(36).substr(2, 9) },
      ],
    })),
}));