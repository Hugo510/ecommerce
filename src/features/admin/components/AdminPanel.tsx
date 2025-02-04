import React, { useState } from 'react';
import { Plus, Pencil, Trash2, AlertCircle } from 'lucide-react';
import { useProductStore } from '../../products/store/productStore';
import { usePermission } from '../../auth/hooks/usePermission';
import type { Product } from '../../products/store/productStore';

function AdminPanel() {
  const { products, addProduct, updateProduct, deleteProduct } = useProductStore();
  const [isEditing, setIsEditing] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    image: '',
    category: ''
  });

  const canCreate = usePermission('create', 'products');
  const canUpdate = usePermission('update', 'products');
  const canDelete = usePermission('delete', 'products');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProduct) {
      if (!canUpdate) {
        alert('You do not have permission to update products');
        return;
      }
      updateProduct({
        ...editingProduct,
        name: formData.name,
        price: parseFloat(formData.price),
        image: formData.image,
        category: formData.category
      });
    } else {
      if (!canCreate) {
        alert('You do not have permission to create products');
        return;
      }
      addProduct({
        name: formData.name,
        price: parseFloat(formData.price),
        image: formData.image,
        category: formData.category
      });
    }
    resetForm();
  };

  const resetForm = () => {
    setFormData({ name: '', price: '', image: '', category: '' });
    setIsEditing(false);
    setEditingProduct(null);
  };

  const startEdit = (product: Product) => {
    if (!canUpdate) {
      alert('You do not have permission to update products');
      return;
    }
    setIsEditing(true);
    setEditingProduct(product);
    setFormData({
      name: product.name,
      price: product.price.toString(),
      image: product.image,
      category: product.category
    });
  };

  const handleDelete = (id: number) => {
    if (!canDelete) {
      alert('You do not have permission to delete products');
      return;
    }
    deleteProduct(id);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="bg-white rounded-3xl p-8 shadow-xl shadow-black/5">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">Product Management</h2>
          {canCreate && (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center space-x-2 bg-black text-white px-4 py-2 rounded-xl hover:bg-black/90 transition-colors"
            >
              <Plus size={20} />
              <span>Add Product</span>
            </button>
          )}
        </div>

        {isEditing && (
          <form onSubmit={handleSubmit} className="mb-8 bg-black/[0.02] p-6 rounded-2xl">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white border-0 focus:outline-none focus:ring-2 focus:ring-black/10"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Price</label>
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white border-0 focus:outline-none focus:ring-2 focus:ring-black/10"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Image URL</label>
                <input
                  type="url"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white border-0 focus:outline-none focus:ring-2 focus:ring-black/10"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Category</label>
                <input
                  type="text"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white border-0 focus:outline-none focus:ring-2 focus:ring-black/10"
                  required
                />
              </div>
            </div>
            <div className="flex justify-end space-x-4 mt-6">
              <button
                type="button"
                onClick={resetForm}
                className="px-4 py-2 rounded-xl hover:bg-black/[0.03] transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-black text-white px-4 py-2 rounded-xl hover:bg-black/90 transition-colors"
              >
                {editingProduct ? 'Update' : 'Add'} Product
              </button>
            </div>
          </form>
        )}

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-black/[0.1]">
                <th className="text-left py-4 px-4">Image</th>
                <th className="text-left py-4 px-4">Name</th>
                <th className="text-left py-4 px-4">Category</th>
                <th className="text-left py-4 px-4">Price</th>
                <th className="text-right py-4 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-b border-black/[0.05]">
                  <td className="py-4 px-4">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded-xl"
                    />
                  </td>
                  <td className="py-4 px-4">{product.name}</td>
                  <td className="py-4 px-4">{product.category}</td>
                  <td className="py-4 px-4">${product.price}</td>
                  <td className="py-4 px-4">
                    <div className="flex justify-end space-x-2">
                      {canUpdate && (
                        <button
                          onClick={() => startEdit(product)}
                          className="p-2 hover:bg-black/[0.03] rounded-xl transition-colors"
                        >
                          <Pencil size={20} />
                        </button>
                      )}
                      {canDelete && (
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="p-2 hover:bg-red-50 text-red-600 rounded-xl transition-colors"
                        >
                          <Trash2 size={20} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminPanel;