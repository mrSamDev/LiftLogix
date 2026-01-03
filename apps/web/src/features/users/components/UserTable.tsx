import { useState } from "react";
import type { User } from "@lift-logic/types";
import { ActionsDropdown } from "../../../components/ActionsDropdown";
import { AssignCoachDialog } from "./AssignCoachDialog";
import { ConfirmationDialog } from "../../../components/ConfirmationDialog";

type UserTableProps = {
  users: User[];
  coaches: User[];
  currentUser: User;
  canAssignCoach: boolean;
  canDelete: boolean;
  onUpdateCoach: (userId: string, coachId: string | null) => void;
  onDeleteUser: (userId: string) => void;
};

export function UserTable({ users, coaches, currentUser, canAssignCoach, canDelete, onUpdateCoach, onDeleteUser }: UserTableProps) {
  const [assigningUserId, setAssigningUserId] = useState<string | null>(null);
  console.log("assigningUserId: ", assigningUserId);
  const [deletingUserId, setDeletingUserId] = useState<string | null>(null);

  const assigningUser = users.find((u) => u.id === assigningUserId);
  const deletingUser = users.find((u) => u.id === deletingUserId);

  return (
    <>
      <div className="border-4 border-black bg-white">
        <table className="w-full">
          <thead className="border-b-4 border-black bg-white">
            <tr>
              <th className="px-6 py-4 text-left font-mono text-xs font-bold uppercase tracking-wider">Name</th>
              <th className="px-6 py-4 text-left font-mono text-xs font-bold uppercase tracking-wider">Email</th>
              <th className="px-6 py-4 text-left font-mono text-xs font-bold uppercase tracking-wider">Role</th>
              <th className="px-6 py-4 text-left font-mono text-xs font-bold uppercase tracking-wider">Organization</th>
              <th className="px-6 py-4 text-left font-mono text-xs font-bold uppercase tracking-wider">Coach</th>
              <th className="px-6 py-4 text-left font-mono text-xs font-bold uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => {
              const actions = [];

              if (user.role === "user" && canAssignCoach) {
                actions.push({
                  label: "Assign",
                  onClick: () => setAssigningUserId(user.id),
                });
              }

              if (canDelete) {
                actions.push({
                  label: "Delete",
                  onClick: () => setDeletingUserId(user.id),
                  isDangerous: true,
                });
              }

              return (
                <tr key={user.id} className={index !== users.length - 1 ? "border-b-4 border-black" : ""}>
                  <td className="px-6 py-4 font-bold uppercase">{user.name}</td>
                  <td className="px-6 py-4 font-mono text-sm font-bold">{user.email}</td>
                  <td className="px-6 py-4">
                    <span className="border-4 border-black bg-lime-400 px-3 py-1 font-mono text-xs font-bold uppercase">{user.role}</span>
                  </td>
                  <td className="px-6 py-4 font-mono text-sm font-bold">{user.orgId || "-"}</td>
                  <td className="px-6 py-4">
                    <span className="font-mono text-sm font-bold">{user.coachId ? coaches.find((c) => c.id === user.coachId)?.name || "-" : "-"}</span>
                  </td>
                  <td className="px-6 py-4">
                    <ActionsDropdown actions={actions} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {assigningUser && (
        <AssignCoachDialog
          user={assigningUser}
          coaches={coaches}
          currentCoachId={assigningUser.coachId || null}
          onAssign={(coachId) => {
            onUpdateCoach(assigningUser.id, coachId);
            setAssigningUserId(null);
          }}
          onCancel={() => setAssigningUserId(null)}
        />
      )}

      {deletingUser && (
        <ConfirmationDialog
          title="Delete User"
          description={`Are you sure you want to delete ${deletingUser.name}? This action cannot be undone.`}
          confirmLabel="Delete"
          cancelLabel="Cancel"
          isDangerous={true}
          onConfirm={() => {
            onDeleteUser(deletingUser.id);
            setDeletingUserId(null);
          }}
          onCancel={() => setDeletingUserId(null)}
        />
      )}
    </>
  );
}
