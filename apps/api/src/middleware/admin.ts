import type { Context, Next } from "hono";
import type { AuthVariables } from "./auth";

export async function adminMiddleware(c: Context<{ Variables: AuthVariables }>, next: Next) {
  const user = c.get("user");
  console.log("user: ", user);

  if (!user) {
    return c.json({ error: "Authentication required" }, 401);
  }

  if (user.role !== "admin") {
    return c.json({ error: "Admin access required" }, 403);
  }

  return next();
}
