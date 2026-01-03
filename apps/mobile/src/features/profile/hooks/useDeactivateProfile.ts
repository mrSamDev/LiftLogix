import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiFetch } from "../../../lib/api";
import { useAuthState } from "../../../store/authState";
import { User } from "@lift-logic/types";

async function deactivateProfile(): Promise<User> {
  return apiFetch("/users/me/deactivate", { method: "PATCH" });
}

export function useDeactivateProfile() {
  const queryClient = useQueryClient();
  const actions = useAuthState((state) => state.actions);

  return useMutation({
    mutationFn: deactivateProfile,
    onSuccess: (updatedUser) => {
      actions.setUser(updatedUser);
      queryClient.invalidateQueries({ queryKey: ["user", "me"] });
    },
  });
}
