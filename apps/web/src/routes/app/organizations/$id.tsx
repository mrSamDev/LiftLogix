import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useStore } from "../../../lib/mockStore";
import type { Organization, User } from "../../../types/domain";

export const Route = createFileRoute("/app/organizations/$id")({
  component: OrganizationDetail,
});

function OrganizationDetail() {
  const { id } = Route.useParams();
  const {
    getOrganizationById,
    getCoachesByOrganizationId,
    getUsersByOrganizationId,
    updateOrganization,
    updateUser,
  } = useStore();

  const [isEditingOrg, setIsEditingOrg] = useState(false);
  const [editingUserId, setEditingUserId] = useState<string | null>(null);

  const organization = getOrganizationById(id);
  const coaches = getCoachesByOrganizationId(id);
  const users = getUsersByOrganizationId(id);

  if (!organization) {
    return (
      <div className="border-4 border-black bg-white p-8">
        <p className="text-lg font-bold uppercase tracking-tight">
          ORGANIZATION NOT FOUND
        </p>
        <Link
          to="/app/organizations"
          className="mt-4 inline-block border-4 border-black bg-lime-400 px-6 py-3 font-bold uppercase tracking-tight transition-all hover:translate-x-1 hover:translate-y-1"
        >
          Back to Organizations
        </Link>
      </div>
    );
  }

  const handleUpdateOrg = (updates: Partial<Organization>) => {
    updateOrganization(id, updates);
    setIsEditingOrg(false);
  };

  const handleUpdateUser = (userId: string, updates: Partial<User>) => {
    updateUser(userId, updates);
    setEditingUserId(null);
  };

  return (
    <div>
      <div className="mb-8 flex items-start justify-between border-b-4 border-black pb-6">
        <div>
          <Link
            to="/app/organizations"
            className="mb-4 inline-block font-mono text-sm font-bold uppercase tracking-wider hover:translate-x-1"
          >
            ← Back
          </Link>
          <h1 className="text-5xl font-bold uppercase leading-none tracking-tighter">
            {organization.title}
          </h1>
        </div>
        <button
          onClick={() => setIsEditingOrg(true)}
          className="border-4 border-black bg-white px-6 py-3 font-bold uppercase tracking-tight transition-all hover:translate-x-1 hover:translate-y-1"
        >
          Edit Org
        </button>
      </div>

      {isEditingOrg && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90">
          <div className="max-h-[90vh] w-full max-w-md overflow-y-auto border-4 border-black bg-white">
            <EditOrganizationForm
              organization={organization}
              onCancel={() => setIsEditingOrg(false)}
              onSave={handleUpdateOrg}
            />
          </div>
        </div>
      )}

      <div className="mb-8 border-4 border-black bg-white">
        <img
          src={organization.imageUrl}
          alt={organization.title}
          className="h-64 w-full border-b-4 border-black object-cover"
        />
        <div className="border-b-4 border-black bg-gray-100 p-6">
          <h2 className="mb-2 font-mono text-xs font-bold uppercase tracking-wider">
            Location
          </h2>
          <p className="font-mono text-lg font-bold">
            {organization.geoLocation.latitude.toFixed(4)},{" "}
            {organization.geoLocation.longitude.toFixed(4)}
          </p>
        </div>
        <div className="bg-gray-200 p-8 text-center">
          <div className="inline-block border-4 border-black bg-white p-8">
            <p className="font-mono text-sm font-bold uppercase tracking-wider">
              Map View
            </p>
            <p className="mt-2 text-xs">Google Maps integration pending</p>
          </div>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <div>
          <div className="mb-4 border-b-4 border-black pb-2">
            <h2 className="text-2xl font-bold uppercase tracking-tight">
              Coaches ({coaches.length})
            </h2>
          </div>
          <div className="space-y-0">
            {coaches.length === 0 ? (
              <div className="border-4 border-black bg-white p-6">
                <p className="font-mono text-sm uppercase tracking-wider">
                  No coaches assigned
                </p>
              </div>
            ) : (
              coaches.map((coach) => (
                <div
                  key={coach.id}
                  className="flex items-start justify-between border-4 border-black bg-white p-4 transition-all hover:translate-x-1 hover:translate-y-1"
                >
                  <div>
                    <h3 className="mb-1 font-bold uppercase tracking-tight">
                      {coach.name}
                    </h3>
                    <p className="font-mono text-xs uppercase tracking-wider text-gray-600">
                      {coach.email}
                    </p>
                  </div>
                  <button
                    onClick={() => setEditingUserId(coach.id)}
                    className="border-4 border-black bg-lime-400 px-4 py-2 font-mono text-xs font-bold uppercase transition-all hover:translate-x-1 hover:translate-y-1"
                  >
                    Edit
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        <div>
          <div className="mb-4 border-b-4 border-black pb-2">
            <h2 className="text-2xl font-bold uppercase tracking-tight">
              Users ({users.length})
            </h2>
          </div>
          <div className="space-y-0">
            {users.length === 0 ? (
              <div className="border-4 border-black bg-white p-6">
                <p className="font-mono text-sm uppercase tracking-wider">
                  No users assigned
                </p>
              </div>
            ) : (
              users.map((user) => (
                <div
                  key={user.id}
                  className="flex items-start justify-between border-4 border-black bg-white p-4 transition-all hover:translate-x-1 hover:translate-y-1"
                >
                  <div>
                    <h3 className="mb-1 font-bold uppercase tracking-tight">
                      {user.name}
                    </h3>
                    <p className="font-mono text-xs uppercase tracking-wider text-gray-600">
                      {user.email}
                    </p>
                    {user.coachId && (
                      <p className="mt-1 font-mono text-xs uppercase tracking-wider">
                        Coach: {coaches.find((c) => c.id === user.coachId)?.name}
                      </p>
                    )}
                  </div>
                  <button
                    onClick={() => setEditingUserId(user.id)}
                    className="border-4 border-black bg-lime-400 px-4 py-2 font-mono text-xs font-bold uppercase transition-all hover:translate-x-1 hover:translate-y-1"
                  >
                    Edit
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {editingUserId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90">
          <div className="max-h-[90vh] w-full max-w-md overflow-y-auto border-4 border-black bg-white">
            <EditUserForm
              user={[...coaches, ...users].find((u) => u.id === editingUserId)!}
              coaches={coaches}
              onCancel={() => setEditingUserId(null)}
              onSave={(updates) => handleUpdateUser(editingUserId, updates)}
            />
          </div>
        </div>
      )}
    </div>
  );
}

function EditOrganizationForm({
  organization,
  onCancel,
  onSave,
}: {
  organization: Organization;
  onCancel: () => void;
  onSave: (updates: Partial<Organization>) => void;
}) {
  const [title, setTitle] = useState(organization.title);
  const [imageUrl, setImageUrl] = useState(organization.imageUrl);
  const [latitude, setLatitude] = useState(organization.geoLocation.latitude.toString());
  const [longitude, setLongitude] = useState(organization.geoLocation.longitude.toString());

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      title,
      imageUrl,
      geoLocation: {
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
      },
    });
  };

  return (
    <div className="p-8">
      <h2 className="mb-8 border-b-4 border-black pb-4 text-2xl font-bold uppercase tracking-tight">
        Edit Organization
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label className="mb-2 block font-mono text-xs font-bold uppercase tracking-wider">
            Name
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full border-4 border-black bg-white px-4 py-3 font-bold outline-none focus:bg-lime-400"
          />
        </div>

        <div className="mb-6">
          <label className="mb-2 block font-mono text-xs font-bold uppercase tracking-wider">
            Image URL
          </label>
          <input
            type="url"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            required
            className="w-full border-4 border-black bg-white px-4 py-3 font-bold outline-none focus:bg-lime-400"
          />
        </div>

        <div className="mb-8 grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-2 block font-mono text-xs font-bold uppercase tracking-wider">
              Latitude
            </label>
            <input
              type="number"
              step="any"
              value={latitude}
              onChange={(e) => setLatitude(e.target.value)}
              required
              className="w-full border-4 border-black bg-white px-4 py-3 font-mono font-bold outline-none focus:bg-lime-400"
            />
          </div>
          <div>
            <label className="mb-2 block font-mono text-xs font-bold uppercase tracking-wider">
              Longitude
            </label>
            <input
              type="number"
              step="any"
              value={longitude}
              onChange={(e) => setLongitude(e.target.value)}
              required
              className="w-full border-4 border-black bg-white px-4 py-3 font-mono font-bold outline-none focus:bg-lime-400"
            />
          </div>
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            className="flex-1 border-4 border-black bg-lime-400 px-6 py-3 font-bold uppercase tracking-tight transition-all hover:translate-x-1 hover:translate-y-1 active:translate-x-0 active:translate-y-0"
          >
            Save
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

function EditUserForm({
  user,
  coaches,
  onCancel,
  onSave,
}: {
  user: User;
  coaches: User[];
  onCancel: () => void;
  onSave: (updates: Partial<User>) => void;
}) {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [coachId, setCoachId] = useState(user.coachId || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      name,
      email,
      coachId: coachId || null,
    });
  };

  return (
    <div className="p-8">
      <h2 className="mb-8 border-b-4 border-black pb-4 text-2xl font-bold uppercase tracking-tight">
        Edit {user.role === "coach" ? "Coach" : "User"}
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
            className="w-full border-4 border-black bg-white px-4 py-3 font-bold outline-none focus:bg-lime-400"
          />
        </div>

        {user.role === "user" && (
          <div className="mb-8">
            <label className="mb-2 block font-mono text-xs font-bold uppercase tracking-wider">
              Coach
            </label>
            <select
              value={coachId}
              onChange={(e) => setCoachId(e.target.value)}
              className="w-full border-4 border-black bg-white px-4 py-3 font-bold outline-none focus:bg-lime-400"
            >
              <option value="">No Coach</option>
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
            Save
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
