import { Document } from "mongoose";

/**
 * Interfaz para el Usuario.
 * @property email - Correo único del usuario.
 * @property password - Contraseña cifrada.
 * @property name - Nombre del usuario.
 * @property addresses - Lista de direcciones.
 * @property role - Rol del usuario: "user", "admin" o "seller".
 */
export interface User extends Document {
  email: string;
  password: string;
  name: string;
  addresses: {
    street: string;
    city: string;
    zipCode: string;
    isDefault: boolean;
  }[];
  role: "user" | "admin" | "seller";
}
