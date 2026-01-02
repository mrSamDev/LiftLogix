import type { User } from "@lift-logic/types";

export function canCreateOrganization(user: User): boolean {
  return user.role === "admin";
}

export function canEditOrganization(user: User): boolean {
  return user.role === "admin";
}

export function canDeleteOrganization(user: User): boolean {
  return user.role === "admin";
}

export function canViewOrganization(user: User, organizationId: string): boolean {
  if (user.role === "admin") return true;
  return user.orgId === organizationId;
}

export function canViewAllOrganizations(user: User): boolean {
  return user.role === "admin";
}
