import type { Exercise, ExerciseInput } from "@lift-logic/types";
import { CreateExerciseForm } from "./CreateExerciseForm";

interface CreateExerciseModalProps {
  onCancel: () => void;
  onCreate: (input: ExerciseInput) => void;
  exercise?: Exercise;
}

export function CreateExerciseModal({
  onCancel,
  onCreate,
  exercise,
}: CreateExerciseModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90">
      <div className="max-h-[90vh] w-full max-w-md overflow-y-auto border-4 border-black bg-white">
        <CreateExerciseForm
          onCancel={onCancel}
          onCreate={onCreate}
          exercise={exercise}
        />
      </div>
    </div>
  );
}
