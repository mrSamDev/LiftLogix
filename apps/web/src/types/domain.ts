import type { User } from "../features/users";

export type AuthSession = {
  user: User;
  isAuthenticated: boolean;
};
