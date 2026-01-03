import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/apps/mobile/src/lib/api";
import { planTransformer } from "@/apps/mobile/src/features/coach/plan/transforms/plan";
import type { ApiPlan } from "@lift-logic/types";

export function useWorkouts() {
  return useQuery({
    queryKey: ["client-workouts"],
    queryFn: async () => {
      const apiData = await apiFetch<ApiPlan[]>("/clients/workout-list");
      return planTransformer.listFromAPI(apiData);
    },
  });
}
