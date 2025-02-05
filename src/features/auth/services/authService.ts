import axiosInstance from "../../../api/axios";

export interface AuthResponse {
  token: string;
  user: any; // Se puede tipar más adelante si es necesario
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
