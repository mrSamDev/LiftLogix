import type { Exercise } from "@lift-logic/types";
import { ExerciseCard } from "./ExerciseCard";

interface ExerciseGridProps {
  exercises: Exercise[];
  onEdit: (exercise: Exercise) => void;
  onDelete: (exercise: Exercise) => void;
}

export function ExerciseGrid({ exercises, onEdit, onDelete }: ExerciseGridProps) {
  if (exercises.length === 0) {
    return (
      <div className="border-4 border-black bg-white p-12 text-center">
        <p className="text-lg font-bold uppercase tracking-tight">
          NO EXERCISES FOUND
        </p>
        <p className="mt-2 font-mono text-sm uppercase">
          CREATE YOUR FIRST EXERCISE TO GET STARTED
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-0 md:grid-cols-2 lg:grid-cols-3">
      {exercises.map((exercise) => (
        <ExerciseCard
          key={exercise.id}
          exercise={exercise}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
