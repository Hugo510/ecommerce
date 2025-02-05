import React from 'react';
import { Trash2 } from 'lucide-react';
import { useCartStore } from '../../../cart/store/cartStore';

function CartsTable() {
  const { items, removeItem } = useCartStore();

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Active Carts</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-zinc-200">
              <th className="text-left py-4 px-4 text-sm font-medium text-zinc-500">User</th>
              <th className="text-left py-4 px-4 text-sm font-medium text-zinc-500">Product</th>
              <th className="text-left py-4 px-4 text-sm font-medium text-zinc-500">Quantity</th>
              <th className="text-left py-4 px-4 text-sm font-medium text-zinc-500">Total</th>
              <th className="text-right py-4 px-4 text-sm font-medium text-zinc-500">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.product.id} className="border-b border-zinc-100">
                <td className="py-4 px-4">User ID</td>
                <td className="py-4 px-4">
                  <div className="flex items-center space-x-3">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-12 h-12 object-cover rounded-lg"
                    />
                    <span>{item.product.name}</span>
                  </div>
                </td>
                <td className="py-4 px-4">{item.quantity}</td>
                <td className="py-4 px-4">
                  ${(item.product.price * item.quantity).toFixed(2)}
                </td>
                <td className="py-4 px-4">
                  <div className="flex justify-end">
                    <button
                      onClick={() => removeItem(item.product.id)}
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

export default CartsTable;