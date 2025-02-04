import React, { useState } from 'react';
import { Star, StarHalf } from 'lucide-react';
import { useAuthStore } from '../../auth/store/authStore';
import { useReviewStore } from '../store/reviewStore';
import type { Product } from '../../products/store/productStore';

interface ReviewSectionProps {
  product: Product;
}

function ReviewSection({ product }: ReviewSectionProps) {
  const { user } = useAuthStore();
  const { reviews, addReview } = useReviewStore();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const productReviews = reviews.filter(review => review.productId === product.id);
  const averageRating = productReviews.length
    ? productReviews.reduce((acc, review) => acc + review.rating, 0) / productReviews.length
    : 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      alert('Please login to leave a review');
      return;
    }
    addReview({
      productId: product.id,
      userId: user.id,
      userName: user.name,
      rating,
      comment,
      createdAt: new Date().toISOString(),
    });
    setRating(0);
    setComment('');
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold mb-2">Customer Reviews</h3>
          <div className="flex items-center space-x-2">
            <div className="flex text-yellow-400">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={20}
                  fill={star <= averageRating ? 'currentColor' : 'none'}
                />
              ))}
            </div>
            <span className="text-sm text-zinc-500">
              Based on {productReviews.length} reviews
            </span>
          </div>
        </div>
      </div>

      {user && (
        <form onSubmit={handleSubmit} className="bg-black/[0.02] rounded-2xl p-6 space-y-4">
          <h4 className="font-medium">Write a Review</h4>
          <div>
            <label className="block text-sm font-medium mb-2">Rating</label>
            <div className="flex space-x-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className={`text-${star <= rating ? 'yellow' : 'zinc'}-400`}
                >
                  <Star size={24} fill="currentColor" />
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Comment</label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white border-0 focus:outline-none focus:ring-2 focus:ring-black/10"
              rows={4}
              required
            />
          </div>
          <button
            type="submit"
            className="px-6 py-2 bg-black text-white rounded-xl hover:bg-black/90 transition-colors"
          >
            Submit Review
          </button>
        </form>
      )}

      <div className="space-y-6">
        {productReviews.map((review) => (
          <div key={review.id} className="bg-white rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">{review.userName}</p>
                <div className="flex text-yellow-400">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={16}
                      fill={star <= review.rating ? 'currentColor' : 'none'}
                    />
                  ))}
                </div>
              </div>
              <span className="text-sm text-zinc-500">
                {new Date(review.createdAt).toLocaleDateString()}
              </span>
            </div>
            <p className="text-zinc-600">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ReviewSection;