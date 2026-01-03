import { useMutation, useQueryClient } from "@tanstack/react-query";
import { safetry } from "@lift-logic/utils";
import { apiFetch } from "../../../../lib/api";
import { planTransformer } from "../transforms/plan";
import type { CreatePlanInput, Plan, ApiPlan } from "@lift-logic/types";

interface CreatePlanResponse {
  plan: ApiPlan;
}

export function useCreatePlan() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: CreatePlanInput): Promise<Plan> => {
      const payload = planTransformer.toAPI(input);
      console.log("payload: ", payload);

      const [fetchError, response] = await safetry(
        apiFetch<CreatePlanResponse>("/plans", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        })
      );

      console.log("fetchError: ", fetchError);

      if (fetchError) {
        throw new Error(`Failed to create plan: ${fetchError.message}`);
      }

      const [transformError, plan] = safetry(() => planTransformer.fromAPI(response.plan));
      if (transformError) {
        throw new Error(`Failed to transform plan: ${transformError.message}`);
      }

      return plan;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["plans"] });
      queryClient.invalidateQueries({ queryKey: ["coach", "clients"] });
    },
  });
}
