import React from 'react';
import { Trash2 } from 'lucide-react';
import { useReviewStore } from '../../../reviews/store/reviewStore';

function ReviewsTable() {
  const { reviews, deleteReview } = useReviewStore();

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Reviews Management</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-zinc-200">
              <th className="text-left py-4 px-4 text-sm font-medium text-zinc-500">User</th>
              <th className="text-left py-4 px-4 text-sm font-medium text-zinc-500">Product</th>
              <th className="text-left py-4 px-4 text-sm font-medium text-zinc-500">Rating</th>
              <th className="text-left py-4 px-4 text-sm font-medium text-zinc-500">Comment</th>
              <th className="text-left py-4 px-4 text-sm font-medium text-zinc-500">Created At</th>
              <th className="text-right py-4 px-4 text-sm font-medium text-zinc-500">Actions</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map((review) => (
              <tr key={review.id} className="border-b border-zinc-100">
                <td className="py-4 px-4">{review.userName}</td>
                <td className="py-4 px-4">{review.productId}</td>
                <td className="py-4 px-4">
                  <div className="flex items-center">
                    <span className="text-yellow-400">{'★'.repeat(review.rating)}</span>
                    <span className="text-zinc-200">{'★'.repeat(5 - review.rating)}</span>
                  </div>
                </td>
                <td className="py-4 px-4">{review.comment}</td>
                <td className="py-4 px-4 text-zinc-500">
                  {new Date(review.createdAt).toLocaleDateString()}
                </td>
                <td className="py-4 px-4">
                  <div className="flex justify-end">
                    <button
                      onClick={() => deleteReview(review.id)}
                      className="p-2 hover:bg-red-50 text-red-600 rounded-xl transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ReviewsTable;