import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useStore } from "../../lib/mockStore";
import { useUsers, getUsersByCoachId } from "../../features/users";

export const Route = createFileRoute("/app/dashboard")({
  component: Dashboard,
});

function Dashboard() {
  const navigate = useNavigate();
  const { currentUser, organizations } = useStore();
  const { data: users = [], isLoading } = useUsers();

  if (!currentUser) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="border-4 border-black bg-white p-8">
        <p className="text-lg font-bold uppercase tracking-tight">LOADING...</p>
      </div>
    );
  }

  if (currentUser.role === "admin") {
    return <AdminDashboard users={users} organizations={organizations} navigate={navigate} />;
  }

  if (currentUser.role === "coach") {
    return <CoachDashboard currentUser={currentUser} users={users} />;
  }

  return <UserDashboard currentUser={currentUser} />;
}

function AdminDashboard({ users, organizations, navigate }: { users: any[]; organizations: any[]; navigate: any }) {
  const coaches = users.filter((u) => u.role === "coach");
  const regularUsers = users.filter((u) => u.role === "user");

  return (
    <div>
      <h1 className="mb-12 border-b-4 border-black pb-6 text-5xl font-bold uppercase leading-none tracking-tighter">Admin Dashboard</h1>

      <div className="mb-12 grid gap-0 md:grid-cols-3">
        <div className="border-4 border-black bg-white p-8">
          <h2 className="font-mono text-xs font-bold uppercase tracking-wider text-black">Organizations</h2>
          <p className="mt-4 font-mono text-5xl font-bold">{organizations.length}</p>
        </div>
        <div className="border-y-4 border-r-4 border-black bg-white p-8">
          <h2 className="font-mono text-xs font-bold uppercase tracking-wider text-black">Coaches</h2>
          <p className="mt-4 font-mono text-5xl font-bold">{coaches.length}</p>
        </div>
        <div className="border-y-4 border-r-4 border-black bg-white p-8">
          <h2 className="font-mono text-xs font-bold uppercase tracking-wider text-black">Users</h2>
          <p className="mt-4 font-mono text-5xl font-bold">{regularUsers.length}</p>
        </div>
      </div>

      <div className="mb-12 flex gap-4">
        <button
          onClick={() => navigate({ to: "/app/organizations" })}
          className="border-4 border-black bg-lime-400 px-8 py-4 font-bold uppercase transition-all hover:translate-x-1 hover:translate-y-1 active:translate-x-0 active:translate-y-0"
        >
          Manage Organizations
        </button>
        <button
          onClick={() => navigate({ to: "/app/users" })}
          className="border-4 border-black bg-white px-8 py-4 font-bold uppercase transition-all hover:translate-x-1 hover:translate-y-1 active:translate-x-0 active:translate-y-0"
        >
          Manage Users
        </button>
      </div>

      <div className="border-4 border-black bg-white">
        <div className="border-b-4 border-black bg-white p-6">
          <h2 className="text-2xl font-bold uppercase tracking-tight">Recent Users</h2>
        </div>
        <div>
          {users.slice(0, 5).map((user, index) => (
            <div key={user.id} className={`flex items-center justify-between p-6 ${index !== 4 ? "border-b-4 border-black" : ""}`}>
              <div>
                <p className="font-bold uppercase tracking-tight">{user.name}</p>
                <p className="font-mono text-sm font-bold uppercase">{user.email}</p>
              </div>
              <span className="border-4 border-black bg-lime-400 px-4 py-2 font-mono text-xs font-bold uppercase">{user.role}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CoachDashboard({ currentUser, users }: { currentUser: any; users: any[] }) {
  const assignedUsers = users.filter((u) => u.coachId === currentUser.id);

  return (
    <div>
      <h1 className="mb-12 border-b-4 border-black pb-6 text-5xl font-bold uppercase leading-none tracking-tighter">Coach Dashboard</h1>

      <div className="mb-12 border-4 border-black bg-white p-8">
        <h2 className="font-mono text-xs font-bold uppercase tracking-wider text-black">Assigned Users</h2>
        <p className="mt-4 font-mono text-5xl font-bold">{assignedUsers.length}</p>
      </div>

      <div className="border-4 border-black bg-white">
        <div className="border-b-4 border-black bg-white p-6">
          <h2 className="text-2xl font-bold uppercase tracking-tight">Your Users</h2>
        </div>
        {assignedUsers.length === 0 ? (
          <div className="p-8">
            <p className="font-mono font-bold uppercase">No users assigned yet.</p>
          </div>
        ) : (
          <div>
            {assignedUsers.map((user, index) => (
              <div key={user.id} className={`flex items-center justify-between p-6 ${index !== assignedUsers.length - 1 ? "border-b-4 border-black" : ""}`}>
                <div>
                  <p className="font-bold uppercase tracking-tight">{user.name}</p>
                  <p className="font-mono text-sm font-bold uppercase">{user.email}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function UserDashboard({ currentUser }: { currentUser: any }) {
  return (
    <div>
      <h1 className="mb-12 border-b-4 border-black pb-6 text-5xl font-bold uppercase leading-none tracking-tighter">User Dashboard</h1>

      <div className="border-4 border-black bg-white">
        <div className="border-b-4 border-black bg-white p-6">
          <h2 className="text-2xl font-bold uppercase tracking-tight">Your Profile</h2>
        </div>
        <div className="p-8">
          <div className="mb-8">
            <p className="mb-2 font-mono text-xs font-bold uppercase tracking-wider">Name</p>
            <p className="text-2xl font-bold">{currentUser.name}</p>
          </div>
          <div className="mb-8">
            <p className="mb-2 font-mono text-xs font-bold uppercase tracking-wider">Email</p>
            <p className="font-mono text-lg font-bold">{currentUser.email}</p>
          </div>
          <div className="mb-8">
            <p className="mb-2 font-mono text-xs font-bold uppercase tracking-wider">Role</p>
            <p className="border-4 border-black bg-lime-400 px-4 py-2 font-mono text-sm font-bold uppercase inline-block">{currentUser.role}</p>
          </div>
          {currentUser.organizationId && (
            <div>
              <p className="mb-2 font-mono text-xs font-bold uppercase tracking-wider">Organization</p>
              <p className="text-lg font-bold">{currentUser.organizationId}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
