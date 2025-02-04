import { create } from "zustand";
import axiosInstance from "../../../api/axios";
import { rolePermissions, Permission } from "../types/auth";

export interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "customer"; // Si se amplía, se puede usar el tipo Role importado
  addresses: Address[];
}

export interface Address {
  id: string;
  street: string;
  city: string;
  country: string;
  isDefault: boolean;
}

interface AuthState {
  user: User | null;
  isLoginModalOpen: boolean;
  isRegisterModalOpen: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  toggleLoginModal: () => void;
  toggleRegisterModal: () => void;
  addAddress: (address: Omit<Address, "id">) => void;
  removeAddress: (addressId: string) => void;
  setDefaultAddress: (addressId: string) => void;
  hasPermission: (
    action: Permission["action"],
    resource: Permission["resource"]
  ) => boolean;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isLoginModalOpen: false,
  isRegisterModalOpen: false,
  login: async (email, password) => {
    try {
      // Llamada a la API de login
      const response = await axiosInstance.post("/auth/login", {
        email,
        password,
      });
      // Se espera recibir { token, user } desde el backend
      const { token, user } = response.data;
      localStorage.setItem("token", token);
      set({ user, isLoginModalOpen: false });
    } catch (error) {
      console.error("Error en login:", error);
      // Se puede incorporar manejo de errores (mensajes, notificaciones, etc.)
    }
  },
  register: async (name, email, password) => {
    try {
      // Llamada a la API de registro
      const response = await axiosInstance.post("/auth/register", {
        name,
        email,
        password,
      });
      // Se espera recibir { token, user } desde el backend
      const { token, user } = response.data;
      localStorage.setItem("token", token);
      set({ user, isRegisterModalOpen: false });
    } catch (error) {
      console.error("Error en registro:", error);
    }
  },
  logout: () => {
    localStorage.removeItem("token");
    set({ user: null });
  },
  toggleLoginModal: () =>
    set((state) => ({ isLoginModalOpen: !state.isLoginModalOpen })),
  toggleRegisterModal: () =>
    set((state) => ({ isRegisterModalOpen: !state.isRegisterModalOpen })),
  addAddress: (address) =>
    set((state) => ({
      user: state.user
        ? {
            ...state.user,
            addresses: [
              ...state.user.addresses,
              { ...address, id: Math.random().toString(36).substr(2, 9) },
            ],
          }
        : null,
    })),
  removeAddress: (addressId) =>
    set((state) => ({
      user: state.user
        ? {
            ...state.user,
            addresses: state.user.addresses.filter((a) => a.id !== addressId),
          }
        : null,
    })),
  setDefaultAddress: (addressId) =>
    set((state) => ({
      user: state.user
        ? {
            ...state.user,
            addresses: state.user.addresses.map((a) => ({
              ...a,
              isDefault: a.id === addressId,
            })),
          }
        : null,
    })),
  hasPermission: (action, resource) => {
    const user = get().user;
    if (!user) return false;
    return rolePermissions[user.role].some(
      (perm) => perm.action === action && perm.resource === resource
    );
  },
}));
