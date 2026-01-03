import type { Organization } from "@lift-logic/types";

export function findOrganizationById(organizations: Organization[], id: string): Organization | null {
  return organizations.find((org) => org.id === id) || null;
}

export function findOrganizationByTitle(organizations: Organization[], title: string): Organization | null {
  return organizations.find((org) => org.title.toLowerCase() === title.toLowerCase()) || null;
}

export function sortOrganizationsByTitle(organizations: Organization[]): Organization[] {
  return [...organizations].sort((a, b) => a.title.localeCompare(b.title));
}

export function sortOrganizationsByCreatedAt(organizations: Organization[]): Organization[] {
  return [...organizations].sort((a, b) =>
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export function filterOrganizationsByLocation(
  organizations: Organization[],
  minLat: number,
  maxLat: number,
  minLng: number,
  maxLng: number
): Organization[] {
  return organizations.filter((org) => {
    const { latitude, longitude } = org.geoLocation;
    return latitude >= minLat && latitude <= maxLat && longitude >= minLng && longitude <= maxLng;
  });
}
