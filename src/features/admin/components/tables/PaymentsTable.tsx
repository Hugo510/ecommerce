import React from 'react';

interface Payment {
  id: string;
  orderId: string;
  status: 'pending' | 'approved' | 'failed';
  method: string;
  amount: number;
  createdAt: string;
}

function PaymentsTable() {
  // This would normally come from a store
  const payments: Payment[] = [];

  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    approved: 'bg-green-100 text-green-800',
    failed: 'bg-red-100 text-red-800',
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Payments Management</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-zinc-200">
              <th className="text-left py-4 px-4 text-sm font-medium text-zinc-500">Payment ID</th>
              <th className="text-left py-4 px-4 text-sm font-medium text-zinc-500">Order ID</th>
              <th className="text-left py-4 px-4 text-sm font-medium text-zinc-500">Method</th>
              <th className="text-left py-4 px-4 text-sm font-medium text-zinc-500">Amount</th>
              <th className="text-left py-4 px-4 text-sm font-medium text-zinc-500">Status</th>
              <th className="text-left py-4 px-4 text-sm font-medium text-zinc-500">Created At</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => (
              <tr key={payment.id} className="border-b border-zinc-100">
                <td className="py-4 px-4">{payment.id}</td>
                <td className="py-4 px-4">{payment.orderId}</td>
                <td className="py-4 px-4">{payment.method}</td>
                <td className="py-4 px-4">${payment.amount.toFixed(2)}</td>
                <td className="py-4 px-4">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                    statusColors[payment.status]
                  }`}>
                    {payment.status}
                  </span>
                </td>
                <td className="py-4 px-4 text-zinc-500">
                  {new Date(payment.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PaymentsTable;