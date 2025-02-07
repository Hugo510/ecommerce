export type Role = "admin" | "manager" | "staff" | "customer";

export interface User {
  id: string;
  email: string;
  role: Role;
  name: string;
}

export interface Permission {
  action: "create" | "read" | "update" | "delete";
  resource: "products" | "categories" | "users" | "orders";
}

// export const rolePermissions: Record<Role, Permission[]> = {
//   admin: [
//     { action: 'create', resource: 'products' },
//     { action: 'read', resource: 'products' },
//     { action: 'update', resource: 'products' },
//     { action: 'delete', resource: 'products' },
//     { action: 'create', resource: 'categories' },
//     { action: 'read', resource: 'categories' },
//     { action: 'update', resource: 'categories' },
//     { action: 'delete', resource: 'categories' },
//     { action: 'create', resource: 'users' },
//     { action: 'read', resource: 'users' },
//     { action: 'update', resource: 'users' },
//     { action: 'delete', resource: 'users' },
//     { action: 'read', resource: 'orders' },
//     { action: 'update', resource: 'orders' },
//   ],
//   manager: [
//     { action: 'create', resource: 'products' },
//     { action: 'read', resource: 'products' },
//     { action: 'update', resource: 'products' },
//     { action: 'read', resource: 'categories' },
//     { action: 'read', resource: 'users' },
//     { action: 'read', resource: 'orders' },
//     { action: 'update', resource: 'orders' },
//   ],
//   staff: [
//     { action: 'read', resource: 'products' },
//     { action: 'update', resource: 'products' },
//     { action: 'read', resource: 'categories' },
//     { action: 'read', resource: 'orders' },
//   ],
//   customer: [
//     { action: 'read', resource: 'products' },
//     { action: 'read', resource: 'categories' },
//   ],
// };
