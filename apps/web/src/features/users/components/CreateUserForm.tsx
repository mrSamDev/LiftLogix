import { useState } from "react";
import type { User, UserRole } from "../types";

type CreateUserFormProps = {
  organizations: any[];
  coaches: User[];
  onCancel: () => void;
  onCreate: (user: User) => void;
};

export function CreateUserForm({
  organizations,
  coaches,
  onCancel,
  onCreate,
}: CreateUserFormProps) {
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
