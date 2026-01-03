import { useState } from "react";
import type { Organization, OrganizationUpdate } from "../types";

type EditOrganizationFormProps = {
  organization: Organization;
  onCancel: () => void;
  onSave: (updates: OrganizationUpdate) => void;
};

export function EditOrganizationForm({
  organization,
  onCancel,
  onSave,
}: EditOrganizationFormProps) {
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
