import React from 'react';
import { useOrderStore } from '../../../orders/store/orderStore';

function OrdersTable() {
  const { orders, updateOrderStatus } = useOrderStore();

  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    shipped: 'bg-blue-100 text-blue-800',
    delivered: 'bg-green-100 text-green-800',
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Orders Management</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-zinc-200">
              <th className="text-left py-4 px-4 text-sm font-medium text-zinc-500">Order ID</th>
              <th className="text-left py-4 px-4 text-sm font-medium text-zinc-500">User</th>
              <th className="text-left py-4 px-4 text-sm font-medium text-zinc-500">Total</th>
              <th className="text-left py-4 px-4 text-sm font-medium text-zinc-500">Status</th>
              <th className="text-left py-4 px-4 text-sm font-medium text-zinc-500">Created At</th>
              <th className="text-right py-4 px-4 text-sm font-medium text-zinc-500">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b border-zinc-100">
                <td className="py-4 px-4">{order.id}</td>
                <td className="py-4 px-4">{order.userId}</td>
                <td className="py-4 px-4">${order.total.toFixed(2)}</td>
                <td className="py-4 px-4">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                    statusColors[order.status as keyof typeof statusColors]
                  }`}>
                    {order.status}
                  </span>
                </td>
                <td className="py-4 px-4 text-zinc-500">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>
                <td className="py-4 px-4">
                  <div className="flex justify-end">
                    <select
                      value={order.status}
                      onChange={(e) => updateOrderStatus(order.id, e.target.value as any)}
                      className="px-3 py-1 rounded-xl border-zinc-200 focus:ring-black focus:border-black text-sm"
                    >
                      <option value="pending">Pending</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                    </select>
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

export default OrdersTable;