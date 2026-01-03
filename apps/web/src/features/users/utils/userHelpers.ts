import type { User } from "@lift-logic/types";

export function getCoaches(users: User[]): User[] {
  return users.filter((user) => user.role === "coach");
}

export function getUsersByCoachId(users: User[], coachId: string): User[] {
  return users.filter((user) => user.coachId === coachId);
}

export function getUsersByOrganizationId(users: User[], organizationId: string): User[] {
  return users.filter((user) => user.orgId === organizationId && user.role === "user");
}

export function getCoachesByOrganizationId(users: User[], organizationId: string): User[] {
  return users.filter((user) => user.orgId === organizationId && user.role === "coach");
}

export function findUserById(users: User[], id: string): User | null {
  return users.find((user) => user.id === id) || null;
}

export function findCoachByName(users: User[], name: string): User | null {
  return users.find((user) => user.role === "coach" && user.name === name) || null;
}
