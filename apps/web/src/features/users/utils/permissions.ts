import type { User, UserRole } from "@lift-logic/types";

export function canCreateOrganization(user: User): boolean {
  return user.role === "admin";
}

export function canCreateUser(user: User): boolean {
  return user.role === "admin";
}

export function canAssignCoach(user: User): boolean {
  return user.role === "admin";
}

export function canViewAllUsers(user: User): boolean {
  return user.role === "admin";
}

export function canViewUser(currentUser: User, targetUserId: string): boolean {
  if (currentUser.role === "admin") return true;
  if (currentUser.role === "coach") {
    return true;
  }
  return currentUser.id === targetUserId;
}

export function getAccessibleUserIds(currentUser: User, allUsers: User[]): string[] {
  if (currentUser.role === "admin") {
    return allUsers.map((u) => u.id);
  }

  if (currentUser.role === "coach") {
    return allUsers.filter((u) => u.coachId === currentUser.id).map((u) => u.id);
  }

  return [currentUser.id];
}

export function hasRole(user: User, role: UserRole): boolean {
  return user.role === role;
}

export function canDeleteUser(user: User): boolean {
  return user.role === "admin";
}

export function canDeleteOrganization(user: User): boolean {
  return user.role === "admin";
}
