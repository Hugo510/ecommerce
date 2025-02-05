/* import React from 'react'; */
import { Package } from 'lucide-react';
import { useOrderStore } from '../store/orderStore';

function OrderHistory() {
  const { orders } = useOrderStore();

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold">Order History</h2>

      {orders.length === 0 ? (
        <div className="text-center py-12 bg-black/[0.02] rounded-3xl">
          <Package size={48} className="mx-auto mb-4 text-zinc-400" />
          <p className="text-zinc-600">No orders yet</p>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="bg-white rounded-3xl p-6 space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-black/[0.05]">
                <div>
                  <p className="text-sm text-zinc-500">Order #{order.id}</p>
                  <p className="text-sm text-zinc-500">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${order.status === 'delivered'
                      ? 'bg-green-100 text-green-800'
                      : order.status === 'shipped'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                  <span className="font-medium">${order.total.toFixed(2)}</span>
                </div>
              </div>

              <div className="space-y-4">
                {order.items.map((item) => (
                  <div key={item.product.id} className="flex items-center space-x-4">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-16 h-16 object-cover rounded-xl"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium">{item.product.name}</h4>
                      <p className="text-sm text-zinc-500">
                        Quantity: {item.quantity}
                      </p>
                    </div>
                    <p className="font-medium">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              {order.status === 'shipped' && (
                <div className="pt-4 border-t border-black/[0.05]">
                  <p className="text-sm text-zinc-500">
                    Tracking Number: {order.trackingNumber}
                  </p>
                  <p className="text-sm text-zinc-500">
                    Estimated Delivery: {order.estimatedDelivery}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default OrderHistory;