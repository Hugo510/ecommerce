import axiosInstance from "../../../api/axios";

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export const login = async (
  email: string,
  password: string
): Promise<AuthResponse> => {
  // Llamada a la API de login usando axiosInstance
  const response = await axiosInstance.post("/auth/login", { email, password });
  return response.data;
};

export const register = async (
  name: string,
  email: string,
  password: string
): Promise<AuthResponse> => {
  // Llamada a la API de registro usando axiosInstance
  const response = await axiosInstance.post("/auth/register", {
    name,
    email,
    password,
  });
  return response.data;
};
