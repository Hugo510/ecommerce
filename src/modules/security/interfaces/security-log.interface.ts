import { Document } from "mongoose";

/**
 * Interfaz para el log de seguridad.
 * @property user - ID del usuario relacionado.
 * @property action - Tipo de acción (login, logout, etc.).
 * @property createdAt - Fecha de creación.
 * @property ip - IP de origen.
 * @property userAgent - User agent del dispositivo.
 * @property status - Estado del evento ("success", "failure", "warning" o "error").
 * @property metadata - Datos adicionales.
 */
export interface SecurityLog extends Document {
  user: string;
  action: string;
  createdAt: Date;
  ip: string;
  userAgent?: string;
  status: "success" | "failure" | "warning" | "error";
  metadata?: Record<string, any>;
}
