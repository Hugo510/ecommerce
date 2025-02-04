import React from 'react';
import { Sliders } from 'lucide-react';
import { useProductStore } from '../store/productStore';

function ProductFilters() {
  const { filters, updateFilters } = useProductStore();

  return (
    <div className="bg-white rounded-3xl p-6 space-y-6">
      <div className="flex items-center space-x-2">
        <Sliders size={20} />
        <h3 className="text-lg font-medium">Filters</h3>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Price Range</label>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="number"
              placeholder="Min"
              value={filters.minPrice}
              onChange={(e) => updateFilters({ minPrice: Number(e.target.value) })}
              className="w-full px-4 py-2 rounded-xl bg-black/[0.02] border-0 focus:outline-none focus:ring-2 focus:ring-black/10"
            />
            <input
              type="number"
              placeholder="Max"
              value={filters.maxPrice}
              onChange={(e) => updateFilters({ maxPrice: Number(e.target.value) })}
              className="w-full px-4 py-2 rounded-xl bg-black/[0.02] border-0 focus:outline-none focus:ring-2 focus:ring-black/10"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Category</label>
          <select
            value={filters.category}
            onChange={(e) => updateFilters({ category: e.target.value })}
            className="w-full px-4 py-2 rounded-xl bg-black/[0.02] border-0 focus:outline-none focus:ring-2 focus:ring-black/10"
          >
            <option value="">All Categories</option>
            <option value="Guitars">Guitars</option>
            <option value="Pianos">Pianos</option>
            <option value="Audio">Audio</option>
            <option value="Microphones">Microphones</option>
            <option value="Accessories">Accessories</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Sort By</label>
          <select
            value={filters.sortBy}
            onChange={(e) => updateFilters({ sortBy: e.target.value })}
            className="w-full px-4 py-2 rounded-xl bg-black/[0.02] border-0 focus:outline-none focus:ring-2 focus:ring-black/10"
          >
            <option value="newest">Newest</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="popular">Most Popular</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>
      </div>

      <button
        onClick={() => updateFilters({ 
          minPrice: undefined,
          maxPrice: undefined,
          category: '',
          sortBy: 'newest'
        })}
        className="w-full px-4 py-2 text-sm bg-black/[0.02] hover:bg-black/[0.05] rounded-xl transition-colors"
      >
        Clear Filters
      </button>
    </div>
  );
}

export default ProductFilters;