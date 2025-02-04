import React from 'react';
import { ShoppingCart, Search, Menu, Music2, LogOut } from 'lucide-react';

interface NavbarProps {
  onLoginClick: () => void;
  isAdmin: boolean;
}

function Navbar({ onLoginClick, isAdmin }: NavbarProps) {
  return (
    <nav className="bg-white/70 backdrop-blur-2xl sticky top-0 z-50 border-b border-black/[0.03]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-24">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center space-x-3">
              <div className="relative">
                <div className="absolute inset-0 bg-black/10 blur-2xl rounded-full" />
                <Music2 className="relative h-10 w-10 text-black" />
              </div>
              <span className="text-2xl font-bold text-black tracking-tight">HARMONIA</span>
            </div>
          </div>

          <div className="hidden md:block flex-1 max-w-2xl mx-16">
            <div className="relative group">
              <div className="absolute inset-0 bg-black/[0.02] rounded-2xl blur-xl transition-opacity duration-500 opacity-0 group-hover:opacity-100" />
              <input
                type="text"
                placeholder="Search for instruments, brands, or categories..."
                className="w-full pl-14 pr-6 py-4 rounded-2xl bg-black/[0.02] border-0 focus:outline-none focus:ring-0 focus:bg-black/[0.03] transition-all duration-300"
              />
              <Search className="absolute left-5 top-4 h-5 w-5 text-black/40" />
            </div>
          </div>

          <div className="flex items-center space-x-8">
            {!isAdmin && (
              <button className="relative group p-3 rounded-2xl hover:bg-black/[0.03] transition-colors duration-300">
                <ShoppingCart className="h-6 w-6 text-black transition-transform duration-300 group-hover:scale-110" />
                <span className="absolute -top-1 -right-1 bg-black text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  2
                </span>
              </button>
            )}
            {isAdmin ? (
              <button
                onClick={onLoginClick}
                className="flex items-center space-x-2 px-4 py-2 bg-black/[0.03] rounded-xl hover:bg-black/[0.05] transition-colors"
              >
                <LogOut size={20} />
                <span>Logout</span>
              </button>
            ) : (
              <button
                onClick={onLoginClick}
                className="px-4 py-2 bg-black text-white rounded-xl hover:bg-black/90 transition-colors"
              >
                Admin Login
              </button>
            )}
            <button className="md:hidden p-3 rounded-2xl hover:bg-black/[0.03] transition-colors duration-300">
              <Menu className="h-6 w-6 text-black" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;