import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Exercise, ExerciseInput } from "@lift-logic/types";
import { createExercise, deleteExercise, getExercise, getExercises, updateExercise } from "./api";

const EXERCISES_QUERY_KEY = ["exercises"];

export function useExercises() {
  return useQuery({
    queryKey: EXERCISES_QUERY_KEY,
    queryFn: getExercises,
  });
}

export function useExercise(id: string) {
  return useQuery({
    queryKey: [...EXERCISES_QUERY_KEY, id],
    queryFn: () => getExercise(id),
  });
}

export function useCreateExercise() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: ExerciseInput) => createExercise(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: EXERCISES_QUERY_KEY });
    },
  });
}

export function useUpdateExercise() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, input }: { id: string; input: ExerciseInput }) => updateExercise(id, input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: EXERCISES_QUERY_KEY });
    },
  });
}

export function useDeleteExercise() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteExercise(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: EXERCISES_QUERY_KEY });
    },
  });
}
