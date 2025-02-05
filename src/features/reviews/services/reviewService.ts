import axiosInstance from "../../../api/axios";

export interface ReviewPayload {
  productId: number;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface ReviewResponse extends ReviewPayload {
  id: string;
}

export const addReview = async (
  review: ReviewPayload
): Promise<ReviewResponse> => {
  const response = await axiosInstance.post("/reviews", review);
  return response.data;
};

export const fetchReviews = async (): Promise<ReviewResponse[]> => {
  const response = await axiosInstance.get("/reviews");
  return response.data;
};
