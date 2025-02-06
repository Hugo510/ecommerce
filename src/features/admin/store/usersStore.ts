import { create } from "zustand";
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} from "../services/usersService";

// Definir el tipo de usuario para administración
export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: "admin" | "customer";
  createdAt: string;
  // ...otros campos si es necesario
}

interface UsersState {
  users: AdminUser[];
  fetchUsers: () => Promise<void>;
  addUser: (data: Omit<AdminUser, "id" | "createdAt">) => Promise<void>;
  updateUser: (user: AdminUser) => Promise<void>;
  deleteUser: (id: string) => Promise<void>;
}

export const useUsersStore = create<UsersState>((set) => ({
  users: [],
  fetchUsers: async () => {
    const users = await getUsers();
    set({ users });
  },
  addUser: async (data) => {
    const newUser = await createUser(data);
    set((state) => ({ users: [...state.users, newUser] }));
  },
  updateUser: async (user) => {
    const updated = await updateUser(user);
    set((state) => ({
      users: state.users.map((u) => (u.id === updated.id ? updated : u)),
    }));
  },
  deleteUser: async (id) => {
    await deleteUser(id);
    set((state) => ({ users: state.users.filter((u) => u.id !== id) }));
  },
}));
