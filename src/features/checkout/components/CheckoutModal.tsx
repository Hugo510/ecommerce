import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useCartStore } from '../../cart/store/cartStore';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function CheckoutModal({ isOpen, onClose }: CheckoutModalProps) {
  const { items, total, clearCart } = useCartStore();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    country: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically handle the payment processing
    alert('Order placed successfully!');
    clearCart();
    onClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center overflow-y-auto py-10">
      <div className="bg-white w-full max-w-2xl mx-4 rounded-3xl">
        <div className="flex items-center justify-between p-6 border-b border-black/[0.05]">
          <h2 className="text-2xl font-bold">Checkout</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-black/[0.03] rounded-xl transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-6">
              <h3 className="text-lg font-medium">Shipping Information</h3>
              <div>
                <label className="block text-sm font-medium mb-2">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-black/[0.02] border-0 focus:outline-none focus:ring-2 focus:ring-black/10"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-black/[0.02] border-0 focus:outline-none focus:ring-2 focus:ring-black/10"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-black/[0.02] border-0 focus:outline-none focus:ring-2 focus:ring-black/10"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">City</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-black/[0.02] border-0 focus:outline-none focus:ring-2 focus:ring-black/10"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Country</label>
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-black/[0.02] border-0 focus:outline-none focus:ring-2 focus:ring-black/10"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-lg font-medium">Payment Information</h3>
              <div>
                <label className="block text-sm font-medium mb-2">Card Number</label>
                <input
                  type="text"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleChange}
                  placeholder="1234 5678 9012 3456"
                  className="w-full px-4 py-3 rounded-xl bg-black/[0.02] border-0 focus:outline-none focus:ring-2 focus:ring-black/10"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Expiry Date</label>
                  <input
                    type="text"
                    name="expiryDate"
                    value={formData.expiryDate}
                    onChange={handleChange}
                    placeholder="MM/YY"
                    className="w-full px-4 py-3 rounded-xl bg-black/[0.02] border-0 focus:outline-none focus:ring-2 focus:ring-black/10"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">CVV</label>
                  <input
                    type="text"
                    name="cvv"
                    value={formData.cvv}
                    onChange={handleChange}
                    placeholder="123"
                    className="w-full px-4 py-3 rounded-xl bg-black/[0.02] border-0 focus:outline-none focus:ring-2 focus:ring-black/10"
                    required
                  />
                </div>
              </div>

              <div className="mt-6 p-4 bg-black/[0.02] rounded-xl space-y-3">
                <h4 className="font-medium">Order Summary</h4>
                {items.map((item) => (
                  <div key={item.product.id} className="flex justify-between text-sm">
                    <span>{item.product.name} × {item.quantity}</span>
                    <span>${(item.product.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
                <div className="border-t border-black/10 pt-3 flex justify-between font-medium">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-4 rounded-2xl font-medium hover:bg-black/90 transition-colors"
          >
            Place Order
          </button>
        </form>
      </div>
    </div>
  );
}

export default CheckoutModal