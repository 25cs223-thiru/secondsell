import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { useQueryClient } from "@tanstack/react-query";

/**
 * Convenience wrapper around Internet Identity auth state.
 */
export function useAuth() {
  const {
    login,
    clear,
    isAuthenticated,
    isInitializing,
    isLoggingIn,
    identity,
    loginStatus,
  } = useInternetIdentity();
  const queryClient = useQueryClient();

  const handleLogout = () => {
    clear();
    queryClient.clear();
  };

  return {
    login,
    logout: handleLogout,
    isAuthenticated,
    isInitializing,
    isLoggingIn,
    isLoading: isInitializing || isLoggingIn,
    identity,
    loginStatus,
    principalId: identity?.getPrincipal().toString() ?? null,
  };
}
