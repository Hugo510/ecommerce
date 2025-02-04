import { Permission } from "../types/auth";
import { useAuthStore } from "../store/authStore";

export function usePermission(
  action: Permission["action"],
  resource: Permission["resource"]
) {
  const hasPermission = useAuthStore((state) => state.hasPermission);
  return hasPermission(action, resource);
}
