import { useQuery } from "@tanstack/react-query";
import type { Plan } from "@lift-logic/types";

import { apiFetch } from "@/apps/mobile/src/lib/api";

interface ApiPlan {
  _id: string;
  coachId: string;
  clientId: string;
  title: string;
  description?: string;
  exercises: any[];
  isPublic: boolean;
  planNotes?: string;
  scheduledDate?: string;
  created_at: string;
  updated_at: string;
}

function transformApiPlan(apiPlan: ApiPlan): Plan {
  return {
    id: apiPlan._id,
    clientId: apiPlan.clientId,
    title: apiPlan.title,
    description: apiPlan.description,
    exercises: apiPlan.exercises,
    isPublic: apiPlan.isPublic,
    planNotes: apiPlan.planNotes,
    scheduledDate: apiPlan.scheduledDate,
    createdAt: new Date(apiPlan.created_at),
    updatedAt: new Date(apiPlan.updated_at),
  };
}

async function fetchClientPlans(clientId: string): Promise<Plan[]> {
  const data = await apiFetch(`/coach/clients/${clientId}/plans`);

  if (!data || !Array.isArray(data)) {
    return [];
  }

  return data.map(transformApiPlan);
}

export function useGetPlansByUser(clientId: string) {
  return useQuery({
    queryKey: ["plan", "coach", "clients", clientId],
    queryFn: () => fetchClientPlans(clientId),
  });
}
