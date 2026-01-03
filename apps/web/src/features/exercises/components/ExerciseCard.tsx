import { useState } from "react";
import type { Exercise } from "@lift-logic/types";
import { ConfirmationDialog } from "../../../components/ConfirmationDialog";

interface ExerciseCardProps {
  exercise: Exercise;
  onEdit: (exercise: Exercise) => void;
  onDelete: (exercise: Exercise) => void;
}

export function ExerciseCard({ exercise, onEdit, onDelete }: ExerciseCardProps) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  return (
    <>
      <div className="border-4 border-black bg-white transition-all hover:translate-x-1 hover:translate-y-1">
        <img src={exercise.thumbnailUrl} alt={exercise.title} className="h-48 w-full border-b-4 border-black object-cover" />
        <div className="p-6">
          <h2 className="mb-4 text-2xl font-bold uppercase leading-tight tracking-tight">{exercise.title}</h2>
          <div className="flex gap-2">
            <button
              onClick={() => onEdit(exercise)}
              className="flex-1 border-4 border-black bg-lime-400 px-4 py-2 font-bold uppercase tracking-tight transition-all hover:translate-x-0.5 hover:translate-y-0.5"
            >
              Edit
            </button>
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="flex-1 border-4 border-black bg-red-500 px-4 py-2 font-bold uppercase tracking-tight text-white transition-all hover:translate-x-0.5 hover:translate-y-0.5"
            >
              Delete
            </button>
          </div>
        </div>
      </div>

      {showDeleteConfirm && (
        <ConfirmationDialog
          title="Delete Exercise"
          description={`Are you sure you want to delete "${exercise.title}"? This action cannot be undone.`}
          confirmLabel="Delete"
          cancelLabel="Cancel"
          isDangerous={true}
          onConfirm={() => {
            onDelete(exercise);
            setShowDeleteConfirm(false);
          }}
          onCancel={() => setShowDeleteConfirm(false)}
        />
      )}
    </>
  );
}
