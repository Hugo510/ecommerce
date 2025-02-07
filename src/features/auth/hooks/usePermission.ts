// import { useMemo } from "react";
// import { useAuthStore } from "../store/authStore";
// import { rolePermissions } from "../types/auth"; // o desde donde se exporte

// export const usePermission = (action: string, resource: string): boolean => {
//   const { user } = useAuthStore();

//   // Se utiliza useMemo para encapsular la lógica sin condicionar la llamada del hook
//   const hasPermission = useMemo(() => {
//     if (!user) return false;
//     return rolePermissions[user.role].some(
//       (perm) => perm.action === action && perm.resource === resource
//     );
//   }, [user, action, resource]);

//   return hasPermission;
// };
