import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useStore } from "../../lib/mockStore";
import { canCreateUser, canAssignCoach, UserTable, CreateUserModal, useUsers, useCreateUser, useUpdateUser, getCoaches } from "../../features/users";
import type { User } from "../../features/users";

export const Route = createFileRoute("/app/users")({
  component: Users,
});

function Users() {
  const { currentUser, organizations } = useStore();
  console.log("currentUser: ", currentUser);
  const { data: users = [], isLoading } = useUsers();
  const createUserMutation = useCreateUser();
  const updateUserMutation = useUpdateUser();
  const [isCreating, setIsCreating] = useState(false);
  const [editingUserId, setEditingUserId] = useState<string | null>(null);

  if (!currentUser || !canCreateUser(currentUser)) {
    return (
      <div className="border-4 border-black bg-white p-8">
        <p className="text-lg font-bold uppercase tracking-tight">ACCESS DENIED: INSUFFICIENT PERMISSIONS</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="border-4 border-black bg-white p-8">
        <p className="text-lg font-bold uppercase tracking-tight">LOADING...</p>
      </div>
    );
  }

  const coaches = getCoaches(users);

  return (
    <div>
      <div className="mb-12 flex items-start justify-between border-b-4 border-black pb-6">
        <h1 className="text-5xl font-bold uppercase leading-none tracking-tighter">Users</h1>
        <button
          onClick={() => setIsCreating(true)}
          className="border-4 border-black bg-lime-400 px-6 py-3 font-bold uppercase tracking-tight transition-all hover:translate-x-1 hover:translate-y-1 active:translate-x-0 active:translate-y-0"
        >
          + New User
        </button>
      </div>

      <UserTable
        users={users}
        coaches={coaches}
        currentUser={currentUser}
        editingUserId={editingUserId}
        canAssignCoach={canAssignCoach(currentUser)}
        onEditCoach={(userId) => setEditingUserId(userId)}
        onCancelEdit={() => setEditingUserId(null)}
        onUpdateCoach={(userId, coachId) => {
          updateUserMutation.mutate({ id: userId, updates: { coachId } });
          setEditingUserId(null);
        }}
      />

      {isCreating && (
        <CreateUserModal
          organizations={organizations}
          coaches={coaches}
          onCancel={() => setIsCreating(false)}
          onCreate={(user: Omit<User, "id">) => {
            createUserMutation.mutate(user);
            setIsCreating(false);
          }}
        />
      )}
    </div>
  );
}
