import type { User } from "../types";

type UserTableProps = {
  users: User[];
  coaches: User[];
  currentUser: User;
  editingUserId: string | null;
  canAssignCoach: boolean;
  onEditCoach: (userId: string) => void;
  onCancelEdit: () => void;
  onUpdateCoach: (userId: string, coachId: string | null) => void;
};

export function UserTable({
  users,
  coaches,
  currentUser,
  editingUserId,
  canAssignCoach,
  onEditCoach,
  onCancelEdit,
  onUpdateCoach,
}: UserTableProps) {
  return (
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
                      onUpdateCoach(user.id, e.target.value || null);
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
                {user.role === "user" && canAssignCoach && (
                  <button
                    onClick={() =>
                      editingUserId === user.id ? onCancelEdit() : onEditCoach(user.id)
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
  );
}
