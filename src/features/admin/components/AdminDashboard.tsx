import React, { useState } from 'react';
import { Users, Package, ShoppingCart, CreditCard, Star, Shield, FileText } from 'lucide-react';
import UsersTable from './tables/UsersTable';
import ProductsTable from './tables/ProductsTable';
import OrdersTable from './tables/OrdersTable';
import CartsTable from './tables/CartsTable';
import PaymentsTable from './tables/PaymentsTable';
import ReviewsTable from './tables/ReviewsTable';
import SecurityLogsTable from './tables/SecurityLogsTable';

type TabType = 'users' | 'products' | 'orders' | 'carts' | 'payments' | 'reviews' | 'security';

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<TabType>('users');

  const tabs = [
    { id: 'users' as TabType, label: 'Users', icon: Users },
    { id: 'products' as TabType, label: 'Products', icon: Package },
    { id: 'orders' as TabType, label: 'Orders', icon: FileText },
    { id: 'carts' as TabType, label: 'Carts', icon: ShoppingCart },
    { id: 'payments' as TabType, label: 'Payments', icon: CreditCard },
    { id: 'reviews' as TabType, label: 'Reviews', icon: Star },
    { id: 'security' as TabType, label: 'Security Logs', icon: Shield },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-50 to-white p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
        
        <div className="bg-white rounded-3xl shadow-xl shadow-black/5 overflow-hidden">
          <div className="border-b border-zinc-200">
            <div className="flex overflow-x-auto">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 px-6 py-4 text-sm font-medium transition-colors ${
                      activeTab === tab.id
                        ? 'text-black border-b-2 border-black'
                        : 'text-zinc-500 hover:text-black hover:bg-zinc-50'
                    }`}
                  >
                    <Icon size={18} />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="p-6">
            {activeTab === 'users' && <UsersTable />}
            {activeTab === 'products' && <ProductsTable />}
            {activeTab === 'orders' && <OrdersTable />}
            {activeTab === 'carts' && <CartsTable />}
            {activeTab === 'payments' && <PaymentsTable />}
            {activeTab === 'reviews' && <ReviewsTable />}
            {activeTab === 'security' && <SecurityLogsTable />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;