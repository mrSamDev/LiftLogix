import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useSession } from "../../../features/auth";
import {
  canCreateOrganization,
  OrganizationTable,
  CreateOrganizationModal,
  useOrganizations,
  useCreateOrganization,
} from "../../../features/organizations";
import type { OrganizationInput } from "../../../features/organizations";

export const Route = createFileRoute("/app/organizations/")({
  component: Organizations,
});

function Organizations() {
  const { data: session } = useSession();
  const currentUser = session?.user || null;

  const { data: organizations = [], isLoading } = useOrganizations();
  const createOrganizationMutation = useCreateOrganization();
  const [isCreating, setIsCreating] = useState(false);

  if (!currentUser || !canCreateOrganization(currentUser)) {
    return (
      <div className="border-4 border-black bg-white p-8">
        <p className="text-lg font-bold uppercase tracking-tight">
          ACCESS DENIED: INSUFFICIENT PERMISSIONS
        </p>
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

      <OrganizationTable organizations={organizations} />

      {isCreating && (
        <CreateOrganizationModal
          onCancel={() => setIsCreating(false)}
          onCreate={(organization: OrganizationInput) => {
            createOrganizationMutation.mutate(organization);
            setIsCreating(false);
          }}
        />
      )}
    </div>
  );
}
