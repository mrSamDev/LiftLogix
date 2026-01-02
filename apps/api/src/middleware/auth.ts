import type { Context, Next } from "hono";
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
  user: ReturnType<typeof getAuth>["$Infer"]["Session"]["user"] | null;
  session: ReturnType<typeof getAuth>["$Infer"]["Session"]["session"] | null;
};

export async function authMiddleware(c: Context, next: Next) {
  const authInstance = getAuth();
  const session = await authInstance.api.getSession({ headers: c.req.raw.headers });

  if (!session) {
    c.set("user", null);
    c.set("session", null);
    return next();
  }

  c.set("user", session.user);
  c.set("session", session.session);
  return next();
}
