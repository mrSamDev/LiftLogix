import type { OrganizationInput } from "../types";
import { CreateOrganizationForm } from "./CreateOrganizationForm";

type CreateOrganizationModalProps = {
  onCancel: () => void;
  onCreate: (organization: OrganizationInput) => void;
};

export function CreateOrganizationModal({
  onCancel,
  onCreate,
}: CreateOrganizationModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90">
      <div className="max-h-[90vh] w-full max-w-md overflow-y-auto border-4 border-black bg-white">
        <CreateOrganizationForm onCancel={onCancel} onCreate={onCreate} />
      </div>
    </div>
  );
}
