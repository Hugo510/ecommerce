import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { useCartStore } from '../../cart/store/cartStore';
import type { Product } from '../store/productStore';

interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    addItem(product, 1);
  };

  return (
    <div className="group relative bg-white rounded-3xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-black/[0.1]">
      <div className="absolute inset-0 bg-gradient-to-b from-black/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative h-72 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-500">
          <div className="absolute inset-0 flex items-center justify-center">
            <button className="px-8 py-4 bg-white text-black rounded-2xl text-sm font-medium transform -translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
              Quick View
            </button>
          </div>
        </div>
      </div>
      <div className="relative p-8">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm text-zinc-500 font-medium">{product.category}</span>
          <span className="text-sm bg-black/[0.03] px-4 py-1.5 rounded-full text-black font-medium">New Arrival</span>
        </div>
        <h3 className="text-xl font-medium text-black mb-4">{product.name}</h3>
        <div className="flex items-center justify-between">
          <p className="text-2xl font-bold text-black">${product.price}</p>
          <button
            onClick={handleAddToCart}
            className="group/btn p-4 bg-black text-white rounded-2xl hover:scale-105 transition-all duration-300"
          >
            <ShoppingCart size={20} className="transition-transform duration-300 group-hover/btn:scale-110" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard