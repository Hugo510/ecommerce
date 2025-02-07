import React, { useState } from "react";
import { X } from "lucide-react";
// import { useAuthStore } from '../store/authStore';

function RegisterModal() {
  // const { isRegisterModalOpen, register, toggleRegisterModal } = useAuthStore();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // if (!isRegisterModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    // register(formData.name, formData.email, formData.password);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-white rounded-3xl p-8 w-full max-w-md relative">
        <button
          // onClick={toggleRegisterModal}
          className="absolute right-4 top-4 p-2 hover:bg-black/[0.03] rounded-xl transition-colors"
        >
          <X size={20} />
        </button>
        <h2 className="text-2xl font-bold mb-6">Create Account</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
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
            <label className="block text-sm font-medium mb-2">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-black/[0.02] border-0 focus:outline-none focus:ring-2 focus:ring-black/10"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-black/[0.02] border-0 focus:outline-none focus:ring-2 focus:ring-black/10"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-xl font-medium hover:bg-black/90 transition-colors"
          >
            Create Account
          </button>
          <p className="text-center text-sm text-zinc-500">
            Already have an account?{" "}
            <button
              type="button"
              // onClick={() => {
              //   toggleRegisterModal();
              //   useAuthStore.getState().toggleLoginModal();
              // }}
              className="text-black hover:underline"
            >
              Sign in
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}

export default RegisterModal;
