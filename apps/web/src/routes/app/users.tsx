import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { canCreateUser, canAssignCoach, canDeleteUser, UserTable, CreateUserModal, useUsers, useCreateUser, useUpdateUser, useDeleteUser, getCoaches } from "../../features/users";
import type { UserInput } from "../../features/users";
import { useOrganizations } from "../../features/organizations";
import { useSession } from "../../features/auth";

export const Route = createFileRoute("/app/users")({
  component: Users,
});

function Users() {
  const { data: organizations = [] } = useOrganizations();
  const { data: session } = useSession();

  const currentUser = session?.user || null;

  const { data: users = [], isLoading } = useUsers();
  console.log("users: ", users);
  const createUserMutation = useCreateUser();
  const updateUserMutation = useUpdateUser();
  const deleteUserMutation = useDeleteUser();
  const [isCreating, setIsCreating] = useState(false);

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
        canAssignCoach={canAssignCoach(currentUser)}
        canDelete={canDeleteUser(currentUser)}
        onUpdateCoach={(userId, coachId) => {
          console.log("userId, coachId: ", userId, coachId);
          updateUserMutation.mutate({ id: userId, updates: { coachId } });
        }}
        onDeleteUser={(userId) => {
          deleteUserMutation.mutate(userId);
        }}
      />

      {isCreating && (
        <CreateUserModal
          organizations={organizations}
          coaches={coaches}
          onCancel={() => setIsCreating(false)}
          onCreate={(user: UserInput) => {
            createUserMutation.mutate(user);
            setIsCreating(false);
          }}
        />
      )}
    </div>
  );
}
