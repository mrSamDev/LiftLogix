import { useState } from "react";
import type { User } from "@lift-logic/types";

type AssignCoachDialogProps = {
  user: User;
  coaches: User[];
  currentCoachId: string | null;
  onAssign: (coachId: string | null) => void;
  onCancel: () => void;
};

export function AssignCoachDialog({ user, coaches, currentCoachId, onAssign, onCancel }: AssignCoachDialogProps) {
  console.log("coaches: ", coaches);
  const [selectedCoachId, setSelectedCoachId] = useState<string | null>(currentCoachId);

  const handleAssign = () => {
    onAssign(selectedCoachId);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90" role="dialog" aria-modal="true" aria-labelledby="assign-dialog-title">
      <div className="w-full max-w-md border-4 border-black bg-white">
        <div className="border-b-4 border-black bg-white p-6">
          <h2 id="assign-dialog-title" className="text-2xl font-bold uppercase leading-tight tracking-tight">
            Assign Coach
          </h2>
          <p className="mt-2 font-mono text-sm font-bold">User: {user.name}</p>
        </div>

        <div className="p-6">
          <label htmlFor="coach-select" className="mb-3 block font-mono text-xs font-bold uppercase tracking-wider">
            Select Coach
          </label>
          <select
            id="coach-select"
            value={selectedCoachId || ""}
            onChange={(e) => setSelectedCoachId(e.target.value || null)}
            className="w-full border-4 border-black bg-white px-4 py-3 font-mono text-sm font-bold outline-none focus:bg-lime-400"
          >
            <option value="">No coach</option>
            {coaches.map((coach) => (
              <option key={coach.id} value={coach.id}>
                {coach.name}
              </option>
            ))}
          </select>
        </div>

        <div className="border-t-4 border-black flex">
          <button
            onClick={onCancel}
            className="flex-1 bg-white px-6 py-4 font-bold uppercase tracking-tight transition-all hover:bg-gray-100 focus:bg-gray-100 focus:outline-none border-r-4 border-black"
          >
            Close
          </button>
          <button onClick={handleAssign} className="flex-1 bg-lime-400 px-6 py-4 font-bold uppercase tracking-tight transition-all hover:bg-lime-500 focus:bg-lime-500 focus:outline-none">
            Assign
          </button>
        </div>
      </div>
    </div>
  );
}
