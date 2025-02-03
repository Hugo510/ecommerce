# Proyecto E-commerce con NestJS y MongoDB

Este proyecto es una aplicación de e-commerce desarrollada con [NestJS](https://nestjs.com/) y TypeScript. El backend se conecta a una base de datos MongoDB a través de [Mongoose](https://mongoosejs.com/) y utiliza diversas herramientas para validación, autenticación y seguridad.

## Tecnologías y Dependencias

- **Backend:** NestJS, TypeScript
- **Base de Datos:** MongoDB (configurado en [src/app.module.ts](src/app.module.ts))
- **ORM:** Mongoose
- **Validación:** class-validator, class-transformer
- **Autenticación:** JWT y Passport (véase [src/modules/auth](src/modules/auth))
- **Seguridad:** helmet, csurf y express-rate-limit
- **Logging:** nestjs-pino (ver [src/common/interceptors/logging.interceptor.ts](src/common/interceptors/logging.interceptor.ts))

## Estructura del Proyecto

El proyecto se organiza en módulos para mantener un código limpio y escalable:

- **Autenticación:** Gestión de login, registro y validación de tokens.
  - Controlador en [src/modules/auth/auth.controller.ts](src/modules/auth/auth.controller.ts)
  - Servicio en [src/modules/auth/auth.service.ts](src/modules/auth/auth.service.ts)
- **Usuarios:** Administración de usuarios y sincronización de índices.
  - Esquema en [src/modules/users/schemas/user.schema.ts](src/modules/users/schemas/user.schema.ts)
  - Servicio en [src/modules/users/users.service.ts](src/modules/users/users.service.ts)
- **Productos:** Gestión de productos con validaciones y búsquedas avanzadas.
  - DTOs en [src/modules/products/dto](src/modules/products/dto/)
  - Servicio en [src/modules/products/products.service.ts](src/modules/products/products.service.ts)
  - Esquema e interfaz en [src/modules/products/schemas/product.schema.ts](src/modules/products/schemas/product.schema.ts) y [src/modules/products/interfaces/product.interface.ts](src/modules/products/interfaces/product.interface.ts)
- **Órdenes:** Creación y administración de órdenes de compra.
  - DTOs en [src/modules/orders/dto](src/modules/orders/dto/)
  - Servicio en [src/modules/orders/orders.service.ts](src/modules/orders/orders.service.ts)
  - Esquema e interfaz en [src/modules/orders/schemas/order.schema.ts](src/modules/orders/schemas/order.schema.ts) y [src/modules/orders/interfaces/order.interface.ts](src/modules/orders/interfaces/order.interface.ts)
- **Reseñas:** Gestión de reseñas de productos.
  - Servicio en [src/modules/reviews/reviews.service.ts](src/modules/reviews/reviews.service.ts)
  - Interfaz en [src/modules/reviews/interfaces/review.interface.ts](src/modules/reviews/interfaces/review.interface.ts)
- **Pagos:** Procesamiento y administración de pagos.
  - Controlador en [src/modules/payments/payments.controller.ts](src/modules/payments/payments.controller.ts)
  - Servicio en [src/modules/payments/payments.service.ts](src/modules/payments/payments.service.ts)
  - Esquema, DTOs e interfaz en [src/modules/payments/schemas/payment.schema.ts](src/modules/payments/schemas/payment.schema.ts), [src/modules/payments/dto](src/modules/payments/dto/) y [src/modules/payments/interfaces/payment.interface.ts](src/modules/payments/interfaces/payment.interface.ts)
- **Seguridad:** Registro de acciones y eventos de seguridad.
  - Servicio en [src/modules/security/security.service.ts](src/modules/security/security.service.ts)
  - Esquema, DTOs e interfaz en [src/modules/security/schemas/security-log.schema.ts](src/modules/security/schemas/security-log.schema.ts), [src/modules/security/dto](src/modules/security/dto/) y [src/modules/security/interfaces/security-log.interface.ts](src/modules/security/interfaces/security-log.interface.ts)

La configuración global se establece en [src/app.module.ts](src/app.module.ts) y [src/config/configuration.ts](src/config/configuration.ts), mientras que la validación de variables de entorno se define en [src/config/validation.schema.ts](src/config/validation.schema.ts).

## Configuración y Variables de Entorno

Crea un archivo **.env** en la raíz del proyecto con al menos las siguientes variables:

```sh
# Ejemplo de archivo .env
MONGO_URI=mongodb://localhost:27017/ecommerce
JWT_SECRET=tu_clave_secreta
PORT=3000
```

## Instalación y Ejecución

Instala las dependencias:

```sh
npm install
```

Para ejecutar el servidor en modo desarrollo:

```sh
npm run start:dev
```

Para compilar la aplicación:

```sh
npm run build
```

Y para ejecutar la versión compilada:

```sh
npm start
```

### Pruebas

Para ejecutar las pruebas unitarias:

```sh
npm test
```

## Consideraciones de Seguridad

### El proyecto incluye varias medidas de seguridad:

- **Helmet:** Configura cabeceras seguras (ver src/main.ts).
- **CSRF y Rate Limiting:** Implementados en main.ts utilizando csurf y express-rate-limit.
- **Validación de Datos:** Realizada a través de DTOs y pipes globales.

## Logging y Monitoreo

El logging se realiza mediante el interceptor LoggingInterceptor y la integración de nestjs-pino, permitiendo rastrear las peticiones y respuestas a lo largo del ciclo de vida de la aplicación.

## Notas Adicionales

Se utilizan decoradores para rutas públicas. Ejemplo: [/src/modules/auth/decorators/public.decorator.ts](/src/modules/auth/decorators/public.decorator.ts).
La sincronización de índices y otras operaciones de inicialización se realizan en los servicios correspondientes, como en users.[src/modules/users/user.services.ts](src/modules/users/users.service.ts).
