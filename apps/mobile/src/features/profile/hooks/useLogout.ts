import { useMutation } from "@tanstack/react-query";
import { authClient, removeToken, removeUserData } from "../../../lib/auth";
import { useAuthState } from "../../../store/authState";

async function logout(): Promise<void> {
  await Promise.all([authClient.signOut(), removeToken(), removeUserData()]);
}

export function useLogout() {
  const actions = useAuthState((state) => state.actions);

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      actions.setAuthenticated(false);
      actions.setUser(undefined);
    },
  });
}
