import { useQuery } from "@tanstack/react-query";
import type { Plan } from "@lift-logic/types";

const MOCK_WORKOUT: Plan = {
  id: "1",
  clientId: "client-1",
  coachId: "coach-1",
  title: "Full Body Workout",
  description: "Compound movements for overall strength",
  exercises: [
    {
      id: "ex-1",
      name: "Deadlift",
      sets: 4,
      reps: 6,
      weight: 100,
      restTime: 180,
      notes: "Focus on form",
    },
    {
      id: "ex-2",
      name: "Overhead Press",
      sets: 3,
      reps: 8,
      weight: 40,
      restTime: 120,
    },
  ],
  isPublic: false,
  scheduledDate: "2026-01-06",
  createdAt: new Date(),
  updatedAt: new Date(),
};

export function useWorkoutDetail(id: string | undefined) {
  return useQuery({
    queryKey: ["workout-detail", id],
    queryFn: async () => {
      return MOCK_WORKOUT;
    },
    enabled: !!id,
  });
}
