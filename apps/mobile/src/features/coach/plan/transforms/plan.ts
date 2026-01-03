import type { ApiPlan, Plan, CreatePlanInput } from "@lift-logic/types";

interface CreatePlanPayload {
  clientId: string;
  title: string;
  description?: string;
  exercises: Array<{
    id: string;
    name: string;
    sets: number;
    reps: number;
    weight: number;
    restTime: number;
    notes?: string;
  }>;
  isPublic: boolean;
  planNotes?: string;
  scheduledDate?: string;
}

export const planTransformer = {
  fromAPI(apiData: ApiPlan): Plan {
    return {
      id: apiData._id,
      clientId: apiData.clientId,
      coachId: apiData.coachId,
      title: apiData.title,
      description: apiData.description,
      exercises: apiData.exercises,
      isPublic: apiData.isPublic,
      planNotes: apiData.planNotes,
      scheduledDate: apiData.scheduledDate,
      createdAt: new Date(apiData.createdAt),
      updatedAt: new Date(apiData.updatedAt),
    };
  },

  toAPI(data: CreatePlanInput): CreatePlanPayload {
    return {
      clientId: data.clientId,
      title: data.title,
      description: data.description,
      exercises: data.exercises,
      isPublic: data.isPublic,
      planNotes: data.planNotes,
      scheduledDate: data.scheduledDate,
    };
  },

  listFromAPI(apiData: ApiPlan[]): Plan[] {
    return apiData.map((plan) => planTransformer.fromAPI(plan));
  },
};
