import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Organization, OrganizationInput, OrganizationUpdate } from "@lift-logic/types";
import { getOrganizations, getOrganizationById, createOrganization, updateOrganization, deleteOrganization } from "./api";

const ORGANIZATIONS_QUERY_KEY = ["organizations"];

export function useOrganizations() {
  return useQuery({
    queryKey: ORGANIZATIONS_QUERY_KEY,
    queryFn: getOrganizations,
  });
}

export function useOrganization(id: string) {
  return useQuery({
    queryKey: [...ORGANIZATIONS_QUERY_KEY, id],
    queryFn: () => getOrganizationById(id),
  });
}

export function useCreateOrganization() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (organization: OrganizationInput) => createOrganization(organization),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ORGANIZATIONS_QUERY_KEY });
    },
  });
}

export function useUpdateOrganization() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: OrganizationUpdate }) =>
      updateOrganization(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ORGANIZATIONS_QUERY_KEY });
    },
  });
}

export function useDeleteOrganization() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteOrganization(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ORGANIZATIONS_QUERY_KEY });
    },
  });
}
