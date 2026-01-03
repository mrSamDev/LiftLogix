import { fetchApi } from "@lift-logic/utils";
import type { SessionWithUser } from "@lift-logic/types";
import { authClient } from "../../lib/auth";

const API_BASE = "http://localhost:3000";

export const getSession = async () => {
  const { data: session } = await authClient.getSession();
  return session as SessionWithUser | null;
};

export const signIn = async (email: string, password: string) => {
  return authClient.signIn.email({ email, password });
};

export const signOut = async () => {
  return authClient.signOut();
};
