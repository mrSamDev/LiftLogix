import { Context, Hono, Next } from "hono";
import { safetry } from "@lift-logic/utils";
import mongoose from "mongoose";
import { AuthVariables } from "@src/middleware/auth";

const app = new Hono();

export default app.get("/dashboard", async (c: Context<{ Variables: AuthVariables }>, next: Next) => {
  const db = mongoose.connection.db;

  const user = c.get("user");

  if (!user) {
    return c.json({ error: "Unauthorized" }, 401);
  }

  if (!db) {
    return c.json({ error: "Database not connected" }, 500);
  }

  const coachId = user.id;
  console.log("coachId: ", coachId);

  if (!coachId) {
    return c.json({ error: "Invalid coach ID" }, 400);
  }

  const [error, result] = await safetry(Promise.all([db.collection("user").countDocuments({ coachId }), db.collection("user").countDocuments({ coachId, isActive: true })]));
  console.log("result: ", result);

  if (error) {
    return c.json(
      {
        error: "Failed to fetch client counts",
        message: error.message,
      },
      500
    );
  }

  const [totalClients, activeClients] = result;

  return c.json({ activeClients, totalClients }, 200);
});
