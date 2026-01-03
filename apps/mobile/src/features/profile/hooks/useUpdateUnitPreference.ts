import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiFetch } from "../../../lib/api";
import { useAuthState } from "../../../store/authState";
import { User } from "@lift-logic/types";

async function updateUnitPreference(preference: "gram"): Promise<User> {
  return apiFetch("/users/me", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ unitPreference: preference }),
  });
}

export function useUpdateUnitPreference() {
  const queryClient = useQueryClient();
  const actions = useAuthState((state) => state.actions);

  return useMutation({
    mutationFn: updateUnitPreference,
    onSuccess: (updatedUser) => {
      actions.setUser(updatedUser);
      queryClient.invalidateQueries({ queryKey: ["user", "me"] });
    },
  });
}
