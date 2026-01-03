import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import type { Exercise } from "@lift-logic/types";
import { useExercises, useCreateExercise, useUpdateExercise, useDeleteExercise } from "../../../features/exercises/hooks";
import { ExerciseGrid, CreateExerciseModal } from "../../../features/exercises/components";

export const Route = createFileRoute("/app/exercises/")({
  component: Exercises,
});

function Exercises() {
  const { data: exercises = [], isLoading } = useExercises();
  console.log("exercises: ", exercises);
  const [isCreating, setIsCreating] = useState(false);
  const [editingExercise, setEditingExercise] = useState<Exercise | null>(null);
  const createExerciseMutation = useCreateExercise();
  const updateExerciseMutation = useUpdateExercise();
  const deleteExerciseMutation = useDeleteExercise();

  if (isLoading) {
    return (
      <div className="border-4 border-black bg-white p-8">
        <p className="text-lg font-bold uppercase tracking-tight">LOADING...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-12 flex items-start justify-between border-b-4 border-black pb-6">
        <h1 className="text-5xl font-bold uppercase leading-none tracking-tighter">Exercises</h1>
        <button
          onClick={() => setIsCreating(true)}
          className="border-4 border-black bg-lime-400 px-6 py-3 font-bold uppercase tracking-tight transition-all hover:translate-x-1 hover:translate-y-1 active:translate-x-0 active:translate-y-0"
        >
          + New Exercise
        </button>
      </div>

      <ExerciseGrid
        exercises={exercises}
        onEdit={(exercise) => setEditingExercise(exercise)}
        onDelete={(exercise) => deleteExerciseMutation.mutate(exercise.id)}
      />

      {isCreating && (
        <CreateExerciseModal
          onCancel={() => setIsCreating(false)}
          onCreate={(input) => {
            createExerciseMutation.mutate(input);
            setIsCreating(false);
          }}
        />
      )}

      {editingExercise && (
        <CreateExerciseModal
          exercise={editingExercise}
          onCancel={() => setEditingExercise(null)}
          onCreate={(input) => {
            updateExerciseMutation.mutate({ id: editingExercise.id, input });
            setEditingExercise(null);
          }}
        />
      )}
    </div>
  );
}
