import { Hono } from "hono";
import { transformMetricToApi } from "@lift-logic/types";
import { safetry } from "@lift-logic/utils";
import mongoose from "mongoose";
import type { AuthVariables } from "@src/middleware/auth";

const app = new Hono<{ Variables: AuthVariables }>();

export default app.get("/", async (c) => {
  const user = c.get("user");

  if (!user) {
    return c.json({ error: "Unauthorized" }, 401);
  }

  const db = mongoose.connection.db;

  if (!db) {
    return c.json({ error: "Database not connected" }, 500);
  }

  const limit = parseInt(c.req.query("limit") || "100");
  const offset = parseInt(c.req.query("offset") || "0");

  const [error, metrics] = await safetry(
    db
      .collection("metrics")
      .find({ userId: user._id })
      .sort({ recordedAt: -1 })
      .skip(offset)
      .limit(limit)
      .toArray()
  );

  if (error) {
    return c.json(
      {
        error: "Failed to fetch metrics",
        message: error.message,
      },
      400
    );
  }

  return c.json({
    metrics: metrics.map(transformMetricToApi),
    total: metrics.length,
  });
});
