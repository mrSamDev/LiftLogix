import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useStore } from "../../lib/mockStore";
import { canCreateUser, canAssignCoach } from "../../lib/permissions";
import type { User, UserRole } from "../../types/domain";

export const Route = createFileRoute("/app/users")({
  component: Users,
});

function Users() {
  const { currentUser, users, organizations, addUser, updateUser, getCoaches } = useStore();
  const [isCreating, setIsCreating] = useState(false);
  const [editingUserId, setEditingUserId] = useState<string | null>(null);

  if (!currentUser || !canCreateUser(currentUser)) {
    return (
      <div className="border-4 border-black bg-white p-8">
        <p className="text-lg font-bold uppercase tracking-tight">
          ACCESS DENIED: INSUFFICIENT PERMISSIONS
        </p>
      </div>
    );
  }

  const coaches = getCoaches();

  return (
    <div>
      <div className="mb-12 flex items-start justify-between border-b-4 border-black pb-6">
        <h1 className="text-5xl font-bold uppercase leading-none tracking-tighter">
          Users
        </h1>
        <button
          onClick={() => setIsCreating(true)}
          className="border-4 border-black bg-lime-400 px-6 py-3 font-bold uppercase tracking-tight transition-all hover:translate-x-1 hover:translate-y-1 active:translate-x-0 active:translate-y-0"
        >
          + New User
        </button>
      </div>

      <div className="border-4 border-black bg-white">
        <table className="w-full">
          <thead className="border-b-4 border-black bg-white">
            <tr>
              <th className="px-6 py-4 text-left font-mono text-xs font-bold uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-4 text-left font-mono text-xs font-bold uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-4 text-left font-mono text-xs font-bold uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-4 text-left font-mono text-xs font-bold uppercase tracking-wider">
                Organization
              </th>
              <th className="px-6 py-4 text-left font-mono text-xs font-bold uppercase tracking-wider">
                Coach
              </th>
              <th className="px-6 py-4 text-left font-mono text-xs font-bold uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr
                key={user.id}
                className={index !== users.length - 1 ? "border-b-4 border-black" : ""}
              >
                <td className="px-6 py-4 font-bold uppercase">{user.name}</td>
                <td className="px-6 py-4 font-mono text-sm font-bold">{user.email}</td>
                <td className="px-6 py-4">
                  <span className="border-4 border-black bg-lime-400 px-3 py-1 font-mono text-xs font-bold uppercase">
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4 font-mono text-sm font-bold">
                  {user.organizationId || "-"}
                </td>
                <td className="px-6 py-4">
                  {editingUserId === user.id ? (
                    <select
                      value={user.coachId || ""}
                      onChange={(e) => {
                        updateUser(user.id, { coachId: e.target.value || null });
                        setEditingUserId(null);
                      }}
                      className="border-4 border-black bg-white px-3 py-2 font-mono text-sm font-bold outline-none focus:bg-lime-400"
                    >
                      <option value="">No coach</option>
                      {coaches.map((coach) => (
                        <option key={coach.id} value={coach.id}>
                          {coach.name}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <span className="font-mono text-sm font-bold">
                      {user.coachId
                        ? coaches.find((c) => c.id === user.coachId)?.name || "-"
                        : "-"}
                    </span>
                  )}
                </td>
                <td className="px-6 py-4">
                  {user.role === "user" && canAssignCoach(currentUser) && (
                    <button
                      onClick={() =>
                        setEditingUserId(editingUserId === user.id ? null : user.id)
                      }
                      className="font-bold uppercase underline transition-all hover:no-underline"
                    >
                      {editingUserId === user.id ? "Cancel" : "Assign"}
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isCreating && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90">
          <div className="max-h-[90vh] w-full max-w-md overflow-y-auto border-4 border-black bg-white">
            <CreateUserForm
              organizations={organizations}
              coaches={coaches}
              onCancel={() => setIsCreating(false)}
              onCreate={(user) => {
                addUser(user);
                setIsCreating(false);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

function CreateUserForm({
  organizations,
  coaches,
  onCancel,
  onCreate,
}: {
  organizations: any[];
  coaches: User[];
  onCancel: () => void;
  onCreate: (user: User) => void;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<UserRole>("user");
  const [organizationId, setOrganizationId] = useState("");
  const [coachId, setCoachId] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newUser: User = {
      id: `user_${Date.now()}`,
      name,
      email,
      role,
      organizationId: organizationId || null,
      coachId: role === "user" && coachId ? coachId : null,
    };

    onCreate(newUser);
  };

  return (
    <div className="p-8">
      <h2 className="mb-8 border-b-4 border-black pb-4 text-2xl font-bold uppercase tracking-tight">
        New User
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label className="mb-2 block font-mono text-xs font-bold uppercase tracking-wider">
            Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full border-4 border-black bg-white px-4 py-3 font-bold outline-none focus:bg-lime-400"
          />
        </div>

        <div className="mb-6">
          <label className="mb-2 block font-mono text-xs font-bold uppercase tracking-wider">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full border-4 border-black bg-white px-4 py-3 font-mono font-bold outline-none focus:bg-lime-400"
          />
        </div>

        <div className="mb-6">
          <label className="mb-2 block font-mono text-xs font-bold uppercase tracking-wider">
            Role
          </label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value as UserRole)}
            className="w-full border-4 border-black bg-white px-4 py-3 font-bold outline-none focus:bg-lime-400"
          >
            <option value="user">User</option>
            <option value="coach">Coach</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <div className="mb-6">
          <label className="mb-2 block font-mono text-xs font-bold uppercase tracking-wider">
            Organization
          </label>
          <select
            value={organizationId}
            onChange={(e) => setOrganizationId(e.target.value)}
            className="w-full border-4 border-black bg-white px-4 py-3 font-bold outline-none focus:bg-lime-400"
          >
            <option value="">None</option>
            {organizations.map((org) => (
              <option key={org.id} value={org.id}>
                {org.title}
              </option>
            ))}
          </select>
        </div>

        {role === "user" && (
          <div className="mb-8">
            <label className="mb-2 block font-mono text-xs font-bold uppercase tracking-wider">
              Coach
            </label>
            <select
              value={coachId}
              onChange={(e) => setCoachId(e.target.value)}
              className="w-full border-4 border-black bg-white px-4 py-3 font-bold outline-none focus:bg-lime-400"
            >
              <option value="">None</option>
              {coaches.map((coach) => (
                <option key={coach.id} value={coach.id}>
                  {coach.name}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="flex gap-4">
          <button
            type="submit"
            className="flex-1 border-4 border-black bg-lime-400 px-6 py-3 font-bold uppercase tracking-tight transition-all hover:translate-x-1 hover:translate-y-1 active:translate-x-0 active:translate-y-0"
          >
            Create
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 border-4 border-black bg-white px-6 py-3 font-bold uppercase tracking-tight transition-all hover:translate-x-1 hover:translate-y-1 active:translate-x-0 active:translate-y-0"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
