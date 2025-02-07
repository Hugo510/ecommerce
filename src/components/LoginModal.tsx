import React, { useState } from "react";
import { X } from "lucide-react";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (email: string, password: string) => void;
}

function LoginModal({ isOpen, onClose, onLogin }: LoginModalProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // onLogin(email, password);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-white rounded-3xl p-8 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-2 hover:bg-black/[0.03] rounded-xl transition-colors"
        >
          <X size={20} />
        </button>
        <h2 className="text-2xl font-bold mb-6">Admin Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-black/[0.02] border-0 focus:outline-none focus:ring-2 focus:ring-black/10"
                // required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-black/[0.02] border-0 focus:outline-none focus:ring-2 focus:ring-black/10"
                // required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-black text-white py-3 rounded-xl font-medium hover:bg-black/90 transition-colors"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginModal;
