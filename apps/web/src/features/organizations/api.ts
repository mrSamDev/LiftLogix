import { fetchApi } from "@lift-logic/utils";
import type { Organization, OrganizationInput, OrganizationUpdate } from "@lift-logic/types";

const API_BASE = "http://localhost:3000";

export const getOrganizations = async () => {
  const data = await fetchApi<{ organizations: Organization[] }>(`${API_BASE}/api/organizations`);
  return data.organizations;
};

export const getOrganizationById = async (id: string) => {
  return fetchApi<Organization>(`${API_BASE}/api/organizations/${id}`);
};

export const createOrganization = async (organization: OrganizationInput) => {
  return fetchApi<Organization>(`${API_BASE}/api/organizations`, {
    method: "POST",
    body: JSON.stringify(organization),
  });
};

export const updateOrganization = async (id: string, updates: OrganizationUpdate) => {
  return fetchApi<Organization>(`${API_BASE}/api/organizations/${id}`, {
    method: "PATCH",
    body: JSON.stringify(updates),
  });
};

export const deleteOrganization = async (id: string) => {
  return fetchApi<{ success: boolean; message: string }>(
    `${API_BASE}/api/organizations/${id}`,
    {
      method: "DELETE",
    }
  );
};
