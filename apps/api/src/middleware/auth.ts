import type { Context, Next } from "hono";
import type { User, Session } from "@lift-logic/types";
import { safetry } from "@lift-logic/utils";
import { createAuth, type Auth } from "../auth";

let auth: Auth | null = null;

export function initializeAuth() {
  if (auth) return auth;
  auth = createAuth();
  return auth;
}

export function getAuth(): Auth {
  if (!auth) {
    throw new Error("Auth not initialized. Call initializeAuth() first.");
  }
  return auth;
}

export type AuthVariables = {
  user: User | null;
  session: Session | null;
};

export async function authMiddleware(c: Context, next: Next) {
  const authInstance = getAuth();
  const [error, session] = await safetry(
    authInstance.api.getSession({ headers: c.req.raw.headers })
  );

  if (error || !session) {
    c.set("user", null);
    c.set("session", null);
    return next();
  }

  c.set("user", session.user);
  c.set("session", session.session);
  return next();
}
