import axiosInstance from "../../../api/axios";
import { AdminUser } from "../store/usersStore";

export const getUsers = async (): Promise<AdminUser[]> => {
  const response = await axiosInstance.get("/users");
  return response.data;
};

export const createUser = async (
  data: Omit<AdminUser, "id" | "createdAt">
): Promise<AdminUser> => {
  const response = await axiosInstance.post("/users", data);
  return response.data;
};

export const updateUser = async (user: AdminUser): Promise<AdminUser> => {
  const response = await axiosInstance.put(`/users/${user.id}`, user);
  return response.data;
};

export const deleteUser = async (id: string): Promise<void> => {
  await axiosInstance.delete(`/users/${id}`);
};
