import React, { useState } from 'react';
import { useAuthStore } from './features/auth/store/authStore';
import { useProductStore } from './features/products/store/productStore';
import { useCategoryStore } from './features/categories/store/categoryStore';
import { usePermission } from './features/auth/hooks/usePermission';
import ProductCard from './features/products/components/ProductCard';
import Navbar from './features/layout/components/Navbar';
import Hero from './features/layout/components/Hero';
import LoginModal from './features/auth/components/LoginModal';
import AdminPanel from './features/admin/components/AdminPanel';
import CartModal from './features/cart/components/CartModal';
import CheckoutModal from './features/checkout/components/CheckoutModal';

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  
  // Call all hooks at the top level
  const { user } = useAuthStore();
  const { products } = useProductStore();
  const { categories } = useCategoryStore();
  const canCreateProducts = usePermission('create', 'products');
  const canUpdateProducts = usePermission('update', 'products');
  const canDeleteProducts = usePermission('delete', 'products');

  // Compute this value after all hooks are called
  const canAccessAdmin = canCreateProducts || canUpdateProducts || canDeleteProducts;

  const handleCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-50 to-white">
      <Navbar onCartClick={() => setIsCartOpen(true)} />
      
      {canAccessAdmin ? (
        <AdminPanel />
      ) : (
        <>
          <Hero />
          
          {/* Categories */}
          <div className="max-w-7xl mx-auto px-4 py-24">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
              {categories.map((category, index) => {
                const Icon = category.icon;
                return (
                  <button
                    key={index}
                    className="group relative flex items-center justify-center space-x-3 p-8 bg-white rounded-3xl shadow-lg shadow-black/5 hover:shadow-xl hover:shadow-black/10 transition-all duration-500 overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-black/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative z-10 flex items-center space-x-3">
                      <div className="text-black transition-transform duration-500 group-hover:scale-110">
                        <Icon size={24} />
                      </div>
                      <span className="font-medium text-black">
                        {category.name}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Featured Products */}
          <div className="max-w-7xl mx-auto px-4 py-24">
            <div className="flex items-center justify-between mb-16">
              <div>
                <h2 className="text-4xl font-bold text-black mb-4">Featured Products</h2>
                <p className="text-zinc-600">Discover our curated selection of premium instruments</p>
              </div>
              <a href="#all" className="group flex items-center space-x-2 text-sm font-medium text-black">
                <span>View All Products</span>
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </a>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </>
      )}

      <LoginModal />
      <CartModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onCheckout={handleCheckout}
      />
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
      />
    </div>
  );
}

export default App;