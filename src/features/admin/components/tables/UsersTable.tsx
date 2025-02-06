import React, { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { useUsersStore, AdminUser } from '../../store/usersStore';

interface UserFormData {
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'customer';
}

function UsersTable() {
  const [isEditing, setIsEditing] = useState(false);
  const [editingUser, setEditingUser] = useState<AdminUser | null>(null);
  const [formData, setFormData] = useState<UserFormData>({
    name: '',
    email: '',
    password: '',
    role: 'customer',
  });

  const { users, fetchUsers, addUser, updateUser, deleteUser } = useUsersStore();

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingUser) {
      await updateUser({ ...editingUser, ...formData, createdAt: editingUser.createdAt });
    } else {
      await addUser(formData);
    }
    resetForm();
  };

  const resetForm = () => {
    setFormData({ name: '', email: '', password: '', role: 'customer' });
    setIsEditing(false);
    setEditingUser(null);
  };

  const startEdit = (user: AdminUser) => {
    setIsEditing(true);
    setEditingUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      password: '',
      role: user.role,
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Users Management</h2>
        <button
          onClick={() => setIsEditing(true)}
          className="flex items-center space-x-2 bg-black text-white px-4 py-2 rounded-xl hover:bg-black/90 transition-colors"
        >
          <Plus size={20} />
          <span>Add User</span>
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
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2 rounded-xl border-zinc-200 focus:ring-black focus:border-black"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full px-4 py-2 rounded-xl border-zinc-200 focus:ring-black focus:border-black"
                required={!editingUser}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Role</label>
              <select
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value as 'admin' | 'customer' })}
                className="w-full px-4 py-2 rounded-xl border-zinc-200 focus:ring-black focus:border-black"
              >
                <option value="customer">Customer</option>
                <option value="admin">Admin</option>
              </select>
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
              {editingUser ? 'Update' : 'Add'} User
            </button>
          </div>
        </form>
      )}

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-zinc-200">
              <th className="text-left py-4 px-4 text-sm font-medium text-zinc-500">Name</th>
              <th className="text-left py-4 px-4 text-sm font-medium text-zinc-500">Email</th>
              <th className="text-left py-4 px-4 text-sm font-medium text-zinc-500">Role</th>
              <th className="text-left py-4 px-4 text-sm font-medium text-zinc-500">Created At</th>
              <th className="text-right py-4 px-4 text-sm font-medium text-zinc-500">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b border-zinc-100">
                <td className="py-4 px-4">{user.name}</td>
                <td className="py-4 px-4">{user.email}</td>
                <td className="py-4 px-4">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                    {user.role}
                  </span>
                </td>
                <td className="py-4 px-4 text-zinc-500">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
                <td className="py-4 px-4">
                  <div className="flex justify-end space-x-2">
                    <button
                      onClick={() => startEdit(user)}
                      className="p-2 hover:bg-zinc-100 rounded-xl transition-colors"
                    >
                      <Pencil size={18} />
                    </button>
                    <button
                      onClick={() => deleteUser(user.id)}
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

export default UsersTable;