import { Hono } from "hono";
import { safetry } from "@lift-logic/utils";
import mongoose from "mongoose";
import { ObjectId } from "mongodb";
import type { AuthVariables } from "@src/middleware/auth";

const app = new Hono<{ Variables: AuthVariables }>();

export default app.delete("/:id", async (c) => {
  const user = c.get("user");

  if (!user) {
    return c.json({ error: "Unauthorized" }, 401);
  }

  const metricId = c.req.param("id");

  if (!ObjectId.isValid(metricId)) {
    return c.json({ error: "Invalid metric ID" }, 400);
  }

  const db = mongoose.connection.db;

  if (!db) {
    return c.json({ error: "Database not connected" }, 500);
  }

  const [error, result] = await safetry(
    db.collection("metrics").deleteOne({
      _id: new ObjectId(metricId),
      userId: user._id,
    })
  );

  if (error) {
    return c.json(
      {
        error: "Failed to delete metric",
        message: error.message,
      },
      400
    );
  }

  if (result.deletedCount === 0) {
    return c.json({ error: "Metric not found or unauthorized" }, 404);
  }

  return c.json({ success: true });
});
