import React, { useState } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { useProductStore } from '../../../products/store/productStore';
import type { Product } from '../../../products/store/productStore';

interface ProductFormData {
  name: string;
  description: string;
  price: string;
  stock: string;
  category: string;
  image: string;
}

function ProductsTable() {
  const [isEditing, setIsEditing] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    description: '',
    price: '',
    stock: '',
    category: '',
    image: '',
  });

  const { products, addProduct, updateProduct, deleteProduct } = useProductStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const productData = {
      name: formData.name,
      description: formData.description,
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock),
      category: formData.category,
      image: formData.image,
    };

    if (editingProduct) {
      updateProduct({ ...editingProduct, ...productData });
    } else {
      addProduct(productData);
    }
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      price: '',
      stock: '',
      category: '',
      image: '',
    });
    setIsEditing(false);
    setEditingProduct(null);
  };

  const startEdit = (product: Product) => {
    setIsEditing(true);
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description || '',
      price: product.price.toString(),
      stock: product.stock?.toString() || '0',
      category: product.category,
      image: product.image,
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Products Management</h2>
        <button
          onClick={() => setIsEditing(true)}
          className="flex items-center space-x-2 bg-black text-white px-4 py-2 rounded-xl hover:bg-black/90 transition-colors"
        >
          <Plus size={20} />
          <span>Add Product</span>
        </button>
      </div>

      {isEditing && (
        <form onSubmit={handleSubmit} className="mb-8 bg-zinc-50 p-6 rounded-2xl">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 rounded-xl border-zinc-200 focus:ring-black focus:border-black"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Category</label>
              <input
                type="text"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-2 rounded-xl border-zinc-200 focus:ring-black focus:border-black"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Price</label>
              <input
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full px-4 py-2 rounded-xl border-zinc-200 focus:ring-black focus:border-black"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Stock</label>
              <input
                type="number"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                className="w-full px-4 py-2 rounded-xl border-zinc-200 focus:ring-black focus:border-black"
                required
              />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium mb-2">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-2 rounded-xl border-zinc-200 focus:ring-black focus:border-black"
                rows={3}
                required
              />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium mb-2">Image URL</label>
              <input
                type="url"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                className="w-full px-4 py-2 rounded-xl border-zinc-200 focus:ring-black focus:border-black"
                required
              />
            </div>
          </div>
          <div className="flex justify-end space-x-4 mt-6">
            <button
              type="button"
              onClick={resetForm}
              className="px-4 py-2 text-sm text-zinc-600 hover:text-zinc-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-black text-white rounded-xl hover:bg-black/90"
            >
              {editingProduct ? 'Update' : 'Add'} Product
            </button>
          </div>
        </form>
      )}

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-zinc-200">
              <th className="text-left py-4 px-4 text-sm font-medium text-zinc-500">Image</th>
              <th className="text-left py-4 px-4 text-sm font-medium text-zinc-500">Name</th>
              <th className="text-left py-4 px-4 text-sm font-medium text-zinc-500">Category</th>
              <th className="text-left py-4 px-4 text-sm font-medium text-zinc-500">Price</th>
              <th className="text-left py-4 px-4 text-sm font-medium text-zinc-500">Stock</th>
              <th className="text-right py-4 px-4 text-sm font-medium text-zinc-500">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-b border-zinc-100">
                <td className="py-4 px-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded-xl"
                  />
                </td>
                <td className="py-4 px-4">{product.name}</td>
                <td className="py-4 px-4">
                  <span className="inline-block px-3 py-1 bg-zinc-100 text-zinc-800 rounded-full text-xs font-medium">
                    {product.category}
                  </span>
                </td>
                <td className="py-4 px-4">${product.price.toFixed(2)}</td>
                <td className="py-4 px-4">{product.stock}</td>
                <td className="py-4 px-4">
                  <div className="flex justify-end space-x-2">
                    <button
                      onClick={() => startEdit(product)}
                      className="p-2 hover:bg-zinc-100 rounded-xl transition-colors"
                    >
                      <Pencil size={18} />
                    </button>
                    <button
                      onClick={() => deleteProduct(product.id)}
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

export default ProductsTable;