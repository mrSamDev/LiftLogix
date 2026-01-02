import type { User as SharedUser } from "@lift-logic/types";

export type UserRole = "admin" | "coach" | "user";

export type User = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  organizationId: string | null;
  coachId: string | null;
};

export type { SharedUser };
