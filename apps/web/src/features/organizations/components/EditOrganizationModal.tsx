import type { Organization, OrganizationUpdate } from "../types";
import { EditOrganizationForm } from "./EditOrganizationForm";

type EditOrganizationModalProps = {
  organization: Organization;
  onCancel: () => void;
  onSave: (updates: OrganizationUpdate) => void;
};

export function EditOrganizationModal({
  organization,
  onCancel,
  onSave,
}: EditOrganizationModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90">
      <div className="max-h-[90vh] w-full max-w-md overflow-y-auto border-4 border-black bg-white">
        <EditOrganizationForm
          organization={organization}
          onCancel={onCancel}
          onSave={onSave}
        />
      </div>
    </div>
  );
}
