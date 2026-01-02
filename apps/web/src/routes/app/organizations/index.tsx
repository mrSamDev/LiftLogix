import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useStore } from "../../../lib/mockStore";
import { canCreateOrganization } from "../../../lib/permissions";
import type { Organization } from "../../../types/domain";

export const Route = createFileRoute("/app/organizations/")({
  component: Organizations,
});

function Organizations() {
  const { currentUser, organizations, addOrganization } = useStore();
  const [isCreating, setIsCreating] = useState(false);

  const handleCreate = (org: Organization) => {
    addOrganization(org);
    setIsCreating(false);
  };

  if (!currentUser || !canCreateOrganization(currentUser)) {
    return (
      <div className="border-4 border-black bg-white p-8">
        <p className="text-lg font-bold uppercase tracking-tight">
          ACCESS DENIED: INSUFFICIENT PERMISSIONS
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-12 flex items-start justify-between border-b-4 border-black pb-6">
        <h1 className="text-5xl font-bold uppercase leading-none tracking-tighter">
          Organizations
        </h1>
        <button
          onClick={() => setIsCreating(true)}
          className="border-4 border-black bg-lime-400 px-6 py-3 font-bold uppercase tracking-tight transition-all hover:translate-x-1 hover:translate-y-1 active:translate-x-0 active:translate-y-0"
        >
          + New Org
        </button>
      </div>

      {isCreating && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90">
          <div className="max-h-[90vh] w-full max-w-md overflow-y-auto border-4 border-black bg-white">
            <CreateOrganizationForm
              onCancel={() => setIsCreating(false)}
              onCreate={handleCreate}
            />
          </div>
        </div>
      )}

      <div className="grid gap-0 md:grid-cols-2 lg:grid-cols-3">
        {organizations.map((org) => (
          <Link
            key={org.id}
            to="/app/organizations/$id"
            params={{ id: org.id }}
            className="border-4 border-black bg-white transition-all hover:translate-x-1 hover:translate-y-1"
          >
            <img
              src={org.imageUrl}
              alt={org.title}
              className="h-48 w-full border-b-4 border-black object-cover"
            />
            <div className="p-6">
              <h2 className="mb-3 text-2xl font-bold uppercase leading-tight tracking-tight">
                {org.title}
              </h2>
              <p className="font-mono text-sm font-bold uppercase">
                {org.geoLocation.latitude.toFixed(4)}, {org.geoLocation.longitude.toFixed(4)}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

function CreateOrganizationForm({
  onCancel,
  onCreate,
}: {
  onCancel: () => void;
  onCreate: (org: Organization) => void;
}) {
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("https://placehold.co/600x400");
  const [latitude, setLatitude] = useState("12.9716");
  const [longitude, setLongitude] = useState("77.5946");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newOrg: Organization = {
      id: `org_${Date.now()}`,
      title,
      imageUrl,
      geoLocation: {
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
      },
    };

    onCreate(newOrg);
  };

  return (
    <div className="p-8">
      <h2 className="mb-8 border-b-4 border-black pb-4 text-2xl font-bold uppercase tracking-tight">
        New Organization
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
