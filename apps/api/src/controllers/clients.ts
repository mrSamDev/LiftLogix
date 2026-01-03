import { safetry } from "@lift-logic/utils";
import { AuthVariables } from "@src/middleware/auth";
import { Context } from "hono";
import mongoose from "mongoose";

export async function getWorkoutList(c: Context<{ Variables: AuthVariables }>) {
  const db = mongoose.connection.db;
  const user = c.get("user");

  if (!user) {
    return c.json({ error: "Unauthorized" }, 401);
  }

  if (!db) {
    return c.json({ error: "Database not connected" }, 500);
  }

  const [error, plans] = await safetry(db.collection("plans").find({ coachId: user.coachId, clientId: user.id }).toArray());

  if (error) {
    return c.json(
      {
        error: "Failed to fetch plans",
        message: error.message,
      },
      500
    );
  }

  if (!plans || plans.length === 0) {
    return c.json({ error: "Plans not found" }, 404);
  }

  return c.json(plans, 200);
}
