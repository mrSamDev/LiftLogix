import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "../../../../lib/api";
import { exerciseTransformer, Exercise } from "../../../../transforms/exercise";

interface ApiExercisesResponse {
  exercises: Array<{
    _id: string;
    title: string;
    thumbnailUrl?: string;
    videoUrl?: string;
    description: string;
  }>;
}

export function useExercises() {
  return useQuery({
    queryKey: ["exercises"],
    queryFn: async (): Promise<Exercise[]> => {
      const data = await apiFetch<ApiExercisesResponse>("/exercises");
      return exerciseTransformer.listFromAPI(data.exercises);
    },
  });
}
