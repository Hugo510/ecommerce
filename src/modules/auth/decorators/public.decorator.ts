import { SetMetadata } from "@nestjs/common";

/**
 * Clave utilizada para identificar rutas públicas
 */
export const IS_PUBLIC_KEY = "isPublic";

/**
 * Decorador que marca una ruta como pública (no requiere autenticación)
 * Ejemplo de uso:
 * @Public()
 * @Get('ruta-publica')
 * rutaPublica() { ... }
 */
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
